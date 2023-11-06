import { Element } from 'hast'
import 'prismjs'
import unifiedTypes from 'unified'
import { Test } from 'unist-util-is'
import { visit } from 'unist-util-visit'
import { internalPlugins } from './constant.js'
import { createParseCodeVisitor } from './create-parse-code-vistor.js'
import { createPreElementSelector } from './create-pre-element-selector.js'
import { RehypePrismOptions } from './interface/rehype-prism-options.js'


const rehypePrism: unifiedTypes.Plugin<[RehypePrismOptions?], Element> = (options?: RehypePrismOptions) => {
  if (options && options.plugins) {
    const plugins = options.plugins
      .filter((plugin) => !internalPlugins.includes(plugin))

    for (const plugin of plugins) {
      import(`prismjs/plugins/${plugin}/prism-${plugin}.js`)
    }
  }

  return (tree) => visit<Element, Test>(
    tree,
    createPreElementSelector(),
    createParseCodeVisitor(options),
  )
}

export default rehypePrism
