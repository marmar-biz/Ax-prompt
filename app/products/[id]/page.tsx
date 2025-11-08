import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: product } = await sb
    .from('products')
    .select('id, title, price, cover_url, description')
    .eq('id', params.id)
    .single();

  if (!product) return <div className="p-4">محصول پیدا نشد.</div>;

  return (
    <main className="max-w-3xl mx-auto p-4">
      {product.cover_url && (
        // @ts-expect-error img معمولی
        <img src={product.cover_url} alt={product.title} className="w-full rounded-md" />
      )}
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="mt-4 font-semibold">{product.price.toLocaleString()} تومان</p>

      {/* شبیه‌سازی پرداخت: رفتن به مسیر خرید */}
      <Link
        href={`/purchases/buy?product=${product.id}`}
        className="inline-block mt-4 px-4 py-2 rounded bg-black text-white"
      >
        خرید
      </Link>

      <Link
        href={`/products/${product.id}/content`}
        className="inline-block mt-4 ms-3 px-4 py-2 rounded border"
      >
        نمایش محتوا (اگر خرید شده باشد)
      </Link>
    </main>
  );
}
