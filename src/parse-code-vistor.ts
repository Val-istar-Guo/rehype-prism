import Prism from 'prismjs'
import rehypeParse from 'rehype-parse'
import { Element, Parent, ElementContent } from 'hast'
import { Text } from 'mdast'
import { Visitor } from 'unist-util-visit/complex-types'
import { unified } from 'unified'
import { h } from 'hastscript'
import { select } from 'unist-util-select'
import { getLang } from './get-lang.js'
import { Checker } from './checker.js'
import { appendClassName } from './append-class-name.js'
import { getLineNumber } from './get-line-number.js'
import { RehypePrismOptions } from './rehype-prism-options.js'


const parser = unified()
  .use(rehypeParse, { fragment: true })

export function parseCodeVisitor(options?: RehypePrismOptions): Visitor<ElementContent, Parent> {
  return node => {
    if (!Checker.isElement(node) || node.tagName !== 'pre') return
    const preNode = node

    const codeNode = select('[tagName=code]', preNode)
    if (!Checker.isElement(codeNode)) return

    const lang = getLang(codeNode)
    if (!lang || !Prism.languages[lang]) return

    const textNode = select('text', codeNode) as (Text | null)
    if (!Checker.isText(textNode)) return

    const codeText = textNode.value

    const html = Prism.highlight(codeText, Prism.languages[lang], lang)
    const tree = parser.parse(html) as unknown as Element

    appendClassName(preNode, `language-${lang}`)

    codeNode.children = [...tree.children]

    if (options?.plugins?.includes('line-numbers')) {
      appendClassName(preNode, 'line-numbers')

      const lineNumber = getLineNumber(codeText)
      const lineNumberColumn = h(
        'span',
        {
          'aria-hidden': 'true',
          className: ['line-numbers-rows'],
        },
        new Array(lineNumber).fill(h('span')),
      )
      codeNode.children.push(lineNumberColumn)
    }
  }
}
