/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      lines: 30,
      branches: 30,
      functions: 5,
      statements: 30,
    },
  },
});
