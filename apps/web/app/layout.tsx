export const metadata = { title: 'Tasks', description: 'RN + Next.js Monorepo' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24 }}>
        <h1>Tasks (Next.js + Prisma API)</h1>
        {children}
      </body>
    </html>
  );
}
