import { h } from 'hastscript'
import { appendClassName } from '@/utils/append-class-name.js'
import { Plugin } from '@/interface/plugin.js'


function getLineNumber(str: string): number {
  const match = str.match(/\n(?!$)/g)
  return match ? match.length + 1 : 1
}

export const applyLineNumberPlugin: Plugin = options => {
  const { preElement, codeElement, raw } = options

  appendClassName(preElement, 'line-numbers')

  const lineNumber = getLineNumber(raw)
  const lineNumberColumn = h(
    'span',
    {
      'aria-hidden': 'true',
      className: ['line-numbers-rows'],
    },
    new Array(lineNumber).fill(h('span')),
  )
  codeElement.children.push(lineNumberColumn)
}
