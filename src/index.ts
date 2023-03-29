import 'prismjs'
import unifiedTypes from 'unified'
import { Element } from 'hast'
import { visit } from 'unist-util-visit'
import { Test } from 'unist-util-is'
import { RehypePrismOptions } from './interface/rehype-prism-options.js'
import { createPreElementSelector } from './create-pre-element-selector.js'
import { createParseCodeVisitor } from './create-parse-code-vistor.js'
import { internalPlugins } from './constant.js'


const rehypePrism: unifiedTypes.Plugin<[RehypePrismOptions?], Element> = (options?: RehypePrismOptions) => {
  if (options && options.plugins) {
    const plugins = options.plugins
      .filter(plugin => !internalPlugins.includes(plugin))

    for (const plugin of plugins) {
      import(`prismjs/plugins/${plugin}/prism-${plugin}.js`)
    }
  }

  return tree => visit<Element, Test>(
    tree,
    createPreElementSelector(),
    createParseCodeVisitor(options),
  )
}

export default rehypePrism
