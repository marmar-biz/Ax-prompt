import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();

  // گرفتن کاربر از سشن فعلی
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { full_name } = await req.json();

  // ساخت/آپدیت پروفایل (ستون‌های جدول: id, phone, full_name, created_at)
  const { error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        phone: user.phone ?? null,
        full_name: full_name ?? null,
      },
      { onConflict: 'id' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
