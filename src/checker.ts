import { Node } from 'unist'
import { Element } from 'hast'
import { Text } from 'mdast'


export class Checker {
  public static isElement(node?: Node | null): node is Element {
    return !!node && node.type === 'element' && 'tagName' in node
  }

  public static isText(node: Node | null): node is Text {
    return !!node && node.type === 'text'
  }
}
