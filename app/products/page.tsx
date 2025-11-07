import ProductCard from '@/components/ProductCard';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const revalidate = 0; // داده‌ها تازه

export default async function ProductsPage() {
  const supabase = createSupabaseServerClient();

  const { data: products, error } = await supabase
    .from('products')
    .select('id,title,price,cover,short_desc,is_active')
    .eq('is_active', true)
    .order('sort', { ascending: true });

  if (error) {
    return <div className="p-4 text-red-600">خطا در بارگذاری محصولات: {error.message}</div>;
  }

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-extrabold">محصولات</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {products?.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            cover={p.cover}
            price={p.price}
            short_desc={p.short_desc}
          />
        ))}
      </div>
      {(!products || products.length === 0) && (
        <div className="p-8 text-center text-gray-500">فعلاً محصولی ثبت نشده.</div>
      )}
    </main>
  );
}
