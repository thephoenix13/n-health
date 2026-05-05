import Layout from '../components/Layout'

const sections = [
  {
    title: 'Appetizers',
    subtitle: '5 min or less',
    note: 'Quick hits. No commitment.',
    emoji: '⚡',
    bg: 'rgba(236, 72, 153, 0.12)',
    border: 'rgba(236, 72, 153, 0.3)',
    titleColor: 'text-pink-200',
    subColor: 'text-pink-400',
    items: [
      'Step outside and get sunlight',
      'Make a cup of chai / coffee',
      'Stretch or shake out your body',
      'Put on one song you love and just listen',
      'Splash water on your face',
      'Text someone something nice',
    ],
  },
  {
    title: 'Main Courses',
    subtitle: '15–30 min',
    note: 'Requires a little energy. Always worth it.',
    emoji: '🌿',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.3)',
    titleColor: 'text-emerald-200',
    subColor: 'text-emerald-400',
    items: [
      'Go for a walk (no podcast, just walk)',
      'Journal — brain dump, no filter',
      'Read something you\'ve been meaning to',
      'Do one thing that\'s been sitting on your to-do list',
      'Cook or eat something proper',
    ],
  },
  {
    title: 'Desserts',
    subtitle: 'Pure fun, no productivity allowed',
    note: 'Guilt-free. That\'s the rule.',
    emoji: '🍭',
    bg: 'rgba(251, 191, 36, 0.1)',
    border: 'rgba(251, 191, 36, 0.3)',
    titleColor: 'text-amber-200',
    subColor: 'text-amber-400',
    items: [
      'Watch something funny / rewatch a favourite scene',
      'Play a game (phone, console, whatever)',
      'Browse something you genuinely enjoy',
      'Doodle or sketch',
    ],
  },
  {
    title: 'Specials',
    subtitle: 'Bigger, occasional',
    note: 'For when you have real time and need a real reset.',
    emoji: '✨',
    bg: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.35)',
    titleColor: 'text-purple-200',
    subColor: 'text-purple-400',
    items: [
      'Long walk or run somewhere new',
      'Catch up with a friend (call, not text)',
      'Work on a creative project just for fun',
      'Go somewhere — a café, a park, anywhere that isn\'t your desk',
    ],
  },
  {
    title: 'Side Dishes',
    subtitle: 'Pair with other tasks',
    note: 'Things that make work or chores better.',
    emoji: '🎧',
    bg: 'rgba(56, 189, 248, 0.1)',
    border: 'rgba(56, 189, 248, 0.3)',
    titleColor: 'text-sky-200',
    subColor: 'text-sky-400',
    items: [
      'A great playlist or album',
      'Podcast on a walk',
      'Ambient / lo-fi while deep working',
    ],
  },
]

export default function DopamineMenu() {
  return (
    <Layout>
      <div className="mb-8">
        <div className="text-4xl mb-2">🌈</div>
        <h1 className="text-2xl font-black text-pink-300">Dopamine Menu</h1>
        <p className="text-pink-500 font-semibold mt-1">
          When you feel restless or drained — pick something from here instead.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-3xl p-6 border"
            style={{ background: section.bg, borderColor: section.border }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{section.emoji}</span>
              <h2 className={`font-black text-lg ${section.titleColor}`}>{section.title}</h2>
              <span className={`text-xs font-bold uppercase tracking-widest ml-1 ${section.subColor}`}>
                — {section.subtitle}
              </span>
            </div>
            <p className={`text-sm font-medium mb-4 ${section.subColor} opacity-75`}>{section.note}</p>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className={`mt-1 text-xs ${section.subColor}`}>◆</span>
                  <span className={`text-sm font-semibold ${section.titleColor}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Rules */}
      <div
        className="rounded-3xl p-6 border"
        style={{ background: 'rgba(88, 28, 135, 0.2)', borderColor: 'rgba(147, 51, 234, 0.3)' }}
      >
        <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">📋 Rules</p>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="text-purple-500 font-black text-sm">1.</span>
            <span className="text-purple-100 text-sm font-semibold">
              <span className="font-black">Pick, don't scroll.</span> The menu exists so you don't have to decide under low dopamine.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-500 font-black text-sm">2.</span>
            <span className="text-purple-100 text-sm font-semibold">
              <span className="font-black">No guilt.</span> Desserts are valid.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-purple-500 font-black text-sm">3.</span>
            <span className="text-purple-100 text-sm font-semibold">
              <span className="font-black">Update it.</span> If something stops working, swap it out.
            </span>
          </li>
        </ol>
      </div>
    </Layout>
  )
}
