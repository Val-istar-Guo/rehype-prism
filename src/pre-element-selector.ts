import { Test } from 'unist-util-is'
import { isElementNode } from './utils/is-element-node.js'


export function preElementSelector(): Test {
  return node => isElementNode(node) && node.tagName === 'pre'
}
