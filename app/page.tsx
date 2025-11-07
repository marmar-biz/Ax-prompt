'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase-browser';

type Product = {
  id: string;
  title: string;
  price: number;
  cover_url: string | null;
  short_desc: string | null;
};

export default function HomePage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id,title,price,cover_url,short_desc')
        .order('created_at', { ascending: false });
      if (!error && data) setItems(data as Product[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-6">درحال بارگذاری…</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 grid gap-4">
      <h1 className="text-2xl font-bold mb-2">محصولات</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(p => (
          <div key={p.id} className="border rounded-lg overflow-hidden">
            {p.cover_url ? (
              // اگر از next/image خطا گرفتی، موقتاً به <img> عوض کن
              <img src={p.cover_url} alt={p.title} className="w-full aspect-[16/9] object-cover" />
            ) : null}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="font-bold">{p.price.toLocaleString()} تومان</span>
              </div>
              {p.short_desc ? <p className="text-sm text-gray-600">{p.short_desc}</p> : null}
              <Link
                href={`/product/${p.id}`}
                className="inline-block mt-2 rounded bg-black text-white px-3 py-2"
              >
                مشاهده و خرید
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
