<!-- title -->
<p align="center" style="padding-top: 40px">
  <img src="./images/logo.svg?sanitize=true" alt="logo" />
</p>

<!-- <h1 align="center" style="text-align: center">REHYPE-PRISM</h1> -->
<!-- title -->


[![version](https://img.shields.io/npm/v/rehype-prism.svg?style=for-the-badge)](https://www.npmjs.com/package/rehype-prism)
[![downloads](https://img.shields.io/npm/dm/rehype-prism.svg?style=for-the-badge)](https://www.npmjs.com/package/rehype-prism)
[![license](https://img.shields.io/npm/l/rehype-prism.svg?style=for-the-badge)](https://www.npmjs.com/package/rehype-prism)
[![dependencies](https://img.shields.io/librariesio/release/npm/rehype-prism?style=for-the-badge)](https://www.npmjs.com/package/rehype-prism)
[![coveralls](https://img.shields.io/coveralls/github/Val-istar-Guo/rehype-prism.svg?style=for-the-badge)](https://coveralls.io/github/Val-istar-Guo/rehype-prism)


<!-- description -->

The unified plugin used to highlight code block in html with Prism.

<!-- description -->

## Usage

<!-- usage -->

This package is ESM only: Node 12+ and [unified 10](https://www.npmjs.com/package/unified) is needed to use it and it must be imported instead of required.

```typescript
import { unified } from 'unified'
import rehype from 'rehype'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism'
import rehypeStringify from 'rehype-stringify'

// you have to load css manual
import 'prismjs/themes/prism-coy.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// load languages manual
// import 'prismjs/components/prism-{language}'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-python'

// parse markdown to html
unified()
  .use(remarkParse)
  .use(remarkRehype)
  // it should be after rehype
  .use(rehypePrism, { plugins: ['line-numbers'] })
  .use(rehypeStringify)
  .parse(/* markdown string */)
// .processSync(/* markdown string */)

// parse code block in html string
rehype()
  .use(rehypePrism)
  .use(rehypeStringify)
  .parse(/* html string */)
// .processSync(/* html string */)
```

## Server Side Render

`PrismJS` will auto highlight all code at `pre code` after browser `document` loaded.

**Disabled prism autoHighlight** before `import 'rehype-prism'`. there are two way to do this:

- set the `window.Prism = { manual: true }`
- use the attribute `data-manual` on the `<script>` element you used for prism.

  `<script src="prism.js" data-manual></script>`

> Some plugins will not work. Because it's only work in browser.

## Load Plugins

The names to use can be found [here](https://github.com/PrismJS/prism/tree/master/plugins).

### Plugins Reimplemented By rehype-prism

The table list plugins that cannot running on the server side.
Therefor it has been re-implemented by rehype-prism.

| Plugin Name       |
|:------------------|
| line-numbers      |
| toolbar           |
| copy-to-clipboard |

> I haven't tested all prism plugins.
> If there are another plugins not work,
> submit issue on github.

## Load More Languages

- Use [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs).(Recommend)
- Use `loadLanguages()` provided by `prismjs`.(don't use `loadLanguages()` with Webpack or another bundler)

## Load Themes

- If you use [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs).
  `import 'prismjs'` will auto load the theme setted in babel-plugin-prismjs config.
- Import theme css manual. e.g. `import 'prismjs/themes/prism-coy.css'`

<!-- usage -->

<!-- addition -->

If in doubt, please submit an issue.

<!-- addition -->

## Contributing & Development

If there is any doubt, it is very welcome to discuss the issue together.
Please read [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md) and [CONTRIBUTING](.github/CONTRIBUTING.md).
