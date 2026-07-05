import { fileURLToPath } from "node:url";
import { wasp } from "wasp/client/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [wasp(), tailwindcss()],
  resolve: {
    alias: {
      // Client code never imports wasp/server, so this only affects the
      // vitest graph: tests import operations.ts, whose 'wasp/server' subpath
      // is unresolvable in the client-test SDK on a fresh (CI) checkout.
      "wasp/server": fileURLToPath(
        new URL("./src/test/waspServerShim.ts", import.meta.url),
      ),
    },
  },
  server: {
    open: true,
  },
});
