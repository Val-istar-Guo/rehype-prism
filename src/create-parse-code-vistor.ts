import { Element, ElementContent, Parent } from 'hast'
import Prism from 'prismjs'
import rehypeParse from 'rehype-parse'
import { unified } from 'unified'
import { select } from 'unist-util-select'
import { Visitor } from 'unist-util-visit'
import { RehypePrismOptions } from './interface/rehype-prism-options.js'
import { appendClassName } from './utils/append-class-name.js'
import { getLang } from './utils/get-lang.js'

import { createPluginApplier } from './create-plugin-applier.js'
import { isElementNode } from './utils/is-element-node.js'
import { isTextNode } from './utils/is-text-node.js'
import { selectCodeElement } from './utils/select-code-element.js'


const parser = unified()
  .use(rehypeParse, { fragment: true })

export function createParseCodeVisitor(options?: RehypePrismOptions): Visitor<ElementContent, Parent> {
  const applyPlugin = createPluginApplier(options?.plugins || [])

  return (node, index, parentNode) => {
    if (!isElementNode(node) || node.tagName !== 'pre' || index === null || parentNode === null) return
    const preElement = node

    const codeElement = selectCodeElement(preElement)
    if (!codeElement) return

    const lang = getLang(codeElement)
    if (!lang || !Prism.languages[lang]) return

    const textNode = select('text', codeElement)
    if (!isTextNode(textNode)) return
    const raw = textNode.value

    const html = Prism.highlight(raw, Prism.languages[lang], lang)
    const tree = parser.parse(html) as unknown as Element

    appendClassName(preElement, `language-${lang}`)

    codeElement.children = [...tree.children]

    applyPlugin({
      parentNode,
      index,
      preElement,
      raw,
      lang,
    })
  }
}
