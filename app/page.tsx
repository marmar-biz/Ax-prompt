'use client';

import Link from 'next/link';
import BottomNav from '../components/BottomNav';

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <header className="pt-6">
        <h1>سلام! 👋 به «عکس» خوش اومدی</h1>
        <p className="text-gray-600 mt-2">صفحه آغازین پروژه</p>
      </header>

      <section className="grid grid-cols-2 gap-4 my-8">
        <Link href="/categories" className="border rounded p-4 text-center">دسته‌ها</Link>
        <Link href="/packages" className="border rounded p-4 text-center">پکیج‌ها</Link>
      </section>

      <BottomNav />
    </main>
  );
}
