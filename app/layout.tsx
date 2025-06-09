import './globals.css'
import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/SessionProvider'

export const metadata = {
  title: 'BlogNest',
  description: 'A modern blogging platform',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
