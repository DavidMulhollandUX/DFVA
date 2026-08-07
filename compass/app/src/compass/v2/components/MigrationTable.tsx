import { Link } from "react-router";
import type { V2Program } from "../data/v2Programs";
import { QUADRANTS } from "../quadrants";

export function MigrationTable({ programs }: { programs: V2Program[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {[
              "Code",
              "Program",
              "Faculty",
              "v1 Band",
              "v2 Quadrant",
              "Exposure",
              "Adapt.",
              "D2",
              "D3",
              "D7",
              "B",
              "D5",
              "D4 gate",
              "D6 gate",
              "JIR",
            ].map((h) => (
              <th
                key={h}
                className="text-muted-foreground border-border border-b px-3 py-2 text-left text-xs font-medium whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {programs.map((p) => {
            const q = QUADRANTS[p.quadrant];
            return (
              <tr key={p.code} className="hover:bg-card-accent">
                <td className="border-border/40 border-b px-3 py-1.5 font-mono">
                  <Link
                    to={`/insights/program/${p.code}`}
                    className="text-secondary-muted-foreground hover:underline"
                  >
                    {p.code}
                  </Link>
                </td>
                <td className="border-border/40 border-b px-3 py-1.5">
                  {p.name}
                </td>
                <td className="border-border/40 text-muted-foreground border-b px-3 py-1.5">
                  {p.faculty}
                </td>
                <td className="border-border/40 border-b px-3 py-1.5 whitespace-nowrap">
                  {p.v1_band}
                </td>
                <td className="border-border/40 border-b px-3 py-1.5">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${q.badgeClass}`}
                  >
                    {q.short}
                  </span>
                </td>
                <td className="border-border/40 border-b px-3 py-1.5">
                  {p.has_jir && p.exposure !== null
                    ? p.exposure.toFixed(0)
                    : "—"}
                </td>
                <td className="border-border/40 border-b px-3 py-1.5 whitespace-nowrap">
                  {p.adaptiveness_raw}/15
                </td>
                <td className="border-border/40 border-b px-3 py-1.5">{p.D2}</td>
                <td className="border-border/40 border-b px-3 py-1.5">{p.D3}</td>
                <td className="border-border/40 border-b px-3 py-1.5">{p.D7}</td>
                <td className="border-border/40 border-b px-3 py-1.5">
                  {p.B_irreplaceable}
                </td>
                <td className="border-border/40 border-b px-3 py-1.5">
                  {p.D5_ai_literacy}
                </td>
                <td
                  className={`border-border/40 border-b px-3 py-1.5 ${p.gate_D4 === "PASS" ? "text-band-resilient" : "text-band-critical"}`}
                >
                  {p.gate_D4}
                </td>
                <td
                  className={`border-border/40 border-b px-3 py-1.5 ${p.gate_D6 === "PASS" ? "text-band-resilient" : "text-band-critical"}`}
                >
                  {p.gate_D6}
                </td>
                <td className="border-border/40 border-b px-3 py-1.5">
                  {p.has_jir ? "✓" : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
