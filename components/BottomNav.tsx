'use client'

import Link from 'next/link'

export default function BottomNav() {
  return (
    <nav
      className="fixed left-0 right-0 border-t bg-white/95 backdrop-blur z-[100]"
      style={{ bottom: 'env(safe-area-inset-bottom, 0)' }}  // حل مشکل iOS
    >
      <div
        className="mx-auto max-w-3xl flex items-stretch justify-around"
        style={{ height: '56px', paddingBottom: 'env(safe-area-inset-bottom, 0)' }} // فاصله امن
      >
        <Link href="/" className="flex-1 flex items-center justify-center">خانه</Link>
        <Link href="/categories" className="flex-1 flex items-center justify-center">دسته‌ها</Link>
        <Link href="/packages" className="flex-1 flex items-center justify-center">پکیج‌ها</Link>
      </div>
    </nav>
  )
}
