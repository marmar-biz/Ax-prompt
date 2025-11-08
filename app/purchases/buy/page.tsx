import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

export default async function BuyPage({ searchParams }: { searchParams: { product?: string } }) {
  const product_id = searchParams.product || '';
  // چون این فایل سروری است ولی از کلاینت supabase استفاده نمی‌کنیم:
  // از Route Handler استفاده کنیم ساده‌تر است → ریدایرکت می‌کنیم به /purchases/do?product=...
  redirect(`/purchases/do?product=${product_id}`);
}
