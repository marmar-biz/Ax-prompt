'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setLoggedIn(!!s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <Link href="/" className="font-extrabold text-lg">پرامپت‌شاپ</Link>

      <nav className="flex items-center gap-3">
        <Link href="/products" className="btn-ghost">محصولات</Link>
        <Link href="/purchases" className="btn-ghost">خریدهای شما</Link>
        {loggedIn ? (
          <Link href="/account" className="btn">حساب کاربری</Link>
        ) : (
          <Link href="/login" className="btn">ورود / ثبت‌نام</Link>
        )}
      </nav>
    </header>
  );
}
