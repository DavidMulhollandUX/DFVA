/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

// Server-side vitest config — skips the wasp() client plugin
// because it blocks imports from 'wasp/server' in test mode.
// We mock wasp/server via resolve.alias instead.
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      'wasp/server': '/Users/djmulholland/Documents/SXD-Github/DFVA/compass/app/src/compass/__tests__/__mocks__/wasp-server.ts',
      'wasp/server/operations': '/Users/djmulholland/Documents/SXD-Github/DFVA/compass/app/src/compass/__tests__/__mocks__/wasp-server-operations.ts',
    },
  },
  test: {
    environment: 'node',
    include: ['src/compass/__tests__/**/*.test.ts'],
  },
});
