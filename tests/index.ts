import test from 'ava'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import rehypePrism from '../src/index.js'


test('rehype prism', t => {
  const processor = unified()
    .use(markdown)
    .use(rehypePrism, {plugins: ["toolbar", "copy-to-clipboard"]})
    .use(remark2rehype)
    .use(html)

  t.snapshot(processor.processSync('```javascript\nconst a = 1\n```').value)
})
