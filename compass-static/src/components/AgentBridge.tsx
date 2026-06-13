import { Copy, Terminal } from 'lucide-react'
import { useState } from 'react'

interface Props {
  programCode: string
  programName: string
}

export default function AgentBridge({ programCode, programName }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  const queries = [
    `Use dfva MCP: get_assessment with programCode="${programCode}"`,
    `Use dfva MCP: query_assessments with riskCategory="MODERATE RISK"`,
    `Use dfva MCP: cross_program_analysis`,
  ]

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="mt-6 rounded-xl border border-dashed border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/10">
      <div className="flex items-center gap-2 mb-3">
        <Terminal className="w-4 h-4 text-blue-500" />
        <p className="text-xs font-medium text-blue-700 dark:text-blue-400">
          Agent-first — copy to coding agent
        </p>
      </div>
      <div className="space-y-2">
        {queries.map((q, i) => (
          <pre
            key={i}
            className="text-xs bg-white dark:bg-background p-2 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-blue-100 dark:border-blue-900 font-mono text-muted-foreground"
            onClick={() => copy(q, `query-${i}`)}
          >
            {q}
          </pre>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {copied ? `✓ Copied: ${copied}` : 'Click any query to copy'}
      </p>
    </div>
  )
}
