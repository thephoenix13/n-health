import Link from 'next/link'
import { useRouter } from 'next/router'

const navItems = [
  { href: '/grocery', label: '🛒 Grocery' },
  { href: '/meal-plan', label: '🥗 Meals' },
  { href: '/order', label: '🍽️ Order' },
]

export default function Layout({ children }) {
  const router = useRouter()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d0b18 0%, #150e28 50%, #0b1520 100%)' }}>
      <nav className="sticky top-0 z-10 backdrop-blur-sm border-b" style={{ background: 'rgba(15, 12, 24, 0.85)', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-black text-purple-300 text-lg tracking-tight">
            Hi Nida ✨
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                  router.pathname === item.href
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-purple-300 hover:bg-purple-900/50'
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
