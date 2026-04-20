import Link from 'next/link'
import { useRouter } from 'next/router'

const navItems = [
  { href: '/meal-plan', label: '🥗 Meals' },
  { href: '/grocery', label: '🛒 Grocery' },
  { href: '/memory', label: '📝 Notes' },
]

export default function Layout({ children }) {
  const router = useRouter()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf8f0 0%, #f3effe 50%, #edf9f0 100%)' }}>
      <nav className="sticky top-0 z-10 backdrop-blur-sm bg-white/70 border-b border-purple-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-black text-purple-700 text-lg tracking-tight">
            n ✨
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                  router.pathname === item.href
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
