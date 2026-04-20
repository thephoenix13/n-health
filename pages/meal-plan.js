import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import Layout from '../components/Layout'

export default function MealPlan({ content }) {
  return (
    <Layout>
      <div className="mb-8">
        <div className="text-4xl mb-2">🥗</div>
        <h1 className="text-2xl font-black text-emerald-800">Meal Plan</h1>
        <p className="text-emerald-500 font-semibold mt-1">A week of gentle, nourishing meals</p>
      </div>
      <div
        className="markdown-content bg-white rounded-3xl p-6 shadow-sm border border-emerald-100"
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
