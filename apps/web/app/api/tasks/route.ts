import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../prisma';

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = z.object({ title: z.string().min(1) }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
  const task = await prisma.task.create({ data: { title: parsed.data.title } });
  return NextResponse.json(task, { status: 201 });
}
