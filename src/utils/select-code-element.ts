import { Element } from 'hast'
import { select } from 'unist-util-select'
import { isElementNode } from './is-element-node.js'


export function selectCodeElement(parent: Element): Element | null {
  const codeElement = select('[tagName=code]', parent)
  return isElementNode(codeElement) ? codeElement : null
}
