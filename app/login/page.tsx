'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phase, setPhase] = useState<'ask'|'verify'>('ask');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'phone'|'email'>('phone');
  const [message, setMessage] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      if (method === 'phone') {
        // نکته: برای کارکرد واقعی، باید Phone Auth را در Supabase فعال و سرویس SMS تنظیم شود
        const { error } = await supabase.auth.signInWithOtp({ phone });
        if (error) throw error;
        setPhase('verify');
        setMessage('کد برای شما ارسال شد.');
      } else {
        const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: window.location.origin + '/login' }});
        if (error) throw error;
        setMessage('لینک/کد یک‌بارمصرف به ایمیل شما ارسال شد.');
        setPhase('verify');
      }
    } catch (err: any) {
      setMessage(err.message ?? 'خطا در ارسال کد');
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      if (method === 'phone') {
        const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
        if (error) throw error;
      }
      setMessage('ورود موفق بود. در حال انتقال...');
      router.push('/'); // پس از ورود به صفحه اصلی
    } catch (err: any) {
      setMessage(err.message ?? 'کد نامعتبر است');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">ورود / ثبت‌نام</h2>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMethod('phone')}
          className={`px-3 py-2 rounded border ${method==='phone'?'bg-black text-white':'bg-white'}`}
        >
          با موبایل
        </button>
        <button
          onClick={() => setMethod('email')}
          className={`px-3 py-2 rounded border ${method==='email'?'bg-black text-white':'bg-white'}`}
        >
          با ایمیل
        </button>
      </div>

      {phase === 'ask' && (
        <form onSubmit={sendCode} className="space-y-4">
          {method === 'phone' ? (
            <input
              dir="ltr"
              required
              placeholder="مثلاً +98912xxxxxxx"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <input
              type="email"
              required
              placeholder="ایمیل شما"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          )}

          <button
            disabled={loading}
            className="w-full rounded bg-black text-white py-2"
          >
            {loading ? 'در حال ارسال...' : 'ارسال کد'}
          </button>
        </form>
      )}

      {phase === 'verify' && (
        <form onSubmit={verifyCode} className="space-y-4">
          <input
            required
            placeholder="کد ۶ رقمی"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button
            disabled={loading}
            className="w-full rounded bg-black text-white py-2"
          >
            {loading ? 'در حال بررسی...' : 'تأیید'}
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

      <p className="mt-6 text-xs text-gray-500">
        نکته: اگر پیامک فعال نباشد، روش ایمیل را استفاده کنید. بعداً که SMS Provider را در Supabase
        تنظیم کردی، ورود با موبایل هم فعال می‌شود.
      </p>
    </div>
  );
}
