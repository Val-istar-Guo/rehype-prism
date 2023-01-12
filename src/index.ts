import 'prismjs'
import unifiedTypes from 'unified'
import { Element } from 'hast'
import { visit } from 'unist-util-visit'
import { preElementSelector } from './pre-element-selector'
import { RehypePrismOptions } from './rehype-prism-options'
import { parseCodeVisitor } from './parse-code-vistor'
import { Test } from 'unist-util-is'


const rehypePrism: unifiedTypes.Plugin<[RehypePrismOptions?], Element> = (options?: RehypePrismOptions) => {
  if (options && options.plugins) {
    const plugins = options.plugins.filter(plugin => plugin !== 'line-numbers')

    for (const plugin of plugins) {
      import(`prismjs/plugins/${plugin}/prism-${plugin}.js`)
    }
  }

  return tree => visit<Element, Test>(
    tree,
    preElementSelector(),
    parseCodeVisitor(options),
  )
}

export default rehypePrism
