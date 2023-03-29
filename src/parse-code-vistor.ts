import Prism from 'prismjs'
import rehypeParse from 'rehype-parse'
import { Element, Parent, ElementContent } from 'hast'
import { Visitor } from 'unist-util-visit/complex-types'
import { unified } from 'unified'
import { select } from 'unist-util-select'
import { getLang } from './utils/get-lang.js'
import { appendClassName } from './utils/append-class-name.js'
import { RehypePrismOptions } from './interface/rehype-prism-options.js'

import { isElementNode } from './utils/is-element-node.js'
import { isTextNode } from './utils/is-text-node.js'
import { applyPlugin } from './plugins/apply-plugin.js'


const parser = unified()
  .use(rehypeParse, { fragment: true })

export function parseCodeVisitor(options?: RehypePrismOptions): Visitor<ElementContent, Parent> {
  return node => {
    if (!isElementNode(node) || node.tagName !== 'pre') return
    const preElement = node

    const codeElement = select('[tagName=code]', preElement)
    if (!isElementNode(codeElement)) return

    const lang = getLang(codeElement)
    if (!lang || !Prism.languages[lang]) return

    const textNode = select('text', codeElement)
    if (!isTextNode(textNode)) return
    const raw = textNode.value

    const html = Prism.highlight(raw, Prism.languages[lang], lang)
    const tree = parser.parse(html) as unknown as Element

    appendClassName(preElement, `language-${lang}`)

    codeElement.children = [...tree.children]

    if (options?.plugins) {
      applyPlugin(options.plugins, {
        preElement,
        codeElement,
        raw,
        lang,
      })
    }
  }
}
