'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

export default function ProductContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setDenied(true); setLoading(false); return; }

      // آیا این محصول را خریده؟
      const { data: order } = await supabase
        .from('orders')
        .select('id,status')
        .eq('user_id', user.id)
        .eq('product_id', id)
        .eq('status', 'paid')
        .maybeSingle();

      if (!order) { setDenied(true); setLoading(false); return; }

      // دریافت محتوای پرامپت‌ها
      const { data: rows } = await supabase
        .from('prompts')
        .select('id,title,body,image_url')
        .eq('product_id', id)
        .order('id', { ascending: true });

      setPrompts(rows || []);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="p-6">در حال بارگذاری…</div>;
  if (denied) return (
    <div className="p-6">
      برای دیدن این محتوا باید ابتدا این محصول را بخرید.
      <button onClick={() => router.replace(`/products/${id}`)} className="mt-3 px-3 py-1 border rounded">
        بازگشت به صفحه محصول
      </button>
    </div>
  );

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">محتوای محصول</h1>
      <div className="space-y-6">
        {prompts.map(p => (
          <div key={p.id} className="border rounded p-3">
            <h3 className="font-semibold">{p.title}</h3>
            {p.image_url && (/* @ts-expect-error */ <img src={p.image_url} alt="" className="w-full rounded mt-2" />)}
            <pre className="bg-gray-50 p-2 rounded mt-2 text-sm whitespace-pre-wrap">{p.body}</pre>
            <button
              onClick={() => navigator.clipboard.writeText(p.body)}
              className="mt-2 px-3 py-1 rounded bg-black text-white"
            >
              کپی کردن
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
