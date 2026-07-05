import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * CI-only vitest config: runs the unit suite WITHOUT the Wasp toolchain.
 *
 * `wasp test client run` needs a generated SDK whose module resolution is
 * platform-dependent (works on macOS, externalizes-and-breaks on Linux
 * runners). The tests themselves are pure logic with mocked contexts; the
 * only real wasp import in their graph is HttpError from 'wasp/server',
 * aliased here to a shim. Locally, keep using `wasp test client run`.
 */
export default defineConfig({
  resolve: {
    alias: {
      "wasp/server": fileURLToPath(
        new URL("./src/test/waspServerShim.ts", import.meta.url),
      ),
    },
  },
  test: {
    include: ["src/**/__tests__/**/*.test.ts"],
    environment: "node",
  },
});
