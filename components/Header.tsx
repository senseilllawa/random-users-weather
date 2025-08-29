'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function Header() {
const pathname = usePathname()
const link = (href: string, label: string) => (
<Link href={href} className={`px-3 py-2 rounded-xl ${pathname === href ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
{label}
</Link>
)
return (
<header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200">
<div className="container flex items-center justify-between py-3">
<Link href="/" className="font-semibold text-lg">Users & Weather</Link>
<nav className="flex gap-2">
{link('/', 'Users')}
{link('/saved', 'Saved')}
</nav>
</div>
</header>
)
}