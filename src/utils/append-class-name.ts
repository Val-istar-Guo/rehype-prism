import { Element } from 'hast'


export function appendClassName(node: Element, className: string): void {
  if (!node.properties) node.properties = {}
  if (!node.properties.className) node.properties.className = []

  if (typeof node.properties.className === 'string') node.properties.className = [node.properties.className]
  if (typeof node.properties.className === 'number') node.properties.className = [node.properties.className]
  if (typeof node.properties.className === 'boolean') node.properties.className = []

  node.properties.className.push(className)
}
