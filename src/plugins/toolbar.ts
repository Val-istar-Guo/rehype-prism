import { h } from 'hastscript'
import { PluginContext } from '~/interface/plugin-context.js'
import { Plugin } from '~/interface/plugin.js'


export function createToolbarPlugin(context: PluginContext): Plugin {
  return (options) => {
    const { parentNode, index, preElement } = options

    if (parentNode === undefined || index === undefined) {
      console.warn([
        'rehype-prism toolbar plugin: parentNode/index is undefined',
        'Please submit an issue to https://github.com/Val-istar-Guo/rehype-prism/issues',
      ].join('\n'))
      return
    }

    const toolbar = h(
      'div',
      {
        className: ['toolbar'],
      },
    )

    const container = h(
      'div',
      {
        className: ['code-toolbar'],
      },
      [preElement, toolbar],
    )

    parentNode.children.splice(index, 1, container)

    for (const button of context.toolbar.buttons) {
      toolbar.children.push(h(
        'div',
        {
          className: ['toolbar-item'],
        },
        [button(options)],
      ))
    }
  }
}
