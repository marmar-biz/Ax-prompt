'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function clsx(...a:string[]){return a.filter(Boolean).join(' ')}
const tabs=[
  {href:'/',label:'خانه'},
  {href:'/categories',label:'دسته‌ها'},
  {href:'/packages',label:'پکیج‌ها'},
  {href:'/profile',label:'پروفایل'}
]
export default function BottomNav(){
  const p=usePathname()
  return(<nav className="bottom-nav"><ul>
    {tabs.map(t=>(<li key={t.href}>
      <Link href={t.href} className={clsx('block', p===t.href&&'font-bold')}>{t.label}</Link>
    </li>))}
  </ul></nav>)
}
GamepadHapticActuator
