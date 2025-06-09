'use client'

import { signIn } from 'next-auth/react'
import { Button, Typography, Container, Box, Paper } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useTheme } from '@mui/material/styles'

export default function LoginPage() {
  const theme = useTheme()

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: '100%',
          textAlign: 'center',
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          🪺 BlogNest
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Write. Share. Grow.
        </Typography>

        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          sx={{
            mt: 3,
            backgroundColor: '#4285F4',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#357ae8',
            },
            width: '100%',
            paddingY: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
          }}
        >
          Sign in with Google
        </Button>

        <Box mt={4}>
          <Typography variant="caption" color="text.secondary">
            By signing in, you agree to our Terms of Use and Privacy Policy.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
