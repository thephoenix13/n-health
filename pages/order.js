import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const RECOMMENDATIONS = {
  breakfast: {
    label: 'Breakfast',
    emoji: '🌅',
    picks: [
      { dish: 'Oatmeal with banana', note: 'Gentle on the stomach, filling, and warming. Ask for honey on the side.', emoji: '🥣', iron: false },
      { dish: 'Scrambled eggs + toast', note: 'Soft and protein-rich. Add spinach if available — great iron combo with lemon.', emoji: '🍳', iron: true },
      { dish: 'Greek yogurt parfait', note: 'Light and quick. Skip the granola if your stomach feels sensitive today.', emoji: '🫙', iron: false },
      { dish: 'Avocado toast', note: 'Good fats, gentle on digestion. Add a poached egg on top if available.', emoji: '🥑', iron: false },
      { dish: 'Warm porridge with berries', note: 'Soothing and anti-inflammatory. Ask for berries on the side.', emoji: '🫐', iron: false },
      { dish: 'Banana pancakes', note: 'Soft, gentle, and filling. Light syrup or honey instead of heavy toppings.', emoji: '🥞', iron: false },
      { dish: 'Peanut butter toast + warm milk', note: 'Easy, comforting, and calming. Great for slow mornings.', emoji: '🍞', iron: false },
      { dish: 'Soft boiled eggs + rice porridge', note: 'Very easy on the gut. Perfect if you\'re feeling delicate today.', emoji: '🍚', iron: true },
      { dish: 'Smoothie bowl', note: 'Ask for it not too cold. Banana, mango, and oat base work well.', emoji: '🥤', iron: false },
    ],
    avoid: ['Spicy items', 'Heavy cream or butter sauces', 'Citrus juices', 'Coffee or espresso drinks', 'Fried foods'],
    restaurants: [
      { name: 'Panera Bread', why: 'Oatmeal, egg bowls, soups — all gentle options' },
      { name: 'Local breakfast cafes', why: 'Eggs + toast is always a safe order' },
      { name: 'Sweetgreen', why: 'Warm grain bowls if you want something more substantial' },
    ],
  },
  lunch: {
    label: 'Lunch',
    emoji: '☀️',
    picks: [
      { dish: 'Chicken soup or broth bowl', note: 'The most restorative option. Clear or light broths, not cream-based.', emoji: '🍲', iron: false },
      { dish: 'Rice bowl with grilled chicken', note: 'Simple, filling, easy to digest. Ask for steamed veggies on the side.', emoji: '🍚', iron: false },
      { dish: 'Warm grain bowl', note: 'Go for warm bowls over cold salads. Good fats, widely available.', emoji: '🥗', iron: false },
      { dish: 'Lentil soup + bread', note: 'Iron-rich and filling. One of the best choices for energy today.', emoji: '🥣', iron: true },
      { dish: 'Grilled cheese + tomato soup', note: 'Comforting and easy to digest. Light tomato base, not creamy.', emoji: '🧀', iron: false },
      { dish: 'Congee or rice porridge', note: 'The gentlest option on this list. Perfect for low-energy days.', emoji: '🍜', iron: false },
      { dish: 'Quinoa bowl with roasted veggies', note: 'Complete protein, anti-inflammatory. Ask for olive oil dressing.', emoji: '🫘', iron: true },
      { dish: 'Tuna sandwich on soft bread', note: 'Iron-rich and easy. Ask for light mayo, no raw onion.', emoji: '🥪', iron: true },
      { dish: 'Miso soup + steamed rice', note: 'Probiotic and very gentle. Great pairing for any energy level.', emoji: '🍱', iron: false },
    ],
    avoid: ['Spicy curries', 'Heavy cream-based dishes', 'Fried items', 'Tomato-heavy sauces', 'Cold raw salads'],
    restaurants: [
      { name: 'Panera Bread', why: 'Soups and grain bowls are ideal' },
      { name: 'Sweetgreen', why: 'Warm bowls — ask for no raw onion' },
      { name: 'Local Asian spots', why: 'Rice porridge (congee) or plain rice bowls' },
    ],
  },
  dinner: {
    label: 'Dinner',
    emoji: '🌙',
    picks: [
      { dish: 'Grilled salmon or white fish', note: 'Anti-inflammatory and iron-rich. Lemon-herb or olive oil preparations.', emoji: '🐟', iron: true },
      { dish: 'Pasta with olive oil or light sauce', note: 'Olive oil, garlic, or white sauce. Avoid heavy tomato-based.', emoji: '🍝', iron: false },
      { dish: 'Chicken and rice', note: 'Safe, nourishing, easy on digestion. Reliable on any energy day.', emoji: '🍗', iron: false },
      { dish: 'Miso soup with tofu and rice', note: 'Probiotic, very gentle, and anti-inflammatory. Great for the gut.', emoji: '🍱', iron: false },
      { dish: 'Baked cod with mashed potato', note: 'Mild white fish, very easy on digestion. No heavy butter sauce.', emoji: '🥔', iron: false },
      { dish: 'Veggie stir-fry with rice', note: 'Well-cooked veggies are gentle. Light soy sauce, no chili.', emoji: '🥦', iron: true },
      { dish: 'Mediterranean chicken bowl', note: 'Grilled chicken, rice, light olive oil dressing. Simple and nourishing.', emoji: '🫙', iron: false },
      { dish: 'Thai coconut chicken soup', note: 'Light coconut broth, no chili. Warming and easy to digest.', emoji: '🍜', iron: false },
      { dish: 'Baked sweet potato + grilled chicken', note: 'Gentle, anti-inflammatory, and filling. A great combination.', emoji: '🍠', iron: true },
    ],
    avoid: ['Spicy food', 'Fried dishes', 'Heavy dairy', 'Tomato-heavy curries or pasta', 'Anything too rich or oily'],
    restaurants: [
      { name: 'Mediterranean spots', why: 'Grilled proteins, rice, light olive oil dressings' },
      { name: 'Japanese restaurants', why: 'Grilled fish, miso soup, rice — avoid spicy rolls' },
      { name: 'Any grilled protein place', why: 'Simple grilled chicken or fish with sides' },
    ],
  },
}

