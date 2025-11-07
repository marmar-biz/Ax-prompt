import Link from 'next/link'
import BottomNav from '../components/BottomNav'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import ProductCard from '../components/ProductCard'

export default function Home() {
  return (
    <main className="container mx-auto px-4 pb-28"> 
      <Header />

      <section className="mt-6">
        <div className="bg-gradient-to-b from-violet-100 to-white rounded-3xl p-4 sm:p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 bg-white/80 rounded-2xl px-4 py-2 shadow">
            <span className="text-2xl">👋</span>
            <span className="font-bold">به «پرامپت‌شاپ» خوش اومدی!</span>
          </div>
          <p className="mt-4 text-gray-600">
            فروشگاه تخصصی پرامپت برای طراحی، عکس، ویدیو و پروژه‌های هوش مصنوعی
          </p>
        </div>
      </section>

      <Tabs />

      {/* شبکه محصولات نمونه – بعداً به دیتابیس وصلش می‌کنیم */}
      <section className="mt-6 space-y-6">
        <ProductCard
          badge="۳۲۱ نفر خریدن"
          title="بانک پرامپت طلا و زیورآلات"
          bullets={[
            '۵۰۰+ پرامپت پیشرفته برای نمایش محصول',
            'مناسب برای آنلاین‌شاپ‌ها و طلافروشی‌ها',
            'تنها نیازمندی: اپلیکیشن ChatGPT',
          ]}
          ctaText="ورود"
          href="/categories/gold"
          cover="/cover-gold.jpg" /* می‌تونی بعداً عکس خودت رو بذاری */
          price={null}
        />

        <ProductCard
          badge="۱۰۹ نفر خریدن"
          title="بانک پرامپت کافه و رستوران"
          bullets={[
            '۸۰+ پرامپت برای فست‌فود + قهوه + کیک + مدل',
            'مناسب برای رستوران‌ها و کافه‌ها',
            'تنها نیازمندی: اپلیکیشن ChatGPT',
          ]}
          ctaText="خرید و دریافت"
          href="/packages/cafe"
          cover="/cover-cafe.jpg"
          price="۴۹۹,۰۰۰ تومان"
        />

        <ProductCard
          badge="۸۸ نفر خریدن"
          title="بانک پرامپت آرایشی بهداشتی"
          bullets={[
            '۱۲۰+ پرامپت برای نمایش محصول',
            'مناسب فروشگاه‌های لوازم آرایشی',
            'تنها نیازمندی: اپلیکیشن ChatGPT',
          ]}
          ctaText="خرید و دریافت"
          href="/packages/beauty"
          cover="/cover-beauty.jpg"
          price="۳۹۹,۰۰۰ تومان"
        />
      </section>

      <BottomNav />
    </main>
  )
}
