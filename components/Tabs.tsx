'use client'

import { useState } from 'react'

export default function Tabs() {
  const [tab, setTab] = useState<'products' | 'orders'>('products')

  return (
    <div className="mt-6 grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-2xl">
      <button
        className={`py-2 rounded-xl ${tab==='products' ? 'bg-white shadow font-semibold' : 'text-gray-600'}`}
        onClick={()=>setTab('products')}
      >
        محصولات
      </button>
      <button
        className={`py-2 rounded-xl ${tab==='orders' ? 'bg-white shadow font-semibold' : 'text-gray-600'}`}
        onClick={()=>setTab('orders')}
      >
        خریدهای شما
      </button>
    </div>
  )
}
