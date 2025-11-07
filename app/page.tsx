import Link from 'next/link'
import ProductCard from '../components/ProductCard'

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <header className="pt-6">
        <h1 className="text-3xl font-extrabold">سلام! 👋 به «پرامپت‌شاپ» خوش اومدی</h1>
        <p className="text-gray-600 mt-2">
          فروشگاه تخصصی پرامپت برای طراحی، عکس، ویدیو و پروژه‌های هوش مصنوعی
        </p>
      </header>

      {/* لیست محصولات/دسته‌ها */}
      <section className="mt-8">
        <ProductCard
          title="بانک پرامپت طلا و زیورآلات"
          description="۵۰۰+ پرامپت پیشرفته برای نمایش محصول (انگشتر، گردنبند، گوشواره، دستبند). مناسب برای طلافروشی‌ها و آنلاین‌شاپ‌ها."
          cover="/cover-gold.jpg"
        />

        {/* می‌تونی بعداً کارت‌های بیشتری اضافه کنی */}
        {/* <ProductCard title="بانک پرامپت آرایشی بهداشتی" description="..." cover="/cover-cosmetics.jpg" /> */}
      </section>

      <section className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/packages" className="btn">پکیج‌ها</Link>
        <Link href="/categories" className="btn">دسته‌ها</Link>
      </section>
    </main>
  )
}
