import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true },
    })
  
    if (!post || post.author.email !== session.user.email) {
      return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
    }
  
    return NextResponse.json({ post })
  }
  
  export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
    const body = await req.json()
    const { title, content } = body
  
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true },
    })
  
    if (!post || post.author.email !== session.user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  
    const updated = await prisma.post.update({
      where: { id: params.id },
      data: { title, content },
    })
  
    return NextResponse.json({ post: updated })
  }

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  })

  if (!post || post.author.email !== session.user.email) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.post.delete({ where: { id: params.id } })

  return NextResponse.json({ success: true })
}
