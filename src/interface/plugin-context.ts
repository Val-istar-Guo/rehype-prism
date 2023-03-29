import { Element } from 'hast'
import { PluginOptions } from './plugin-options.js'


export interface PluginContext {
  toolbar: {
    buttons: ((options: PluginOptions) => Element)[]
  }
}
