import { useEffect, useState } from "react";
import type { V4PanelC } from "./data/v4Meta";
import { hasV4PanelC, loadV4PanelC } from "./data/v4PanelC/index";

/** Loads one program's Panel C record from its own chunk. `ready` stays false
 *  while that chunk is in flight, so the page holds its first paint instead of
 *  flashing the pending state; a code with no record is ready at once. */
export function useV4PanelC(code: string | undefined): {
  panelC: V4PanelC | undefined;
  ready: boolean;
} {
  const [loaded, setLoaded] = useState<
    { code: string; panelC: V4PanelC } | undefined
  >();
  const expected = Boolean(code && hasV4PanelC(code));

  useEffect(() => {
    if (!code || !hasV4PanelC(code)) return;
    let alive = true;
    loadV4PanelC(code).then((panelC) => {
      if (alive && panelC) setLoaded({ code, panelC });
    });
    return () => {
      alive = false;
    };
  }, [code]);

  const panelC = loaded && loaded.code === code ? loaded.panelC : undefined;
  return { panelC, ready: !expected || panelC !== undefined };
}
