# rehype-prism

[![version](https://img.shields.io/npm/v/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)
[![downloads](https://img.shields.io/npm/dm/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)
[![license](https://img.shields.io/npm/l/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)
[![dependencies](https://img.shields.io/david/Val-istar-Guo/rehype-prism.svg?style=flat-square)](https://www.npmjs.com/package/rehype-prism)
[![coveralls](https://img.shields.io/coveralls/github/Val-istar-Guo/rehype-prism.svg?style=flat-square)](https://coveralls.io/github/Val-istar-Guo/rehype-prism)



<!-- description -->
The unified plugin used to highlight code block in html with Prism.
And you have the ability to control whether to copy the `language-` class to `<pre>` tag
<!-- description -->

## Usage

This package is ESM only: Node 12+ is needed to use it and it must be imported instead of required.

<!-- usage -->
```javascript
import unified from 'unified'
import rehyper from 'rehyper'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism'
import rehypeStringify from 'rehype-stringify'

// parse markdown to html
unified()
  .use(markdown)
  .use(remark2rehype)
  // it should be after rehype
  .use(rehypePrism)
  .use(html)
  .parse(/* markstring string */)

// parse code block in html string
rehyper()
  .use(rehypePrism)
  .use(html)
  .parse(/* html string */)
```

## Server Side Render
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
<!-- usage -->

<!-- addition --><!-- addition -->


## Contributing & Development

If there is any doubt, it is very welcome to discuss the issue together.
Please read [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md) and [CONTRIBUTING](.github/CONTRIBUTING.md).
