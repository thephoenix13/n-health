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
        <h1 className="text-3xl font-black text-purple-800 mb-2">{greeting}, Nida</h1>
        <p className="text-purple-400 font-semibold">A little something to brighten your day.</p>
      </div>

      {/* Affirmation */}
      <div className="bg-purple-50 border border-purple-200 rounded-3xl p-6 mb-4 shadow-sm">
        <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">✨ Today's thought</p>
        <p className="text-lg font-bold text-purple-800 leading-relaxed">"{affirmation}"</p>
      </div>

      {/* Fact of the day */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 mb-10 shadow-sm">
        <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-3">🌟 Did you know?</p>
        <p className="text-base font-semibold text-amber-900 leading-relaxed">{fact}</p>
      </div>

      {/* Nav cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/meal-plan"
          className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="text-3xl mb-3">🥗</div>
          <h2 className="font-black text-emerald-800 text-base mb-1">Meal Plan</h2>
          <p className="text-emerald-600 text-sm font-medium">Your nourishing week</p>
        </Link>
        <Link
          href="/grocery"
          className="bg-orange-50 border border-orange-200 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="text-3xl mb-3">🛒</div>
          <h2 className="font-black text-orange-800 text-base mb-1">Grocery</h2>
          <p className="text-orange-600 text-sm font-medium">What to pick up</p>
        </Link>
        <Link
          href="/memory"
          className="bg-sky-50 border border-sky-200 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="text-3xl mb-3">📝</div>
          <h2 className="font-black text-sky-800 text-base mb-1">Notes</h2>
          <p className="text-sky-600 text-sm font-medium">Things to remember</p>
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
