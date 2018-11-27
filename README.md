# rehype-prism

[![version](https://img.shields.io/npm/v/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)
[![downloads](https://img.shields.io/npm/dm/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)
[![license](https://img.shields.io/npm/l/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)
[![dependencies](https://img.shields.io/david/Val-istar-Guo/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)

<!-- custom -->
## Install

```bash
npm i rehype-prism
```

## Usage

```javascript
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import highlightCode from 'rehype-prism'
import html from 'rehype-stringify'

unified()
  .use(markdown)
  .use(remark2rehype)
  // it should be after rehype
  .use(highlightCode)
  .use(html)
```

Must **disabled prism autoHighlight** before `import 'rehype-prism'`, if you use the plugin in browser. there are two way to do this:

* set the `window.Prism = { manual: true }`
* use the attribute `data-manual` on the `<script>` element you used for prism.

  `<script src="prism.js" data-manual></script>`

## Load More Languages

* Use [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs).(Recommend)
* Use `loadLanguages()` provided by `prismjs`.(don't use `loadLanguages()` with Webpack or another bundler)

## Load Themes

* If you use [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs).
  `import 'prismjs'` will auto load the theme setted in babel-plugin-prismjs config.
* Import theme css manual. e.g. `import 'prismjs/themes/prism-coy.css'`

<!-- custom -->
