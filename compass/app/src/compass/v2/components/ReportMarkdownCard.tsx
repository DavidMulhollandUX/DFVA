import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardTitle } from "../../../client/components/ui/card";
import {
  loadReportContent,
  type ReportContent,
} from "../../reportContent/index";

interface MarkdownSection {
  title: string;
  body: string;
}

// Split a DFVA report body into ## sections. The H1 title and the
// **Key:** metadata lines duplicate the page hero, so they are dropped —
// both in the preamble and at the head of the FIRST titled section
// (recommend files open with "## IMPROVEMENT PLAN:", so their **Current:**
// v1-composite line and sibling metadata live inside a section, not the
// preamble; rendering that superseded composite is UX defect U1). Any
// remaining preamble (e.g. evidence-confidence notes) becomes an untitled
// intro section.
// A run of consecutive **Label:** lines (job-family cards, signal blocks) is a
// labelled list, not a paragraph — markdown would fold the whole run onto one
// line. Mark each as a hard break so every label starts its own line. A break
// at the end of a block (before a heading, table or list) is inert.
export function preserveLabelLineBreaks(markdown: string): string {
  const lines = markdown.split("\n");
  return lines
    .map((line, i) =>
      /^\*\*[^*]+:\*\*/.test(line.trim()) && (lines[i + 1] ?? "").trim() !== ""
        ? line.replace(/\s*$/, "  ")
        : line,
    )
    .join("\n");
}

function splitSections(markdown: string): MarkdownSection[] {
  const lines = markdown.split("\n");
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection = { title: "", body: "" };
  let sectionCount = 0;
  let atLeadingRun = true; // inside the metadata run at the top of the doc / first section
  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current.body.trim()) sections.push(current);
      sectionCount++;
      current = {
        title: line.replace(/^##\s+\d*\.?\s*/, "").trim(),
        body: "",
      };
      continue;
    }
    if (line.startsWith("# ")) continue;
    // Tooling metadata is never rendered, wherever it appears in the body.
    if (/^\*\*(Prompt Version|Prompt version|Source Report)\b/.test(line.trim())) continue;
    const inMetadataZone = !current.title || (sectionCount === 1 && atLeadingRun);
    if (inMetadataZone) {
      const trimmed = line.trim();
      if (/^\*\*[^*]+:\*\*/.test(trimmed) || trimmed === "---" || trimmed === "") {
        continue;
      }
      if (current.title) atLeadingRun = false;
    }
    current.body += line + "\n";
  }
  if (current.body.trim()) sections.push(current);
  return sections;
}

const PROSE =
  "prose prose-sm max-w-none " +
  "prose-table:text-xs prose-table:border prose-table:border-border " +
  "prose-th:bg-card-accent prose-th:px-3 prose-th:py-2 prose-th:font-semibold prose-th:text-left " +
  "prose-td:px-3 prose-td:py-2 prose-td:align-top prose-td:border-t prose-td:border-border " +
  "prose-headings:font-semibold prose-headings:text-sm " +
  "prose-blockquote:border-l-secondary prose-blockquote:not-italic prose-blockquote:text-muted-foreground";

interface ReportMarkdownCardProps {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
}

/** Lazily loads a generated report body and renders it as a v2 card.
 *  Renders nothing when no report exists for the slug. */
export function ReportMarkdownCard({
  slug,
  label,
  title,
  subtitle,
}: ReportMarkdownCardProps) {
  const [content, setContent] = useState<ReportContent | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let live = true;
    loadReportContent(slug).then((c) => {
      if (!live) return;
      if (c) setContent(c);
      else setMissing(true);
    });
    return () => {
      live = false;
    };
  }, [slug]);

  if (missing) return null;
  if (!content) {
    return (
      <Card className="mt-6">
        <CardContent className="text-muted-foreground pt-6 text-sm">
          Loading {title.toLowerCase()}…
        </CardContent>
      </Card>
    );
  }

  const sections = splitSections(preserveLabelLineBreaks(content.markdown));

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
          <span className="bg-secondary block h-3.5 w-0.5 rounded-full" />
          {label}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-muted-foreground mt-1 mb-6 text-sm">{subtitle}</p>
        <div className="flex flex-col gap-8">
          {sections.map((s, i) => (
            <section key={i}>
              {s.title && (
                <h3 className="text-foreground border-border mb-3 border-b pb-2 text-base font-semibold">
                  {s.title}
                </h3>
              )}
              <div className={`overflow-x-auto ${PROSE}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {s.body}
                </ReactMarkdown>
              </div>
            </section>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
