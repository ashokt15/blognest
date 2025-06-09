// app/editor/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Box, Button, TextField, Typography, Paper, Stack
} from '@mui/material'

export default function NewEditorPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your blog content here...',
      }),
    ],
    content: '',
  })

  const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
    if (!editor || !title.trim()) return
    setLoading(true)

    const content = editor.getHTML()

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content, status }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    if (res.ok) {
      router.push(`/dashboard`)
    } else {
      alert(data.message || 'Failed to save blog.')
    }

    setLoading(false)
  }

  return (
    <Box p={4}>
      <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Create New Blog
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Blog Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Paper variant="outlined" sx={{ p: 2, minHeight: 300 }}>
            <EditorContent editor={editor} />
          </Paper>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleSave('DRAFT')}
              disabled={loading}
            >
              Save as Draft
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSave('PUBLISHED')}
              disabled={loading}
            >
              Publish
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
