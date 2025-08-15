import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../prisma';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(task);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  const body = await req.json();
  const parsed = z.object({ title: z.string().optional(), completed: z.boolean().optional() }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  const task = await prisma.task.update({ where: { id }, data: parsed.data });
  return NextResponse.json(task);
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
