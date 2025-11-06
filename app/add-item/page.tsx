'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function AddItemPage() {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: any) {
    e.preventDefault()
    setMessage('در حال ارسال...')
    const { error } = await supabase.from('items').insert([{ title }])
    if (error) setMessage('❌ خطا در ثبت آیتم: ' + error.message)
    else {
      setMessage('✅ با موفقیت ثبت شد!')
      setTitle('')
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">افزودن آیتم جدید</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان آیتم..."
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ثبت
        </button>
      </form>
      {message && <p className="mt-3 text-gray-600">{message}</p>}
    </main>
  )
}
