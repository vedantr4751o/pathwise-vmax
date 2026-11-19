import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/ui*.test.jsx'],
    setupFiles: ['tests/ui.setup.js'],
    restoreMocks: true,
    testTimeout: 30000,
  },
});
