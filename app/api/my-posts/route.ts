import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ posts: [] }, { status: 401 })
  }

  const posts = await prisma.post.findMany({
    where: {
      author: {
        email: session.user.email,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ posts })
}
