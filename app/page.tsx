// app/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <main>
      <h1>Welcome back, {session.user?.name}!</h1>
      {/* Your dashboard or home UI */}
    </main>
  )
}
