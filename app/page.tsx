import Link from 'next/link'
import { supabase } from '../supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('items')
    .select('id,title,created_at')
    .order('created_at', { ascending: false })

  return (
    <main className="container mx-auto p-6 text-right">
      <header className="pt-6">
        <h1 className="text-2xl font-bold mb-2">👋 سلام! به «پرامپت‌شاپ» خوش اومدی</h1>
        <p className="text-gray-600">
          فروشگاه تخصصی پرامپت برای طراحی، عکس، ویدیو و پروژه‌های هوش مصنوعی
        </p>
      </header>

      <section className="mt-8 space-y-3">
        {error && (
          <div className="text-red-600">⚠️ خطا در خواندن داده‌ها از پایگاه داده: {error.message}</div>
        )}

        {!error && (!data || data.length === 0) && (
          <div>📭 هنوز هیچ پرامپتی ثبت نشده.</div>
        )}

        {data?.map((it) => (
          <div key={it.id} className="border rounded p-3 shadow-sm">
            <div className="font-medium">{it.title}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(it.created_at).toLocaleString('fa-IR')}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 flex justify-center gap-4">
        <Link href="/categories" className="border px-4 py-2 rounded-md hover:bg-gray-100">
          دسته‌ها
        </Link>
        <Link href="/packages" className="border px-4 py-2 rounded-md hover:bg-gray-100">
          پکیج‌ها
        </Link>
      </section>
    </main>
  )
}
