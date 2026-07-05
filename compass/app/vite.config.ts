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
  test: {
    server: {
      deps: {
        // On Linux, vitest externalizes the wasp SDK (node then fails on its
        // extensionless internal imports); macOS inlines it because the
        // node_modules/wasp symlink realpath escapes node_modules. Force
        // inlining so Vite processes it identically on both.
        inline: [/^wasp\//, /\/\.wasp\//],
      },
    },
  },
  server: {
    open: true,
  },
});
