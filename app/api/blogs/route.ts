// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import slugify from 'slugify'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, content, status } = body
  const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now()

  if (!title || !content || !['DRAFT', 'PUBLISHED'].includes(status)) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        status,
        slug,
        author: {
          connect: {
            email: session.user.email,
          },
        },
      },
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (err) {
    console.error('Failed to create post:', err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
