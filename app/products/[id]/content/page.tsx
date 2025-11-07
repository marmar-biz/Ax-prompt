'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type PromptItem = {
  id: string;
  product_id: string;
  title: string | null;
  text: string;       // متن پرامپت
  image_url: string | null;
};

export default function ProductContentPage() {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error, status } = await supabase
        .from('prompts') // اگر ویو محافظت‌شده داری، همان را بگذار
        .select('id,product_id,title,text,image_url')
        .eq('product_id', id)
        .order('id', { ascending: true });

      if (error) {
        // اگر RLS دسترسی ندهد، معمولاً status=401/403
        if (status && status >= 400) setDenied(true);
      } else if (data) {
        setItems(data as PromptItem[]);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="p-6">درحال بررسی دسترسی…</div>;
  if (denied) return <div className="p-6">این محتوا فقط برای خریداران در دسترس است.</div>;
  if (!items.length) return <div className="p-6">محتوایی ثبت نشده.</div>;

  const copy = async (t: string) => {
    await navigator.clipboard.writeText(t);
    alert('کپی شد ✅');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 grid gap-6">
      <h1 className="text-xl font-bold">محتوای محصول</h1>
      {items.map(it => (
        <div key={it.id} className="border rounded-lg overflow-hidden">
          {it.image_url ? <img src={it.image_url} alt={it.title ?? ''} className="w-full" /> : null}
          <div className="p-4 space-y-3">
            {it.title ? <h3 className="font-semibold">{it.title}</h3> : null}
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">{it.text}</pre>
            <button
              onClick={() => copy(it.text)}
              className="rounded border px-3 py-2 hover:bg-gray-50"
            >
              کپی کردن
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
