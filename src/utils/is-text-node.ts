import { Node } from 'unist'
import { Text } from 'mdast'


export function isTextNode(node: Node | null): node is Text {
  return !!node && node.type === 'text'
}
