import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { AFFIRMATIONS, FACTS } from '../lib/content'

export default function Home() {
  const [greeting, setGreeting] = useState('Hello')
  const [affirmation, setAffirmation] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentFact, setCurrentFact] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) setGreeting('Good morning')
    else if (hour >= 12 && hour < 17) setGreeting('Good afternoon')
    else if (hour >= 17 && hour < 22) setGreeting('Good evening')
    else setGreeting('Hey, night owl')
    setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)])
  }, [])

  const handleBulbClick = () => {
    let newFact
    do {
      newFact = FACTS[Math.floor(Math.random() * FACTS.length)]
    } while (newFact === currentFact && FACTS.length > 1)
    setCurrentFact(newFact)
    setModalOpen(true)
  }

  return (
    <Layout>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 100" width="72" height="72" xmlns="http://www.w3.org/2000/svg">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <ellipse key={i} cx="50" cy="24" rx="7" ry="20" fill="white" opacity="0.88" transform={`rotate(${angle}, 50, 50)`} />
            ))}
            <circle cx="50" cy="50" r="10" fill="#fde68a" />
            <circle cx="50" cy="50" r="6" fill="#f59e0b" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-purple-200 mb-2">{greeting}, Nida</h1>
        <p className="text-purple-400 font-semibold">A little something to brighten your day.</p>
      </div>

      {/* Affirmation */}
      <div className="rounded-3xl p-6 mb-10 border" style={{ background: 'rgba(88, 28, 135, 0.25)', borderColor: 'rgba(147, 51, 234, 0.35)' }}>
        <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">✨ Today's thought</p>
        <p className="text-lg font-bold text-purple-100 leading-relaxed">"{affirmation}"</p>
      </div>

      {/* Nav cards — 2 column */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Link
          href="/grocery"
          className="rounded-3xl p-5 border hover:shadow-lg hover:-translate-y-1 transition-all"
          style={{ background: 'rgba(124, 45, 18, 0.25)', borderColor: 'rgba(234, 88, 12, 0.35)' }}
        >
          <div className="text-3xl mb-3">🛒</div>
          <h2 className="font-black text-orange-200 text-base mb-1">Grocery</h2>
          <p className="text-orange-400 text-sm font-medium">What to pick up</p>
        </Link>
        <Link
          href="/meal-plan"
          className="rounded-3xl p-5 border hover:shadow-lg hover:-translate-y-1 transition-all"
          style={{ background: 'rgba(6, 78, 59, 0.25)', borderColor: 'rgba(16, 185, 129, 0.35)' }}
        >
          <div className="text-3xl mb-3">🥗</div>
          <h2 className="font-black text-emerald-200 text-base mb-1">Meal Plan</h2>
          <p className="text-emerald-400 text-sm font-medium">Your nourishing week</p>
        </Link>
      </div>

      {/* Order card — full width */}
      <Link
        href="/order"
        className="block rounded-3xl p-5 border hover:shadow-lg hover:-translate-y-1 transition-all"
        style={{ background: 'rgba(120, 53, 15, 0.2)', borderColor: 'rgba(251, 191, 36, 0.3)' }}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">🍽️</div>
          <div>
            <h2 className="font-black text-amber-200 text-base mb-0.5">What to Order Today</h2>
            <p className="text-amber-400 text-sm font-medium">DoorDash & Uber Eats picks for Boston</p>
          </div>
        </div>
      </Link>

      {/* Dopamine Menu card — full width */}
      <Link
        href="/dopamine-menu"
        className="block rounded-3xl p-5 border hover:shadow-lg hover:-translate-y-1 transition-all mt-4"
        style={{ background: 'rgba(131, 24, 67, 0.2)', borderColor: 'rgba(236, 72, 153, 0.3)' }}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">🌈</div>
          <div>
            <h2 className="font-black text-pink-200 text-base mb-0.5">Dopamine Menu</h2>
            <p className="text-pink-400 text-sm font-medium">Pick something good when you need it</p>
          </div>
        </div>
      </Link>

      {/* Floating bulb */}
      <button
        onClick={handleBulbClick}
        className="bulb-btn fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl z-40 transition-transform hover:scale-110"
        style={{ background: 'rgba(251, 191, 36, 0.15)', border: '2px solid rgba(251, 191, 36, 0.45)' }}
        aria-label="Did you know?"
      >
        💡
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-w-sm w-full rounded-3xl p-7 relative"
            style={{ background: '#1a1228', border: '2px solid rgba(251, 191, 36, 0.35)', boxShadow: '0 0 40px rgba(251, 191, 36, 0.1)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-5 text-gray-600 hover:text-gray-300 text-lg font-bold transition-colors"
            >
              ✕
            </button>
            <div className="text-5xl mb-4 text-center">💡</div>
            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4 text-center">Did you know?</p>
            <p className="text-base font-semibold text-amber-100 leading-relaxed text-center">{currentFact}</p>
            <p className="text-xs text-amber-600 text-center mt-5 font-medium">click the bulb again for another one ✨</p>
          </div>
        </div>
      )}
    </Layout>
  )
}

