export default {
  files: ['tests/**/*.ts'],
  extensions: { ts: 'module' },
  nonSemVerExperiments: {
    configurableModuleFormat: true,
  },
  nodeArguments: [
    '--loader=ts-node/esm',
  ],
}
