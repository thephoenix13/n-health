import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { AFFIRMATIONS, FACTS } from '../lib/content'

export default function Home({ dayIndex }) {
  const [greeting, setGreeting] = useState('Hello')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) setGreeting('Good morning')
    else if (hour >= 12 && hour < 17) setGreeting('Good afternoon')
    else if (hour >= 17 && hour < 22) setGreeting('Good evening')
    else setGreeting('Hey, night owl')
  }, [])

  const affirmation = AFFIRMATIONS[dayIndex % AFFIRMATIONS.length]
  const fact = FACTS[dayIndex % FACTS.length]

  return (
    <Layout>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🌸</div>
        <h1 className="text-3xl font-black text-purple-200 mb-2">{greeting}, Nida</h1>
        <p className="text-purple-400 font-semibold">A little something to brighten your day.</p>
      </div>

      {/* Affirmation */}
      <div className="rounded-3xl p-6 mb-4 border" style={{ background: 'rgba(88, 28, 135, 0.25)', borderColor: 'rgba(147, 51, 234, 0.35)' }}>
        <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">✨ Today's thought</p>
        <p className="text-lg font-bold text-purple-100 leading-relaxed">"{affirmation}"</p>
      </div>

      {/* Fact of the day */}
      <div className="rounded-3xl p-6 mb-10 border" style={{ background: 'rgba(120, 53, 15, 0.25)', borderColor: 'rgba(217, 119, 6, 0.35)' }}>
        <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3">🌟 Did you know?</p>
        <p className="text-base font-semibold text-amber-100 leading-relaxed">{fact}</p>
      </div>

      {/* Nav cards — Grocery first */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        <Link
          href="/memory"
          className="rounded-3xl p-5 border hover:shadow-lg hover:-translate-y-1 transition-all"
          style={{ background: 'rgba(12, 74, 110, 0.25)', borderColor: 'rgba(14, 165, 233, 0.35)' }}
        >
          <div className="text-3xl mb-3">📝</div>
          <h2 className="font-black text-sky-200 text-base mb-1">Notes</h2>
          <p className="text-sky-400 text-sm font-medium">Things to remember</p>
        </Link>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayIndex = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return { props: { dayIndex } }
}