function getMealPeriod(hour) {
  if (hour >= 5 && hour < 12) return 'breakfast'
  if (hour >= 12 && hour < 17) return 'lunch'
  return 'dinner'
}

function randomPicks(pool, n = 3) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}

export default function Order() {
  const [mealPeriod, setMealPeriod] = useState('breakfast')
  const [visiblePicks, setVisiblePicks] = useState([])
  const [search, setSearch] = useState('')

  const getPool = (period, query) => {
    const all = RECOMMENDATIONS[period].picks
    if (!query.trim()) return all
    const q = query.toLowerCase()
    return all.filter(p =>
      p.dish.toLowerCase().includes(q) || p.note.toLowerCase().includes(q)
    )
  }

  const loadPicks = (period, query = '') => {
    const pool = getPool(period, query)
    setVisiblePicks(pool.length > 0 ? randomPicks(pool) : [])
  }

  useEffect(() => {
    const bostonHour = parseInt(
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false })
    )
    const period = getMealPeriod(bostonHour)
    setMealPeriod(period)
    loadPicks(period)
  }, [])

  const handleTabChange = (period) => {
    setMealPeriod(period)
    setSearch('')
    loadPicks(period)
  }

  const handleSearch = (val) => {
    setSearch(val)
    loadPicks(mealPeriod, val)
  }

  const handleRefresh = () => {
    const pool = getPool(mealPeriod, search)
    if (pool.length === 0) return
    let next
    let attempts = 0
    do {
      next = randomPicks(pool)
      attempts++
    } while (
      attempts < 20 &&
      next.length === visiblePicks.length &&
      next.every(p => visiblePicks.find(v => v.dish === p.dish))
    )
    setVisiblePicks(next)
  }

  const rec = RECOMMENDATIONS[mealPeriod]

  return (
    <Layout>
      <div className="mb-8">
        <div className="text-4xl mb-2">🍽️</div>
        <h1 className="text-2xl font-black text-amber-300">What to Order Today</h1>
        <p className="text-amber-500 font-semibold mt-1">Tailored picks for DoorDash & Uber Eats in Boston</p>
      </div>

      {/* Meal period tabs */}
      <div className="flex gap-2 mb-6">
        {Object.entries(RECOMMENDATIONS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              mealPeriod === key
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-400 hover:bg-amber-900/40'
            }`}
            style={mealPeriod !== key ? { border: '1px solid rgba(251, 191, 36, 0.25)' } : {}}
          >
            {val.emoji} {val.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative mb-7">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600">🔍</span>
        <input
          type="text"
          value={search}
          onChange={e => handleSearch(e.target.value)}
          placeholder="I'm in the mood for..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl text-sm font-semibold text-amber-100 placeholder-amber-700 outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
          style={{ background: 'rgba(120, 53, 15, 0.15)', border: '1px solid rgba(251, 191, 36, 0.2)' }}
        />
        {search && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-300 font-bold text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Top picks header + refresh */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-black text-amber-400 uppercase tracking-widest">✨ Top Picks</p>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 hover:text-amber-200 transition-all hover:bg-amber-900/40"
          style={{ border: '1px solid rgba(251, 191, 36, 0.25)' }}
        >
          ↺ Show me others
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-7">
        {visiblePicks.length > 0 ? visiblePicks.map((pick, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 border flex gap-4 items-start"
            style={{ background: 'rgba(120, 53, 15, 0.2)', borderColor: 'rgba(251, 191, 36, 0.2)' }}
          >
            <div className="text-3xl">{pick.emoji}</div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-black text-amber-200">{pick.dish}</h3>
                {pick.iron && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded-full border border-emerald-700/40">
                    Iron+
                  </span>
                )}
              </div>
              <p className="text-sm text-amber-100/70 leading-relaxed">{pick.note}</p>
            </div>
          </div>
        )) : (
          <div className="rounded-2xl p-5 text-center" style={{ border: '1px dashed rgba(251, 191, 36, 0.2)' }}>
            <p className="text-amber-600 font-semibold text-sm">No matches for &ldquo;{search}&rdquo; — try something else</p>
          </div>
        )}
      </div>

      {/* Avoid */}
      <div
        className="rounded-2xl p-4 mb-7 border"
        style={{ background: 'rgba(127, 29, 29, 0.2)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
      >
        <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-3">🚫 Skip These Today</p>
        <ul className="space-y-1.5">
          {rec.avoid.map((item, i) => (
            <li key={i} className="text-sm text-red-200/70 flex items-center gap-2">
              <span className="text-red-500">·</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Restaurants */}
      <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3">📍 Good Spots in Boston</p>
      <div className="flex flex-col gap-3">
        {rec.restaurants.map((r, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 border"
            style={{ background: 'rgba(15, 20, 10, 0.5)', borderColor: 'rgba(251, 191, 36, 0.15)' }}
          >
            <h3 className="font-black text-amber-200 text-sm mb-1">{r.name}</h3>
            <p className="text-xs text-amber-400/70">{r.why}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
