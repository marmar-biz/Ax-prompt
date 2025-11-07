'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import Link from 'next/link';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState(''); // نام و نام‌خانوادگی
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // ارسال کد
  const sendCode = async () => {
    setErr(null); setMsg(null); setLoading(true);
    try {
      // فرمت شماره به صورت بین‌المللی، مثلا ایران: +98912xxxxxxx
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: { channel: 'sms' }
      });
      if (error) throw error;
      setMsg('کد ارسال شد. صندوق پیامک را چک کن.');
      setStep('code');
    } catch (e: any) {
      setErr(e.message || 'خطا در ارسال کد');
    } finally { setLoading(false); }
  };

  // تأیید کد و ساخت/به‌روزرسانی پروفایل
  const verifyCode = async () => {
    setErr(null); setMsg(null); setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: 'sms'
      });
      if (error) throw error;

      // ساخت/آپدیت پروفایل
      const user = data.user;
      if (user) {
        await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: fullName })
        });
      }

      setMsg('ورود موفق! در حال انتقال…');
      // انتقال به صفحه اصلی
      window.location.href = '/';
    } catch (e: any) {
      setErr(e.message || 'کد نادرست است');
    } finally { setLoading(false); }
  };

  return (
    <main className="container mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-right">ورود / ثبت‌نام با موبایل</h1>

      {step === 'phone' && (
        <div className="space-y-4">
          <label className="block text-right">
            <span className="block mb-2">شماره موبایل (با +98)</span>
            <input
              dir="ltr"
              className="w-full rounded-md border px-3 py-2"
              placeholder="+98912xxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label className="block text-right">
            <span className="block mb-2">نام و نام خانوادگی</span>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="مثلاً مریم بی‌آزار"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          <button
            onClick={sendCode}
            disabled={loading || !phone}
            className="w-full rounded-lg bg-black text-white py-2 disabled:opacity-50"
          >
            {loading ? 'در حال ارسال…' : 'ارسال کد'}
          </button>
        </div>
      )}

      {step === 'code' && (
        <div className="space-y-4">
          <label className="block text-right">
            <span className="block mb-2">کد پیامک</span>
            <input
              dir="ltr"
              className="w-full rounded-md border px-3 py-2"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>

          <button
            onClick={verifyCode}
            disabled={loading || !code}
            className="w-full rounded-lg bg-black text-white py-2 disabled:opacity-50"
          >
            {loading ? 'در حال ورود…' : 'تأیید کد و ورود'}
          </button>

          <button
            onClick={() => setStep('phone')}
            className="w-full rounded-lg border py-2"
          >
            اصلاح شماره
          </button>
        </div>
      )}

      {msg && <p className="mt-4 text-green-600 text-right">{msg}</p>}
      {err && <p className="mt-4 text-red-600 text-right">{err}</p>}

      <div className="mt-8 text-right">
        <Link href="/" className="underline">بازگشت به خانه</Link>
      </div>
    </main>
  );
}
