'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import Link from 'next/link';

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user || null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/account" className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
          حساب کاربری
        </Link>
      </div>
    );
  }
  return (
    <Link
      href="/login"
      className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
    >
      ورود / ثبت‌نام
    </Link>
  );
}
