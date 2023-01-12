export function getLineNumber(str: string): number {
  const match = str.match(/\n(?!$)/g)
  return match ? match.length + 1 : 1
}
