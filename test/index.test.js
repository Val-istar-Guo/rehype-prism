import test from 'ava'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import highlightCode from '../src'


test('no pre lang class', t => {
  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(highlightCode, { preLangClass: false })
    .use(html)

  t.snapshot(processor.processSync('```javascript\nconst a = 1\n```').contents)
})

test('include pre lang class', t => {
  const processor1 = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(highlightCode)
    .use(html)

  const processor2 = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(highlightCode, {})
    .use(html)

  const processor3 = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(highlightCode, { preLangClass: true })
    .use(html)

  const str = '```javascript\nconst a = 1\n```'

  t.snapshot(processor1.processSync(str).contents)
  t.deepEqual(processor2.processSync(str), processor1.processSync(str))
  t.deepEqual(processor3.processSync(str), processor1.processSync(str))
})
