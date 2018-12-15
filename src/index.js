// write your code here
import visit from 'unist-util-visit'
import Prism from 'prismjs'
import parse from 'rehype-parse'
import unified from 'unified'
import modifyChildren from 'unist-util-modify-children'


const codeSelector = node => node.tagName === 'code'
const preSelector = node => node.tagName === 'pre'

const parseCode = lang => (node, index, parent) => {
  if (node.type === 'text' && Prism.languages[lang]) {
    const html = Prism.highlight(node.value, Prism.languages[lang], lang);
    const tree = unified()
      .use(parse, { fragment: true })
      .parse(html)

    parent.children.splice(index, 1, ...tree.children)
    return index + tree.children.length;
  }
}

const getLang = node => {
  const lang = node.properties.className && node.properties.className[0] || ''
  return lang.replace(/^language-/, '')
}

const codeVisitor = cb => node => {
  const lang = getLang(node)
  cb(lang)
  modifyChildren(parseCode(lang))(node)
}

const preVisitor = node => {
  const langs = []

  visit(node, codeSelector, codeVisitor(lang => langs.push(`language-${lang}`)))

  node.properties.className = node.properties.className || []
  node.properties.className.push(...langs)
}

export default (option = {}) => (tree, file) => {
  const { preLangClass = false } = option
  visit(tree, preSelector, preVisitor)
}
