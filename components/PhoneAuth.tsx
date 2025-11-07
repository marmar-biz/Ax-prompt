'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function PhoneAuth() {
  const [step, setStep] = useState<'phone'|'verify'|'profile'>('phone');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [error, setError] = useState<string|undefined>();

  const sendOtp = async () => {
    setError(undefined); setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'sms' }   // SMS OTP
    });
    setLoading(false);
    if (error) setError(error.message);
    else setStep('verify');
  };

  const verifyOtp = async () => {
    setError(undefined); setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });
    setLoading(false);
    if (error) setError(error.message);
    else if (data?.session) setStep('profile');
  };

  const saveProfile = async () => {
    setError(undefined); setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('ورود نامعتبر است'); setLoading(false); return; }

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, phone, first_name: firstName, last_name: lastName });

    setLoading(false);
    if (error) setError(error.message);
    else window.location.href = '/'; // برگشت به خانه
  };

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4">
      {step === 'phone' && (
        <>
          <h1 className="text-xl font-bold">ورود / ثبت‌نام با موبایل</h1>
          <input
            className="input w-full"
            placeholder="مثلاً +98912xxxxxxx"
            value={phone}
            onChange={e=>setPhone(e.target.value)}
          />
          <button className="btn w-full" onClick={sendOtp} disabled={loading}>
            {loading ? 'در حال ارسال...' : 'ارسال کد'}
          </button>
        </>
      )}

      {step === 'verify' && (
        <>
          <h1 className="text-xl font-bold">تأیید کد</h1>
          <input
            className="input w-full"
            placeholder="کد ۶ رقمی"
            value={token}
            onChange={e=>setToken(e.target.value)}
          />
          <button className="btn w-full" onClick={verifyOtp} disabled={loading}>
            {loading ? 'در حال تأیید...' : 'تأیید'}
          </button>
        </>
      )}

      {step === 'profile' && (
        <>
          <h1 className="text-xl font-bold">تکمیل پروفایل</h1>
          <input className="input w-full" placeholder="نام" value={firstName} onChange={e=>setFirstName(e.target.value)} />
          <input className="input w-full" placeholder="نام خانوادگی" value={lastName} onChange={e=>setLastName(e.target.value)} />
          <button className="btn w-full" onClick={saveProfile} disabled={loading}>
            {loading ? 'در حال ذخیره...' : 'ذخیره و ورود'}
          </button>
        </>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <p className="text-xs text-gray-500">با ورود، قوانین و حریم خصوصی را می‌پذیرید.</p>
    </div>
  );
}
