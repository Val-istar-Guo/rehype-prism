export type RehypePrismPlugin = (
  'autolinker'| 'autoloader' | 'command-line' | 'copy-to-clipboard' |
  'custom-class' | 'data-uri-highlight' | 'diff-highlight' |
  'download-button' | 'file-highlight' | 'filter-highlight-all' |
  'highlight-keywords' | 'inline-color' | 'jsonp-highlight' |
  'keep-markup' | 'line-highlight' | 'line-numbers' | 'match-braces' |
  'normalize-whitespace' | 'previewers' | 'remove-initial-line-feed' |
  'show-invisibles' | 'show-language' | 'toolbar' | 'treeview' |
  'unescaped-markup' | 'wpd'
)

export interface RehypePrismOptions {
  plugins?: RehypePrismPlugin[]
}
