import { h } from 'hastscript'
import { Plugin } from '~/interface/plugin.js'
import { appendClassName } from '~/utils/append-class-name.js'
import { selectCodeElement } from '~/utils/select-code-element.js'


function getLineNumber(str: string): number {
  const match = str.match(/\n(?!$)/g)
  return match ? match.length + 1 : 1
}

export function createLineNumberPlugin(): Plugin {
  return (options) => {
    const { preElement, raw } = options

    const codeElement = selectCodeElement(preElement)
    if (!codeElement) return

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
}
