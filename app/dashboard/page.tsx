'use client'

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Post {
  id: string
  title: string
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
}

export default function DashboardPage() {
  const { status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/my-posts')
      const data = await res.json()
      setPosts(data.posts)
    }
    if (status === 'authenticated') fetchPosts()
  }, [status])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await axios.delete(`/api/posts/${id}`)
    setPosts(posts.filter((p) => p.id !== id))
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Posts
      </Typography>

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={post.status}
                    color={post.status === 'PUBLISHED' ? 'success' : 'default'}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>

                <Box mt={2} display="flex" gap={1}>
                  <Button
                    component={Link}
                    href={`/editor/${post.id}`}
                    variant="contained"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="outlined"
                    size="small"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
