import { Element } from 'hast'


export interface PluginOptions {
  preElement: Element
  codeElement: Element

  raw: string
  lang: string
}
