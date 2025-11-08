'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phase, setPhase] = useState<'phone'|'otp'>('phone');
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') || '/';

  const sendOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (!error) setPhase('otp');
    else alert(error.message);
  };

  const verifyOtp = async () => {
    const { data, error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    if (error) { alert(error.message); return; }
    // ساخت/به‌روزرسانی پروفایل این‌جا دلخواه است
    router.replace(next);
  };

  return (
    <main className="max-w-sm mx-auto p-4">
      <h1 className="text-lg font-bold mb-4">ورود / ثبت‌نام</h1>

      {phase === 'phone' && (
        <>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="شماره موبایل با 98+" className="w-full border p-2 rounded"/>
          <button onClick={sendOtp} className="mt-3 w-full py-2 rounded bg-black text-white">ارسال کد</button>
        </>
      )}

      {phase === 'otp' && (
        <>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="کد ارسال‌شده" className="w-full border p-2 rounded"/>
          <button onClick={verifyOtp} className="mt-3 w-full py-2 rounded bg-black text-white">تأیید</button>
        </>
      )}
    </main>
  );
}
