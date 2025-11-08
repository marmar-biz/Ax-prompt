import Link from 'next/link';
import AuthButton from './AuthButton';

export default function Header() {
  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
      <Link href="/" className="text-lg font-bold">پرامپت‌شاپ</Link>
      <nav className="flex items-center gap-3">
        <Link href="/products" className="hover:underline">محصولات</Link>
        <Link href="/purchases" className="hover:underline">خریدهای شما</Link>
        <AuthButton />
      </nav>
    </header>
  );
}
