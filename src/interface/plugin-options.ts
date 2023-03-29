import { Element, Parent } from 'hast'


export interface PluginOptions {
  preElement: Element
  index: number
  parentNode: Parent

  raw: string
  lang: string
}
