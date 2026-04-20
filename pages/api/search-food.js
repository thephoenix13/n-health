import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { query, mealPeriod } = req.body
  if (!query?.trim() || !mealPeriod) return res.status(400).json({ error: 'Missing params' })

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: `You are a food recommendation assistant for Nida, a 32-year-old woman in Boston with:
- Systemic Lupus Erythematosus (SLE) and chronic fatigue
- Iron deficiency anemia (needs iron-rich foods)
- Recent gastritis recovery — avoid spicy, fried, heavily acidic foods
- Depression and anxiety

Always recommend gentle, easy-to-digest, anti-inflammatory options she can order from restaurants or delivery apps in Boston. Be warm and specific.`,
      messages: [{
        role: 'user',
        content: `Nida wants "${query}" for ${mealPeriod}. Give 3 dish options she can actually order in Boston right now. Be specific (real dish names), practical, and caring.

Reply with ONLY a valid JSON array — no extra text, no markdown:
[{"dish":"Dish Name","note":"1-2 sentence tip on how to order it and why it works for her","iron":true,"emoji":"🍜"}]`
      }]
    })

    const text = response.content[0].text.trim()
    const clean = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
    const picks = JSON.parse(clean)
    res.json({ picks })
  } catch (err) {
    console.error('Search error:', err)
    res.status(500).json({ error: 'Search failed' })
  }
}
