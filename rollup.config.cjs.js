import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  // Main bundle
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs',
      exports: 'named',
      inlineDynamicImports: true
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true
      }),
      commonjs(),
      json()
    ],
    external: [
      'commander',
      'fs',
      'path',
      'url'
    ]
  },
  // CLI bundle
  {
    input: 'src/cli/index.js',
    output: {
      file: 'lib/cli.cjs',
      format: 'cjs',
      exports: 'named',
      inlineDynamicImports: true
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true
      }),
      commonjs(),
      json()
    ],
    external: [
      'commander',
      'fs',
      'path',
      'url'
    ]
  },
  // Core bundle
  {
    input: 'src/core/builders/promptGenerator.js',
    output: {
      file: 'lib/core.cjs',
      format: 'cjs',
      exports: 'named',
      inlineDynamicImports: true
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true
      }),
      commonjs(),
      json()
    ],
    external: [
      'fs',
      'path',
      'url'
    ]
  }
];
