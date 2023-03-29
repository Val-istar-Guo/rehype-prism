import { PluginOptions } from './interface/plugin-options.js'
import { RehypePrismPlugin } from './interface/rehype-prism-plugin.js'
import { PluginContext } from './interface/plugin-context.js'
import { createCopyToClipboardPlugin } from './plugins/copy-to-clipboard.js'
import { createLineNumberPlugin } from './plugins/line-numbers.js'
import { createToolbarPlugin } from './plugins/toolbar.js'

type Applier = (options: PluginOptions) => void

export function createPluginApplier(plugins: RehypePrismPlugin[]): Applier {
  const context: PluginContext = {
    toolbar: {
      buttons: [],
    },
  }

  const appliers = plugins
    // uniq
    .filter((item, index, arr) => arr.indexOf(item, 0) === index)
    .map(plugin => {
      if (plugin === 'line-numbers') return createLineNumberPlugin()
      if (plugin === 'toolbar') return createToolbarPlugin(context)
      if (plugin === 'copy-to-clipboard') return createCopyToClipboardPlugin(context)
    })

  return options => {
    for (const applier of appliers) {
      applier && applier(options)
    }
  }
}
