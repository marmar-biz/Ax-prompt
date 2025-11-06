'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function BottomNav() {
  // اگر لازم شد بعدها هر API مرورگر را فقط داخل useEffect و با گارد صدا بزن
  useEffect(() => {
    // مثال امن:
    // if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    //   navigator.vibrate(20);
    // }
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="max-w-screen-sm mx-auto flex items-center justify-around py-3">
        <Link href="/">خانه</Link>
        <Link href="/categories">دسته‌ها</Link>
        <Link href="/packages">پکیج‌ها</Link>
      </div>
    </nav>
  );
}
