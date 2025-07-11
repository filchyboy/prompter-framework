import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      exclude: [
        'node_modules/',
        'lib/',
        'test/',
        'examples/',
        'docs/',
        '*.config.js',
        '*.config.ts'
      ]
    }
  }
});
