import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const RECOMMENDATIONS = {
  breakfast: {
    label: 'Breakfast',
    emoji: '🌅',
    picks: [
      { dish: 'Oatmeal with banana', note: 'Gentle on the stomach, filling, and warming. Ask for honey on the side.', emoji: '🥣', iron: false },
      { dish: 'Scrambled eggs + toast', note: 'Soft and protein-rich. Add spinach if available — great iron combo with a squeeze of lemon.', emoji: '🍳', iron: true },
      { dish: 'Greek yogurt parfait', note: 'Light and quick. Skip the granola if your stomach feels sensitive today.', emoji: '🫙', iron: false },
      { dish: 'Avocado toast', note: 'Good fats, gentle on digestion. Add a poached egg on top if available.', emoji: '🥑', iron: false },
      { dish: 'Warm porridge with berries', note: 'Soothing and anti-inflammatory. Ask for berries on the side, not blended in.', emoji: '🫐', iron: false },
      { dish: 'Banana pancakes', note: 'Soft, gentle, and filling. Ask for light syrup or honey instead of heavy toppings.', emoji: '🥞', iron: false },
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
      { dish: 'Chicken soup or broth bowl', note: 'The most restorative option. Look for clear or light broths, not cream-based.', emoji: '🍲', iron: false },
      { dish: 'Rice bowl with grilled chicken', note: 'Simple, filling, easy to digest. Ask for steamed veggies on the side.', emoji: '🍚', iron: false },
      { dish: 'Warm grain bowl', note: 'Good fats, widely available. Go for warm bowls over cold salads.', emoji: '🥗', iron: false },
      { dish: 'Lentil soup + bread', note: 'Iron-rich and filling. One of the best choices for energy today.', emoji: '🥣', iron: true },
      { dish: 'Grilled cheese + tomato soup', note: 'Comforting and easy to digest. Opt for a light tomato base, not creamy.', emoji: '🧀', iron: false },
      { dish: 'Congee or rice porridge', note: 'The gentlest option on this list. Perfect for low-energy days.', emoji: '🍜', iron: false },
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
      { dish: 'Grilled salmon or white fish', note: 'Anti-inflammatory and iron-rich. Look for lemon-herb or olive oil preparations.', emoji: '🐟', iron: true },
      { dish: 'Pasta with olive oil or light sauce', note: 'Stick to olive oil, garlic, or white sauce. Avoid heavy tomato-based.', emoji: '🍝', iron: false },
      { dish: 'Chicken and rice', note: 'Safe, nourishing, easy on digestion. A reliable choice on any energy day.', emoji: '🍗', iron: false },
      { dish: 'Miso soup with tofu and rice', note: 'Probiotic, very gentle, and anti-inflammatory. Great for the gut.', emoji: '🍱', iron: false },
      { dish: 'Baked cod with mashed potato', note: 'Mild white fish, very easy on digestion. Ask for no heavy butter sauce.', emoji: '🥔', iron: false },
      { dish: 'Veggie stir-fry with rice', note: 'Well-cooked veggies are gentle. Ask for light soy sauce, no chili.', emoji: '🥦', iron: true },
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

function pickRandom(arr, n, exclude = []) {
  const pool = arr.filter(item => !exclude.includes(item))
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export default function Order() {
  const [mealPeriod, setMealPeriod] = useState('breakfast')
  const [visiblePicks, setVisiblePicks] = useState([])

  const loadPicks = (period) => {
    setVisiblePicks(pickRandom(RECOMMENDATIONS[period].picks, 3))
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
    loadPicks(period)
  }

  const handleRefresh = () => {
    setVisiblePicks(prev => pickRandom(RECOMMENDATIONS[mealPeriod].picks, 3, prev))
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
      <div className="flex gap-2 mb-7">
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

      {/* Top picks header + refresh */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-black text-amber-400 uppercase tracking-widest">✨ Top Picks</p>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 hover:text-amber-200 transition-all hover:bg-amber-900/40"
          style={{ border: '1px solid rgba(251, 191, 36, 0.25)' }}
        >
          <span>↺</span> Show me others
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-7">
        {visiblePicks.map((pick, i) => (
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
        ))}
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
