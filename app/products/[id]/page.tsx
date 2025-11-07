'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type Product = {
  id: string;
  title: string;
  price: number;
  cover_url: string | null;
  description: string | null;
  product_id?: string; // اگر در ویو/جدول‌هات نام متفاوت است، متناسب کن
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [p, setP] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id,title,price,cover_url,description')
        .eq('id', id)
        .maybeSingle();
      if (!error) setP(data as Product | null);
      setLoading(false);
    })();
  }, [id]);

  const handleBuy = async () => {
    setBuying(true);
    // فعلاً بدون درگاه: یک سفارش paid ثبت می‌کنیم
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert('لطفاً ابتدا وارد شوید.');
      setBuying(false);
      return;
    }

    const { error } = await supabase
      .from('orders')
      .insert({ product_id: id, status: 'paid' }); // اگر ستون‌های دیگری داری اضافه کن

    setBuying(false);
    if (error) {
      alert('خطا در ثبت خرید: ' + error.message);
      return;
    }
    router.push(`/product/${id}/content`);
  };

  if (loading) return <div className="p-6">درحال بارگذاری…</div>;
  if (!p) return <div className="p-6">محصول یافت نشد.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {p.cover_url ? <img src={p.cover_url} alt={p.title} className="w-full rounded" /> : null}
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <p className="text-gray-700 whitespace-pre-wrap">{p.description}</p>

      <div className="flex items-center gap-3">
        <span className="font-bold text-lg">{p.price.toLocaleString()} تومان</span>
        <button
          onClick={handleBuy}
          disabled={buying}
          className="rounded bg-black text-white px-4 py-2 disabled:opacity-60"
        >
          {buying ? 'درحال ثبت…' : 'خرید'}
        </button>
      </div>
    </div>
  );
}
