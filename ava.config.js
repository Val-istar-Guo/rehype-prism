export default {
  files: ['tests/**/*.ts', '!tests/**/*.before-each.ts'],
  // extensions: { ts: 'module' },
  typescript: {
    rewritePaths: {
      'tests/': 'lib/tests/',
    },
    compile: false,
  },
  nodeArguments: [
    '--loader=ts-node/esm',
  ],
}
