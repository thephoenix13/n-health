import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import Layout from '../components/Layout'

export default function Grocery({ content }) {
  return (
    <Layout>
      <div className="mb-8">
        <div className="text-4xl mb-2">🛒</div>
        <h1 className="text-2xl font-black text-orange-800">Grocery List</h1>
        <p className="text-orange-500 font-semibold mt-1">Everything you need for the week</p>
      </div>
      <div
        className="markdown-content bg-white rounded-3xl p-6 shadow-sm border border-orange-100"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'grocery.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const content = marked.parse(fileContent)
  return { props: { content } }
}
