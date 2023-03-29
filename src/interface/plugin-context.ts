import { Element } from 'hast'
import { PluginOptions } from './plugin-options'


export interface PluginContext {
  toolbar: {
    buttons: ((options: PluginOptions) => Element)[]
  }
}
