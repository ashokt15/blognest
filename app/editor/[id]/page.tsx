'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import axios from 'axios'

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()
  const { status } = useSession()

  const [title, setTitle] = useState('')
  const [setStatusText] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [loading, setLoading] = useState(true)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  })

  useEffect(() => {
    if (!id || !editor) return

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`)
        const { post } = res.data
        setTitle(post.title)
        setStatusText(post.status)
        editor.commands.setContent(post.content || '')
        setLoading(false)
      } catch (err) {
        console.error(err)
        router.push('/dashboard') // fallback
      }
    }

    if (status === 'authenticated') {
      fetchPost()
    } else if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [id, status, editor, router])

  const handleSave = async () => {
    if (!editor) return
    try {
      await axios.put(`/api/posts/${id}`, {
        title,
        content: editor.getHTML(),
      })
      alert('Saved successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to save')
    }
  }

  if (loading || !editor) {
    return (
      <Container sx={{ py: 6 }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Post
      </Typography>

      <Stack spacing={2} mt={2}>
        <TextField
          label="Post Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 2,
            p: 2,
            minHeight: '300px',
            '& .ProseMirror': {
              outline: 'none',
              minHeight: '200px',
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
          <Button onClick={() => router.push('/dashboard')} variant="outlined">
            Back
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
