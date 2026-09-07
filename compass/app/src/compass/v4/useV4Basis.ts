import { useEffect, useState } from "react";
import type { V4OnlyProgram, V4PanelABasis } from "./data/v4Meta";
import { hasV4Basis, loadV4Basis } from "./data/v4Basis/index";

/** Loads one program's Panel A basis from its own chunk, mirroring
 *  {@link useV4PanelC}. `ready` stays false while that chunk is in flight, so
 *  the page holds its first paint instead of flashing an exposure-less state;
 *  a code with no record is ready at once. */
export function useV4Basis(code: string | undefined): {
  onlyProgram: V4OnlyProgram | undefined;
  panelABasis: V4PanelABasis | undefined;
  ready: boolean;
} {
  const [loaded, setLoaded] = useState<
    | {
        code: string;
        onlyProgram: V4OnlyProgram | null;
        panelABasis: V4PanelABasis | null;
      }
    | undefined
  >();
  const expected = Boolean(code && hasV4Basis(code));

  useEffect(() => {
    if (!code || !hasV4Basis(code)) return;
    let alive = true;
    loadV4Basis(code).then((record) => {
      if (alive && record) setLoaded({ code, ...record });
    });
    return () => {
      alive = false;
    };
  }, [code]);

  const hit = loaded && loaded.code === code ? loaded : undefined;
  return {
    onlyProgram: hit?.onlyProgram ?? undefined,
    panelABasis: hit?.panelABasis ?? undefined,
    ready: !expected || hit !== undefined,
  };
}
