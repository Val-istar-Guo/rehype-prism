import { Test } from 'unist-util-is'
import { Checker } from './checker'


export function preElementSelector(): Test {
  return node => Checker.isElement(node) && node.tagName === 'pre'
}
