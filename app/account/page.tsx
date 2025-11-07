'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import Link from 'next/link';

export default function AccountPage() {
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setPhone(data.user?.phone ?? null);
      setEmail(data.user?.email ?? null);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-4">
      <h2 className="text-2xl font-bold">حساب کاربری</h2>
      <div className="rounded border p-4">
        <p className="text-sm">موبایل: {phone ?? '-'}</p>
        <p className="text-sm">ایمیل: {email ?? '-'}</p>
      </div>
      <div className="flex gap-3">
        <Link href="/orders" className="px-3 py-2 rounded border">خریدهای شما</Link>
        <button onClick={handleLogout} className="px-3 py-2 rounded bg-gray-900 text-white">خروج</button>
      </div>
    </div>
  );
}
