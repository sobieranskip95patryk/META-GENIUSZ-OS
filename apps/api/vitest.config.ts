import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@meta-geniusz/utils':     path.resolve(__dirname, '../../packages/utils/src/index.ts'),
      '@meta-geniusz/types':     path.resolve(__dirname, '../../packages/types/src/index.ts'),
      '@meta-geniusz/config':    path.resolve(__dirname, '../../packages/config/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.ts',
        '**/*.d.ts',
      ],
    },
    setupFiles: [],
    testTimeout: 10_000,
  },
});
