import { Element } from 'hast'


export function getLang(node: Element): string {
  const lang: string = node.properties?.className?.[0] || ''
  return lang.replace(/^language-/, '')
}
