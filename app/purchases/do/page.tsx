'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

export default function DoPurchase() {
  const sp = useSearchParams();
  const router = useRouter();
  const product_id = sp.get('product') || '';

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login?next=' + encodeURIComponent(`/products/${product_id}`));
        return;
      }
      // ثبت سفارش با وضعیت paid
      await supabase.from('orders').insert({
        user_id: user.id,
        product_id,
        status: 'paid'
      });
      router.replace(`/products/${product_id}/content`);
    })();
  }, [product_id, router]);

  return <div className="p-6">در حال ثبت خرید…</div>;
}
