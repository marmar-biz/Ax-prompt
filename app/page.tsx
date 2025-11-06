import Link from 'next/link'
import BottomNav from '../components/BottomNav'
export default function Home(){
  return(<main className="container pb-20 space-y-6">
    <header className="pt-6">
      <h1>سلام! 👋 به «عکس» خوش اومدی</h1>
      <p className="text-gray-600 mt-2">بانک پرامپت‌ها و پکیج‌ها</p>
    </header>
    <section className="grid grid-cols-2 gap-4">
      <Link href="/categories" className="card">دسته‌ها</Link>
      <Link href="/packages" className="card">فروشگاه پکیج‌ها</Link>
    </section>
    <BottomNav/>
  </main>)
}
