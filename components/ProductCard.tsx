import Link from 'next/link'

type Props = {
  badge: string
  title: string
  bullets: string[]
  ctaText: string
  href: string
  cover?: string | null
  price?: string | null
}

export default function ProductCard({
  badge, title, bullets, ctaText, href, cover = null, price = null
}: Props) {
  return (
    <article className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
      {cover ? (
        <div className="relative">
          {/* می‌تونی بعداً از next/image استفاده کنی */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt={title} className="w-full h-56 object-cover" />
          <div className="absolute top-3 left-3 bg-white/90 text-gray-700 text-sm px-3 py-1 rounded-full shadow">
            {badge}
          </div>
        </div>
      ) : null}

      <div className="p-5">
        <h3 className="text-xl font-extrabold mb-2">{title}</h3>
        <ul className="space-y-2 text-gray-700 leading-7 mb-4 list-disc pr-6">
          {bullets.map((b, i)=>(
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-2xl"
          >
            <span className="text-lg">←</span>
            <span>{ctaText}</span>
          </Link>

          {price ? (
            <div className="text-gray-900 font-extrabold">{price}</div>
          ) : <div/>}
        </div>
      </div>
    </article>
  )
}
