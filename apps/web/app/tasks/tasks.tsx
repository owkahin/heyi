'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { Task } from '@acme/types';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const res = await fetch('/api/tasks', { cache: 'no-store' });
    setTasks(await res.json());
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim()) return;
    await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    setTitle('');
    load();
  };

  const toggle = async (id: number, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !completed }) });
    load();
  };

  const remove = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task..." />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id, t.completed)} />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
            <button onClick={() => remove(t.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
