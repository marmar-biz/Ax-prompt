'use client';

import Link from 'next/link';
import AuthButton from './AuthButton';

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          پرامپت‌شاپ
        </Link>

        <nav className="flex items-center gap-3">
          {/* اگر لینک‌های دیگری داری اینجا بگذار */}
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
