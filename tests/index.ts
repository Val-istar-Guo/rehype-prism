import test from 'ava'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import rehypePrism from '../src/index.js'


test('rehype prism with language', t => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html)

  t.snapshot(processor.processSync('```javascript\nconst a = 1\n```\n').value)
})

test('rehype prism without language', t => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html)

  t.snapshot(processor.processSync('```\nconst a = 1\n```\n').value)
})


test('rehype prism with line-numbers plugin', t => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism, { plugins: ['line-numbers'] })
    .use(html)

  t.snapshot(processor.processSync('```javascript\nconst a = 1\n```\n').value)
})


test('rehype prism with toolbar plugin', t => {
  const processor = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism, { plugins: ['toolbar', 'copy-to-clipboard'] })
    .use(html)

  t.snapshot(processor.processSync('```javascript\nconst a = 1\n```\n').value)
})
