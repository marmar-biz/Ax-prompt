import './globals.css'
import type { Metadata } from 'next'
import BottomNav from '../components/BottomNav'

export const metadata: Metadata = {
  title: 'پرامپت‌شاپ',
  description: 'فروشگاه تخصصی پرامپت',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen pb-20 bg-white">
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
