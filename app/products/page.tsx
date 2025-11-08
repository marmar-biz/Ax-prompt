import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;

export default async function ProductsPage() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: products, error } = await sb
    .from('products')
    .select('id, title, price, cover_url, short_desc')
    .order('title', { ascending: true });

  if (error) return <div className="p-4">خطا در دریافت محصولات</div>;

  return (
    <main className="max-w-5xl mx-auto p-4 grid gap-6 sm:grid-cols-2">
      {products?.map((p) => (
        <Link key={p.id} href={`/products/${p.id}`} className="border rounded-md p-3 hover:shadow">
          {p.cover_url && (
            // @ts-expect-error next/image خارج دامنه → فعلاً از img عادی استفاده می‌کنیم
            <img src={p.cover_url} alt={p.title} className="w-full h-48 object-cover rounded" />
          )}
          <h3 className="mt-3 font-bold">{p.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{p.short_desc}</p>
          <p className="mt-2 font-semibold">{p.price.toLocaleString()} تومان</p>
        </Link>
      ))}
    </main>
  );
}
