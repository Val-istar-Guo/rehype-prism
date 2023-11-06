import { Text } from 'mdast'
import { Node } from 'unist'


export function isTextNode(node?: Node | null): node is Text {
  return !!node && node.type === 'text'
}
