import Prism from 'prismjs'
import parse from 'rehype-parse'
import unified from 'unified'
import * as mdast from 'mdast'
import * as hast from 'hast'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { select } from 'unist-util-select'


const getLang = (node: hast.Element): string => {
  const lang: string = node.properties?.className?.[0] || ''
  return lang.replace(/^language-/, '')
}

const visitor = (preNode: hast.Element): void => {
  const codeNode = select('[tagName=code]', preNode) as (hast.Element | null)

  if (!codeNode) return
  const lang = getLang(codeNode)

  if (!lang || !Prism.languages[lang]) return

  const textNode = select('text', codeNode) as (mdast.Text | null)
  if (!textNode) return

  const className = `language-${lang}`
  const html = Prism.highlight(textNode.value, Prism.languages[lang], lang)
  const tree = unified()
    .use(parse, { fragment: true })
    .parse(html) as hast.Element

  if (!preNode.properties) preNode.properties = {}
  if (!preNode.properties.className) preNode.properties.className = []
  if (typeof preNode.properties.className === 'string') preNode.properties.className = [preNode.properties.className]
  if (typeof preNode.properties.className === 'number') preNode.properties.className = [preNode.properties.className]
  if (typeof preNode.properties.className === 'boolean') preNode.properties.className = []
  preNode.properties.className = [...preNode.properties.className, className]

  codeNode.children = tree.children
}

const selector = (node: hast.Element): boolean => node.tagName === 'pre'
const rehypePrism: unified.Plugin = () => (tree: Node) => {
  visit(tree, selector as any, visitor)
}

export default rehypePrism
