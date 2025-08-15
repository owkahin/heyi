import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>This is the web front-end (minimal). Visit <Link href="/tasks">/tasks</Link> to manage tasks.</p>
    </div>
  );
}
