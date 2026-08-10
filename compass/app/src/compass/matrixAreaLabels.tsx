import { QUADRANTS } from "./v2/quadrants";

/**
 * Per-quadrant explanatory captions for matrix SVGs: what landing in each
 * area means for the course. Render BEFORE the data dots so points stay
 * legible on top. Coordinates are the plot area's pixel bounds and the two
 * median lines.
 */
export function MatrixAreaLabels({
  left,
  right,
  top,
  bottom,
  fontSize = 8.5,
}: {
  left: number;
  right: number;
  top: number;
  bottom: number;
  fontSize?: number;
}) {
  const labels = [
    {
      key: "comfortable",
      x: left + 6,
      y: top + fontSize + 3,
      anchor: "start" as const,
      hex: QUADRANTS.comfortable.hex,
      l1: "Less-exposed destinations,",
      l2: "strong curriculum defences",
    },
    {
      key: "well-positioned",
      x: right - 6,
      y: top + fontSize + 3,
      anchor: "end" as const,
      hex: QUADRANTS["well-positioned"].hex,
      l1: "Highly exposed destinations,",
      l2: "strong curriculum defences",
    },
    {
      key: "sheltered",
      x: left + 6,
      y: bottom - fontSize - 6,
      anchor: "start" as const,
      hex: QUADRANTS.sheltered.hex,
      l1: "Less-exposed destinations,",
      l2: "few defences built yet",
    },
    {
      key: "attention",
      x: right - 6,
      y: bottom - fontSize - 6,
      anchor: "end" as const,
      hex: QUADRANTS.attention.hex,
      l1: "Highly exposed destinations,",
      l2: "few defences built yet",
    },
  ];
  return (
    <>
      {labels.map((l) => (
        <text
          key={l.key}
          x={l.x}
          y={l.y}
          fontSize={fontSize}
          textAnchor={l.anchor}
          fill={l.hex}
          opacity={0.85}
        >
          <tspan x={l.x}>{l.l1}</tspan>
          <tspan x={l.x} dy={fontSize + 2}>
            {l.l2}
          </tspan>
        </text>
      ))}
    </>
  );
}
