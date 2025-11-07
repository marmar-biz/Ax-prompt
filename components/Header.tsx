export default function Header() {
  return (
    <header className="pt-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-black text-white text-xl">
          ✨
        </div>
        <div>
          <div className="text-sm text-gray-500">۱۴۰۴ آبان ۱۴</div>
          <div className="font-bold">مریم</div>
        </div>
      </div>
      <div className="text-2xl">🛍️</div>
    </header>
  )
}
