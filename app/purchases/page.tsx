'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

type Row = {
  orders_id: string;
  status: string;
  products_id: string;
  products_title: string;
};

export default function PurchasesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // اگر در Supabase ویو join آماده داری، همان را select کن.
      const { data, error } = await supabase
        .from('orders_with_products') // نام پیشنهادی ویو؛ اگر نداری:
        // .from('orders') .select('id,status,product_id,products(title)')  // گزینه جایگزین
        .select('orders_id,status,products_id,products_title')
        .order('orders_id', { ascending: false });

      if (!error && data) setRows(data as any);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-6">درحال بارگذاری…</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">خریدهای شما</h1>
      {!rows.length && <div>هنوز خریدی ثبت نکرده‌اید.</div>}

      <div className="grid gap-3">
        {rows.map(r => (
          <div key={r.orders_id} className="border rounded p-3 flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold">{r.products_title}</div>
              <div className="text-sm text-gray-600">وضعیت: {r.status === 'paid' ? 'پرداخت‌شده' : r.status}</div>
            </div>
            <Link href={`/product/${r.products_id}/content`} className="rounded bg-black text-white px-3 py-2">
              مشاهده محتوا
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
