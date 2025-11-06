import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: 'عکس – بانک پرامپت',
  description: 'وب‌اپلیکیشن بانک پرامپت و ایده | PWA',
  manifest: '/manifest.json',
  icons: { icon: '/icons/icon-192.png' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={GeistSans.className}>
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
      <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){navigator.serviceWorker.register('/service-worker.js');}`}} />
    </html>
  )
}
