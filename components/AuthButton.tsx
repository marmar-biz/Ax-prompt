'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

export default function AuthButton() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loggedIn === null) return null;

  return loggedIn ? (
    <Link
      href="/account"
      className="rounded-lg px-3 py-2 bg-gray-100 hover:bg-gray-200 text-sm"
    >
      حساب من
    </Link>
  ) : (
    <Link
      href="/login"
      className="rounded-lg px-3 py-2 bg-black text-white hover:opacity-90 text-sm"
    >
      ورود / ثبت‌نام
    </Link>
  );
}
