import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import Layout from '../components/Layout'

export default function MealPlan({ content }) {
  return (
    <Layout>
      <div className="mb-8">
        <div className="text-4xl mb-2">🥗</div>
        <h1 className="text-2xl font-black text-emerald-300">Meal Plan</h1>
        <p className="text-emerald-500 font-semibold mt-1">A week of gentle, nourishing meals</p>
      </div>
      <div
        className="markdown-content rounded-3xl p-6 border"
        style={{ background: 'rgba(15, 20, 18, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'meal_plan.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const content = marked.parse(fileContent)
  return { props: { content } }
}
