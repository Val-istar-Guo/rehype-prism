import { h } from 'hastscript'
import { Plugin } from '@/interface/plugin.js'
import { PluginContext } from '@/interface/plugin-context.js'


export function createToolbarPlugin(context: PluginContext): Plugin {
  return options => {
    const { parentNode, index, preElement } = options

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
