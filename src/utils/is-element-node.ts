import { Node } from 'unist'
import { Element } from 'hast'


export function isElementNode(node?: Node | null): node is Element {
  return !!node && node.type === 'element' && 'tagName' in node
}
