'use client'

import Link from 'next/link'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 border-t bg-white/90 backdrop-blur z-50">
      <div className="mx-auto max-w-3xl flex items-stretch justify-around h-12">
        <Link href="/" className="flex-1 flex items-center justify-center">
          خانه
        </Link>
        <Link href="/categories" className="flex-1 flex items-center justify-center">
          دسته‌ها
        </Link>
        <Link href="/packages" className="flex-1 flex items-center justify-center">
          پکیج‌ها
        </Link>
      </div>
    </nav>
  )
}
