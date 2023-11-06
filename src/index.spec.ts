import { expect, test } from '@jest/globals'
import html from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { unified } from 'unified'
import rehypePrism from './index'


test('rehype prism with language', () => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html)

  const value = processor.processSync('```javascript\nconst a = 1\n```\n').value
  expect(value).toMatchSnapshot()
})

test('rehype prism without language', () => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html)

  const value = processor.processSync('```\nconst a = 1\n```\n').value
  expect(value).toMatchSnapshot()
})

test('rehype prism with line-numbers plugin', () => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism, { plugins: ['line-numbers'] })
    .use(html)

  const value = processor.processSync('```javascript\nconst a = 1\n```\n').value
  expect(value).toMatchSnapshot()
})

test('rehype prism with toolbar plugin', () => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism, { plugins: ['toolbar', 'copy-to-clipboard'] })
    .use(html)

  const value = processor.processSync('```javascript\nconst a = 1\n```\n').value
  expect(value).toMatchSnapshot()
})
