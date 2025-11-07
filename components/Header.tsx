'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">پرامپت‌شاپ</Link>

        <nav className="flex items-center gap-3">
          <Link href="/products" className="hover:underline">محصولات</Link>
          <Link href="/purchases" className="hover:underline">خریدهای شما</Link>

          {!isAuthed ? (
            <Link
              href="/login"
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              ورود / ثبت‌نام
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/account" className="underline">پروفایل</Link>
              <button onClick={logout} className="rounded-lg border px-3 py-2">
                خروج
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
