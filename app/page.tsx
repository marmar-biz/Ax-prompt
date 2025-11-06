import Link from 'next/link'
import { supabase } from '../supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('items')
    .select('id,title,created_at')
    .order('created_at', { ascending: false })

  return (
    <main className="container mx-auto p-6">
      <header className="pt-6">
        <h1>سلام! 👋 به «عکس» خوش اومدی</h1>
        <p className="text-gray-600 mt-2">لیست تستی از Supabase پایین دیده میشه.</p>
      </header>

      <section className="mt-6 space-y-3">
        {error && (
          <div className="text-red-600">خطا در خواندن از دیتابیس: {error.message}</div>
        )}

        {!error && (!data || data.length === 0) && (
          <div>فعلاً هیچ آیتمی ثبت نشده.</div>
        )}

        {data?.map((it) => (
          <div key={it.id} className="border rounded p-3">
            <div className="font-medium">{it.title}</div>
            <div className="text-xs text-gray-500">
              {new Date(it.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 flex gap-3">
        <Link href="/categories" className="underline">دسته‌بندی‌ها</Link>
        <Link href="/packages" className="underline">پکیج‌ها</Link>
      </section>
    </main>
  )
}
