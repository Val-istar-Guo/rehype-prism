import { Test } from 'unist-util-is'
import { Checker } from './checker.js'


export function preElementSelector(): Test {
  return node => Checker.isElement(node) && node.tagName === 'pre'
}
