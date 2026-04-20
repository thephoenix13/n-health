import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import Layout from '../components/Layout'

export default function Memory({ content }) {
  return (
    <Layout>
      <div className="mb-8">
        <div className="text-4xl mb-2">📝</div>
        <h1 className="text-2xl font-black text-sky-800">Notes</h1>
        <p className="text-sky-500 font-semibold mt-1">A running log of things to keep in mind</p>
      </div>
      <div
        className="markdown-content bg-white rounded-3xl p-6 shadow-sm border border-sky-100"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'memory.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const content = marked.parse(fileContent)
  return { props: { content } }
}
