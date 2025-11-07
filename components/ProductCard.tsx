'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id: string;
  title: string;
  cover: string | null;
  price: number;
  short_desc?: string | null;
};

export default function ProductCard({ id, title, cover, price, short_desc }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm">
      {/* کاور */}
      <div className="relative mb-3 h-52 w-full overflow-hidden rounded-xl">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            بدون تصویر
          </div>
        )}
      </div>

      {/* متن */}
      <h3 className="mb-1 line-clamp-1 text-lg font-bold">{title}</h3>
      {short_desc ? (
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{short_desc}</p>
      ) : null}

      <div className="mt-2 flex items-center justify-between">
        <div className="font-extrabold">{price.toLocaleString('fa-IR')} تومان</div>

        {/* ⬅️ اینجا خبری از «تعداد خریداران» نیست */}
        <Link
          href={`/checkout?id=${id}`}
          className="rounded-xl bg-black px-4 py-2 text-sm text-white"
        >
          خرید و دریافت
        </Link>
      </div>
    </div>
  );
}
