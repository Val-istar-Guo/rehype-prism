import { PluginOptions } from '@/interface/plugin-options'
import { RehypePrismPlugin } from '@/interface/rehype-prism-plugin'
import { applyLineNumberPlugin } from './line-numbers.js'


export function applyPlugin(plugins: RehypePrismPlugin[], options: PluginOptions): void {
  for (const plugin of plugins) {
    if (plugin === 'line-numbers') applyLineNumberPlugin(options)
  }
}
