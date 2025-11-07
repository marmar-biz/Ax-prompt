'use server';

import { createServerClient } from '@/lib/supabase-server';

export async function upsertProfile() {
  const supabase = createServerClient();

  // گرفتن یوزر فعلی
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { ok:false, message:'کاربر یافت نشد' };

  // نام/نام‌خانوادگی فعلاً خالی؛ بعداً از فرم می‌گیریم
  const { error: upErr } = await supabase
    .from('profiles')
    .upsert({ id: user.id, phone: user.phone ?? null, full_name: null });

  if (upErr) return { ok:false, message: upErr.message };
  return { ok:true };
}

export async function logout() {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return { ok:true };
}
