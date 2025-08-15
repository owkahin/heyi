/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.task.count();
  if (count === 0) {
    await prisma.task.createMany({
      data: [
        { title: 'Welcome to your full-stack starter!' },
        { title: 'Build once, run mobile & web.' },
        { title: 'Replace SQLite with Postgres in production.' }
      ]
    });
  }
}

main().finally(async () => { await prisma.$disconnect(); });
