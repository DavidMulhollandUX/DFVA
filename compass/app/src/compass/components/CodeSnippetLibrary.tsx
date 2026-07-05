import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../client/components/ui/card";
import { Code, Copy, Check } from "lucide-react";

interface Snippet {
  label: string;
  language: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    label: "List Programs",
    language: "curl",
    code: `curl -H "Authorization: Bearer dfva_YOUR_API_KEY" \\
  https://evidura.ai/api/v1/programs`,
  },
  {
    label: "Get Assessment",
    language: "curl",
    code: `curl -H "Authorization: Bearer dfva_YOUR_API_KEY" \\
  https://evidura.ai/api/v1/programs/mc-cs`,
  },
  {
    label: "Compare Programs",
    language: "curl",
    code: `curl -H "Authorization: Bearer dfva_YOUR_API_KEY" \\
  "https://evidura.ai/api/v1/compare?programs=mc-cs,mc-eng"`,
  },
  {
    label: "List Programs (TypeScript)",
    language: "typescript",
    code: `import { DfvaClient } from '@unimelb/dfva-sdk';

const client = new DfvaClient({ apiKey: 'dfva_YOUR_API_KEY' });
const programs = await client.programs.list();
console.log(programs);`,
  },
  {
    label: "Get Assessment (TypeScript)",
    language: "typescript",
    code: `import { DfvaClient } from '@unimelb/dfva-sdk';

const client = new DfvaClient({ apiKey: 'dfva_YOUR_API_KEY' });
const assessment = await client.programs.get('mc-cs');
console.log(assessment.score, assessment.riskBand);`,
  },
  {
    label: "List Programs (Python)",
    language: "python",
    code: `from dfva_sdk import DfvaClient

client = DfvaClient(api_key="dfva_YOUR_API_KEY")
programs = client.programs.list()
for p in programs:
    print(p.code, p.name)`,
  },
  {
    label: "Get Assessment (Python)",
    language: "python",
    code: `from dfva_sdk import DfvaClient

client = DfvaClient(api_key="dfva_YOUR_API_KEY")
assessment = client.programs.get("mc-cs")
print(f"{assessment.score}/36 — {assessment.risk_band}")`,
  },
];

export default function CodeSnippetLibrary() {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function copySnippet(index: number, code: string) {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Code Snippets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tab bar */}
        <div className="flex flex-wrap gap-1 border-b pb-2">
          {SNIPPETS.map((snippet, i) => (
            <button
              key={i}
              onClick={() => setActiveSnippet(i)}
              className={`rounded-md px-3 py-1 text-xs transition-colors ${
                i === activeSnippet
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {snippet.label}
            </button>
          ))}
        </div>

        {/* Active snippet */}
        <div className="relative">
          <pre className="overflow-x-auto rounded-md bg-zinc-950 p-4 text-sm text-zinc-50">
            <code>{SNIPPETS[activeSnippet].code}</code>
          </pre>
          <button
            onClick={() =>
              copySnippet(activeSnippet, SNIPPETS[activeSnippet].code)
            }
            className="absolute top-2 right-2 rounded-md bg-zinc-800 p-1.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
            title="Copy to clipboard"
          >
            {copiedIndex === activeSnippet ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
