'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_, s) => setLoggedIn(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4 justify-between">
        <Link href="/" className="font-bold">پرومپت‌شاپ</Link>

        <nav className="flex items-center gap-3">
          <Link href="/" className="hover:underline">محصولات</Link>
          {loggedIn && <Link href="/purchases" className="hover:underline">خریدهای شما</Link>}

          {!loggedIn ? (
            <Link href="/auth" className="rounded px-3 py-1.5 bg-black text-white">ورود / ثبت‌نام</Link>
          ) : (
            <button onClick={signOut} className="rounded px-3 py-1.5 border">خروج</button>
          )}
        </nav>
      </div>
    </header>
  );
}
