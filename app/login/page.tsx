import PhoneAuth from '@/components/PhoneAuth';

export const metadata = { title: 'ورود | پرامپت‌شاپ' };

export default function Page() {
  return (
    <main className="container mx-auto py-8">
      <PhoneAuth />
    </main>
  );
}
