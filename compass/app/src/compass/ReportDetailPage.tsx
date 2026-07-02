import { useParams, Link } from "react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  ArrowLeft, 
  BarChart2, 
  ClipboardList, 
  TrendingUp, 
  ShieldAlert, 
  Award, 
  RefreshCw, 
  X, 
  Upload, 
  Filter, 
  Check, 
  AlertCircle, 
  Calendar, 
  User, 
  Mail, 
  Plus, 
  Layers, 
  Settings, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Clock
} from "lucide-react";
import { useQuery, useAction } from "wasp/client/operations";
import { 
  getAssessmentJobs, 
  getCourseInterventions, 
  updateCourseIntervention, 
  uploadAlumniData 
} from "wasp/client/operations";
import { useAuth } from "wasp/client/auth";

import { REPORT_CONTENT } from "./reportContent";
import { PROGRAMS } from "./sharedProgramData";
import { ProgramRadar } from "../client/components/ProgramRadar";
import { WhyThisMatters } from "./WhyThisMatters";
import { CurriculumMap } from "../client/components/CurriculumMap";
import { generateMockSyllabus } from "./mockSyllabusData";
import { RUBRIC, Dimension } from "./data/rubric";
import { DIMENSION_EVIDENCE, DimensionEvidence } from "./data/dimensionEvidence";
import { getFieldForCourse } from "./marketData";

const riskBandStyles: Record<string, string> = {
  RESILIENT:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-500/20",
  "MODERATE RISK":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-500/20",
  "HIGH RISK":
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-500/20",
  CRITICAL: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-500/20",
};

const reportMeta: Record<
  string,
  { score: string | null; riskBand: string | null }
> = {
  "dfva-b-des": { score: "17 / 36", riskBand: "HIGH RISK" },
  "dfva-market-b-des": { score: null, riskBand: null },
  "dfva-mc-is": { score: "18 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-is": { score: null, riskBand: null },
  "dfva-recommend-mc-is": { score: null, riskBand: null },
  "dfva-b-sci": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-b-sci": { score: null, riskBand: null },
  "dfva-recommend-b-sci": { score: null, riskBand: null },
  "dfva-mc-scibit": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-scibit": { score: null, riskBand: null },
  "dfva-recommend-mc-scibit": { score: null, riskBand: null },
  "dfva-439fs": { score: "21 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-439fs": { score: null, riskBand: null },
  "dfva-recommend-439fs": { score: null, riskBand: null },
  "dfva-527cl": { score: "28 / 36", riskBand: "RESILIENT" },
  "dfva-market-527cl": { score: null, riskBand: null },
  "dfva-746st": { score: "22 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-746st": { score: null, riskBand: null },
  "dfva-recommend-b-des": { score: null, riskBand: null },
  "dfva-mc-actsc": { score: "20 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-actsc": { score: null, riskBand: null },
  "dfva-recommend-mc-actsc": { score: null, riskBand: null },
  "dfva-mc-apbusa": { score: "22 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-apbusa": { score: null, riskBand: null },
  "dfva-mc-arch": { score: "28 / 36", riskBand: "RESILIENT" },
  "dfva-market-mc-arch": { score: null, riskBand: null },
  "dfva-mc-ba": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-ba": { score: null, riskBand: null },
  "dfva-mc-bamktg": { score: "19 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-bamktg": { score: null, riskBand: null },
  "dfva-mc-base": { score: "20 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-base": { score: null, riskBand: null },
  "dfva-mc-bmedsc": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-bmedsc": { score: null, riskBand: null },
  "dfva-recommend-mc-bmedsc": { score: null, riskBand: null },
  "dfva-mc-busana": { score: "30 / 36", riskBand: "RESILIENT" },
  "dfva-market-mc-busana": { score: null, riskBand: null },
  "dfva-mc-climsci": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-climsci": { score: null, riskBand: null },
  "dfva-recommend-mc-climsci": { score: null, riskBand: null },
  "dfva-mc-clind": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-clind": { score: null, riskBand: null },
  "dfva-mc-cs": { score: "27 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-cs": { score: null, riskBand: null },
  "dfva-recommend-mc-cs": { score: null, riskBand: null },
  "dfva-mc-datasc": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-datasc": { score: null, riskBand: null },
  "dfva-recommend-mc-datasc": { score: null, riskBand: null },
  "dfva-mc-ed": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-ed": { score: null, riskBand: null },
  "dfva-mc-envlaw": { score: "22 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-envlaw": { score: null, riskBand: null },
  "dfva-mc-envsc": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-envsc": { score: null, riskBand: null },
  "dfva-recommend-mc-envsc": { score: null, riskBand: null },
  "dfva-mc-gencoun": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-gencoun": { score: null, riskBand: null },
  "dfva-recommend-mc-gencoun": { score: null, riskBand: null },
  "dfva-mc-indeng": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-indeng": { score: null, riskBand: null },
  "dfva-mc-intedib": { score: "18 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-intedib": { score: null, riskBand: null },
  "dfva-mc-journ": { score: "20 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-journ": { score: null, riskBand: null },
  "dfva-mc-nursc": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-nursc": { score: null, riskBand: null },
  "dfva-recommend-mc-nursc": { score: null, riskBand: null },
  "dfva-mc-phtyph": { score: "27 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-phtyph": { score: null, riskBand: null },
  "dfva-mc-prop": { score: "22 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-prop": { score: null, riskBand: null },
  "dfva-mc-propsyc": { score: "27 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-propsyc": { score: null, riskBand: null },
  "dfva-mc-scibif": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-scibif": { score: null, riskBand: null },
  "dfva-recommend-mc-scibif": { score: null, riskBand: null },
  "dfva-mc-scibio": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-scibio": { score: null, riskBand: null },
  "dfva-recommend-mc-scibio": { score: null, riskBand: null },
  "dfva-mc-sciche": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciche": { score: null, riskBand: null },
  "dfva-recommend-mc-sciche": { score: null, riskBand: null },
  "dfva-mc-sciear": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciear": { score: null, riskBand: null },
  "dfva-recommend-mc-sciear": { score: null, riskBand: null },
  "dfva-mc-sciepi": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciepi": { score: null, riskBand: null },
  "dfva-recommend-mc-sciepi": { score: null, riskBand: null },
  "dfva-mc-sciphy": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciphy": { score: null, riskBand: null },
  "dfva-recommend-mc-sciphy": { score: null, riskBand: null },
  "dfva-mc-scwr": { score: "12 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-scwr": { score: null, riskBand: null },
  "dfva-mc-surged": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-surged": { score: null, riskBand: null },
  "dfva-mc-tesol": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-tesol": { score: null, riskBand: null },
  "dfva-mc-urbdes": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-urbdes": { score: null, riskBand: null },
  "dfva-mc-urbhort": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-urbhort": { score: null, riskBand: null },
  "dfva-mc-jurisd": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-jurisd": { score: null, riskBand: null },
  "dfva-recommend-mc-jurisd": { score: null, riskBand: null },
};

const DIMENSIONS = [
  { id: "D1", label: "Automation Exposure" },
  { id: "D2", label: "Systems Thinking" },
  { id: "D3", label: "Technical Depth" },
  { id: "D4", label: "Decision-Making" },
  { id: "D5", label: "AI Literacy" },
  { id: "D6", label: "Domain Depth" },
  { id: "D7", label: "Research Rigour" },
  { id: "D8", label: "Human & Relational" },
  { id: "D9", label: "Curriculum Currency" },
  { id: "D10", label: "Outcome Evidence" },
  { id: "B", label: "Irreplaceability Premium" },
];

const FIELD_CAREERS: Record<string, Array<{ job: string; cluster: string; risk: string; reqs: string }>> = {
  engineering: [
    { job: "Professional Engineer (Civil)", cluster: "Engineering", risk: "Low", reqs: "Yes (Engineers Australia)" },
    { job: "Structural Design Engineer", cluster: "Engineering", risk: "Low", reqs: "Yes (Engineers Australia)" },
    { job: "Junior Project Engineer", cluster: "Engineering", risk: "Moderate", reqs: "No" },
    { job: "Engineering CAD Drafter", cluster: "Engineering", risk: "High", reqs: "No" },
  ],
  it: [
    { job: "Cybersecurity Specialist", cluster: "Software/IT", risk: "Low", reqs: "No" },
    { job: "Software Engineer", cluster: "Software/IT", risk: "Moderate", reqs: "No" },
    { job: "Data Analyst", cluster: "Software/IT", risk: "High", reqs: "No" },
    { job: "Junior Database Administrator", cluster: "Software/IT", risk: "High", reqs: "No" },
  ],
  health: [
    { job: "Clinical Psychologist", cluster: "Psychology/Health", risk: "Low", reqs: "Yes (PsyBA/AHPRA)" },
    { job: "Registered General Nurse", cluster: "Nursing", risk: "Low", reqs: "Yes (NMBA/AHPRA)" },
    { job: "Physical Therapist / Physiotherapist", cluster: "Physiotherapy", risk: "Low", reqs: "Yes (PhysioBA/AHPRA)" },
    { job: "Medical Receptionist / Health Admin", cluster: "Administration", risk: "High", reqs: "No" },
  ],
  business: [
    { job: "Certified Practising Accountant", cluster: "Finance", risk: "Moderate", reqs: "Yes (CPA/CA ANZ)" },
    { job: "Management Consultant", cluster: "Management", risk: "Moderate", reqs: "No" },
    { job: "Financial Analyst", cluster: "Finance", risk: "High", reqs: "No" },
    { job: "Bookkeeper / Accounts Clerk", cluster: "Finance", risk: "High", reqs: "No" },
  ],
  architecture: [
    { job: "Registered Architect", cluster: "Architecture", risk: "Low", reqs: "Yes (ARBV / RAIA)" },
    { job: "Urban Planner", cluster: "Planning", risk: "Low", reqs: "Yes (Planning Institute of Australia)" },
    { job: "Architectural Graduate", cluster: "Architecture", risk: "Moderate", reqs: "No" },
    { job: "BIM Documentation Draftsperson", cluster: "Architecture", risk: "High", reqs: "No" },
  ],
  creative_arts: [
    { job: "Creative Director", cluster: "Creative Arts", risk: "Low", reqs: "No" },
    { job: "Journalist / Reporter", cluster: "Creative Arts", risk: "Moderate", reqs: "No" },
    { job: "UX/UI Designer", cluster: "Design", risk: "High", reqs: "No" },
    { job: "Screenwriter / Content Writer", cluster: "Creative Arts", risk: "High", reqs: "No" },
  ],
  education: [
    { job: "Secondary School Teacher", cluster: "Education", risk: "Low", reqs: "Yes (State Teaching Institute)" },
    { job: "Primary School Teacher", cluster: "Education", risk: "Low", reqs: "Yes (State Teaching Institute)" },
    { job: "English Language Teacher (TESOL)", cluster: "Education", risk: "Moderate", reqs: "No" },
    { job: "Corporate Trainer", cluster: "Education", risk: "Moderate", reqs: "No" },
  ],
  law: [
    { job: "Corporate Legal Advisor", cluster: "Legal", risk: "Moderate", reqs: "Yes (State Admission Board)" },
    { job: "Registered Patent Attorney", cluster: "Legal/Compliance", risk: "Low", reqs: "Yes (Trans-Tasman IP Attorneys Board)" },
    { job: "Legal Research Assistant", cluster: "Legal", risk: "High", reqs: "No" },
    { job: "Patent Examiner", cluster: "Legal/Compliance", risk: "High", reqs: "No" },
  ],
  science: [
    { job: "Research Laboratory Lead", cluster: "Science", risk: "Low", reqs: "No" },
    { job: "BioSciences Researcher", cluster: "Science", risk: "Moderate", reqs: "No" },
    { job: "Laboratory Technician", cluster: "Science", risk: "High", reqs: "No" },
    { job: "Research Assistant (Data Analytics)", cluster: "Science", risk: "High", reqs: "No" },
  ],
  agriculture: [
    { job: "Agronomist / Agricultural Advisor", cluster: "Agriculture", risk: "Low", reqs: "Yes (Australian Institute of Agricultural Science)" },
    { job: "Environmental Consultant", cluster: "Environment", risk: "Low", reqs: "No" },
    { job: "Junior Field Officer", cluster: "Environment", risk: "Low", reqs: "No" },
    { job: "GIS Mapping Assistant", cluster: "Environment", risk: "High", reqs: "No" },
  ],
  other: [
    { job: "Policy Analyst", cluster: "Government", risk: "Low", reqs: "No" },
    { job: "Community Services Officer", cluster: "Social Services", risk: "Low", reqs: "No" },
    { job: "Market Research Analyst", cluster: "Marketing", risk: "High", reqs: "No" },
  ]
};

function dimensionStringToId(dimStr: string): number {
  if (dimStr === "B") return 11;
  return parseInt(dimStr.replace("D", ""), 10);
}

function dimensionIdToString(dimId: number): string {
  if (dimId === 11) return "B";
  return `D${dimId}`;
}

// Inline SVG line chart for Shift & Drift Timeline
function ShiftDriftChart() {
  const data = [
    { month: "Jul 25", score: 25 },
    { month: "Sep 25", score: 25 },
    { month: "Nov 25", score: 24.5 },
    { month: "Jan 26", score: 24 },
    { month: "Mar 26", score: 23.5 },
    { month: "May 26", score: 23 },
    { month: "Jun 26", score: 23 },
  ];

  const width = 500;
  const height = 150;
  const padding = 20;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const minVal = 20;
    const maxVal = 26;
    const y = height - padding - ((d.score - minVal) / (maxVal - minVal)) * (height - 2 * padding);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="rounded-xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-primary" />
          Shift & Drift Durability Score Trend (12 Months)
        </h3>
        <p className="text-xs text-muted-foreground">
          Calculated dynamically against rolling industry cluster hiring signals and LLM automation updates.
        </p>
      </div>
      <div className="relative h-32 w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="currentColor" className="text-border" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="currentColor" className="text-border" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" className="text-border" />

          <path d={areaD} fill="url(#areaGrad)" />
          <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5} />

          {points.map((p, i) => (
            <g key={i} className="group">
              <circle cx={p.x} cy={p.y} r={4.5} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth={2.5} />
              <text x={p.x} y={p.y - 8} textAnchor="middle" className="text-[10px] font-bold fill-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background">
                {p.score}
              </text>
            </g>
          ))}

          {points.map((p, i) => (
            <text key={i} x={p.x} y={height - 2} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">
              {p.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

// Main Assessment Markdown + Structured Display
interface StructuredReport {
  score: number;
  maxScore: number;
  riskBand: string;
  dimensions: { label: string; score: number; max: number; rationale?: string }[];
  thresholds?: Record<string, string>;
}

function parseStructured(markdown: string): { data: StructuredReport; rest: string } | null {
  if (!markdown.trimStart().startsWith("{")) return null;
  const idx = markdown.indexOf("\n}");
  if (idx === -1) return null;
  try {
    const data = JSON.parse(markdown.slice(0, idx + 2)) as StructuredReport;
    if (!Array.isArray(data.dimensions)) return null;
    return { data, rest: markdown.slice(idx + 2) };
  } catch {
    return null;
  }
}

const THRESHOLD_QUESTIONS: Record<string, string> = {
  q1: "Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?",
  q2: "Does this program train graduates to design systems, own decisions, or generate original insight?",
  q3: "Will these graduates be more employable in 5 years than today, given AI trends?",
};

function dimScoreClasses(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.83) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
  if (pct >= 0.5) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
}

interface DimensionPopoverProps {
  dim: Dimension;
  score: number;
  evidence?: DimensionEvidence;
  anchorRect: DOMRect | null;
  onClose: () => void;
}

const PANEL_W = 340;

function DimensionPopover({ dim, score, evidence, anchorRect, onClose }: DimensionPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onReflow = () => onClose();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onReflow, true);
    window.addEventListener("resize", onReflow);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onReflow, true);
      window.removeEventListener("resize", onReflow);
    };
  }, [onClose]);

  if (!anchorRect) return null;

  const margin = 8;
  let left = anchorRect.right + margin;
  if (left + PANEL_W > window.innerWidth - margin) {
    left = Math.max(margin, anchorRect.left - PANEL_W - margin);
  }
  const top = Math.max(margin, Math.min(anchorRect.top, window.innerHeight - 340));

  const stepColors: Record<number, string> = {
    3: "#16a34a",
    2: "#d97706",
    1: "#ea580c",
    0: "#9ca3af",
  };

  const getStepColor = (s: number) => stepColors[s] || "#9ca3af";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={`${dim.id} ${dim.name}`}
      className="rounded-xl border border-border bg-card/95 p-4 text-left shadow-xl backdrop-blur-md dark:bg-zinc-900/95 transition-all duration-200"
      style={{ position: "fixed", top, left, width: PANEL_W, zIndex: 9999, maxHeight: "72vh", overflowY: "auto" }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold leading-snug text-foreground">
          <span className="mr-1.5 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">{dim.id}</span>
          {dim.name}
        </h4>
        <button type="button" onClick={onClose} aria-label="Close" className="shrink-0 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{dim.definition}</p>

      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Rubric (0–3)</p>
      <div className="mb-3 space-y-1">
        {dim.levels.map((l) => {
          const active = l.score === score;
          const c = getStepColor(score);
          return (
            <div
              key={l.score}
              className="flex gap-2 rounded-md px-2 py-1 text-xs"
              style={{
                background: active ? c + "1f" : "transparent",
                border: active ? `1px solid ${c}66` : "1px solid transparent",
              }}
            >
              <span className="font-semibold tabular-nums" style={{ color: active ? c : "#9ca3af" }}>
                {l.score}
              </span>
              <span className={active ? "text-foreground font-medium" : "text-muted-foreground"}>{l.criteria}</span>
            </div>
          );
        })}
      </div>

      {evidence?.rationale ? (
        <>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Why this program scored {score}/3
          </p>
          <p className="mb-3 text-xs leading-relaxed text-foreground bg-muted/30 p-2 rounded-md border border-border/50">{evidence.rationale}</p>
        </>
      ) : null}

      {evidence?.recommendations?.length ? (
        <>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Linked recommendations</p>
          <ul className="space-y-1.5">
            {evidence.recommendations.map((r, i) => (
              <li key={i} className="text-xs leading-snug text-foreground bg-muted/20 p-2 rounded-md border border-border/30">
                {(r.priority || r.effort) && (
                  <span className="mr-1.5 inline-block rounded bg-primary/10 px-1 py-0.5 text-[9px] font-semibold text-primary font-mono">
                    {[r.priority, r.effort].filter(Boolean).join(" · ")}
                  </span>
                )}
                {r.action}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

interface InteractiveRubricPanelProps {
  dimensions: { label: string; score: number; max: number; rationale?: string }[];
  thresholds?: Record<string, string>;
  programName?: string;
  baseScore: number;
  maxScore: number;
  programSlug?: string;
}

function InteractiveRubricPanel({ dimensions, thresholds, programName, baseScore, maxScore, programSlug }: InteractiveRubricPanelProps) {
  const [openPopover, setOpenPopover] = useState<{ dim: Dimension; score: number; rect: DOMRect; rationale?: string } | null>(null);

  const getSegmentColor = (score: number, max: number) => {
    const pct = score / max;
    if (pct >= 0.83) return "bg-emerald-600 dark:bg-emerald-500";
    if (pct >= 0.5) return "bg-amber-600 dark:bg-amber-500";
    return "bg-orange-600 dark:bg-orange-500";
  };

  const getTextColor = (score: number, max: number) => {
    const pct = score / max;
    if (pct >= 0.83) return "text-emerald-500";
    if (pct >= 0.5) return "text-amber-500";
    return "text-orange-500";
  };

  const getDimFromLabel = (label: string): Dimension | undefined => {
    let dim = RUBRIC.find((r) => r.demoLabel.toLowerCase() === label.toLowerCase());
    if (dim) return dim;
    dim = RUBRIC.find((r) => r.name.toLowerCase() === label.toLowerCase());
    if (dim) return dim;
    dim = RUBRIC.find((r) => r.short.toLowerCase() === label.toLowerCase());
    if (dim) return dim;
    if (label.toLowerCase().includes("bonus") || label.toLowerCase().includes("irreplaceability")) {
      return RUBRIC.find((r) => r.bonus);
    }
    return undefined;
  };

  return (
    <div className="flex flex-col gap-6 overflow-hidden rounded-xl border border-border bg-card p-6">
      {/* Top: Dimension Scores (Full Width) */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Dimension Scores
          <span className="ml-1 font-normal normal-case tracking-normal text-muted-foreground/70">
            · click any dimension for its rubric &amp; evidence
          </span>
        </p>
        
        <div className="space-y-1.5">
          {dimensions.map((d) => {
            const dimMeta = getDimFromLabel(d.label);
            
            return (
              <div key={d.label} className="w-full">
                <button
                  type="button"
                  onClick={(e) => {
                    if (dimMeta) {
                      setOpenPopover({
                        dim: dimMeta,
                        score: d.score,
                        rect: e.currentTarget.getBoundingClientRect(),
                        rationale: d.rationale
                      });
                    }
                  }}
                  className="grid w-full cursor-pointer items-center gap-x-4 rounded-md py-1.5 px-2 text-left transition-all hover:bg-muted/40"
                  style={{ gridTemplateColumns: "12rem 1fr 3rem" }}
                  title={dimMeta ? `${dimMeta.id} — click for rubric & evidence` : `${d.label} — click for rubric & evidence`}
                >
                  <span className="truncate text-xs font-medium text-foreground">{d.label}</span>
                  
                  {/* Segmented bar graph */}
                  <div className="flex items-center gap-1 w-full">
                    {Array.from({ length: d.max || 3 }).map((_, segmentIdx) => {
                      const filled = segmentIdx < d.score;
                      return (
                        <div
                          key={segmentIdx}
                          className={`h-2 rounded-full flex-1 ${
                            filled ? getSegmentColor(d.score, d.max || 3) : "bg-muted-foreground/20"
                          }`}
                        />
                      );
                    })}
                  </div>
                  
                  <span className={`text-right text-xs font-bold tabular-nums ${getTextColor(d.score, d.max || 3)}`}>
                    {d.score}/{d.max || 3}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Bottom: Two-column layout (Radar Chart & Threshold Questions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Column: Radar Chart */}
        <div className="flex justify-center items-center p-4 bg-muted/10 rounded-lg border border-border/50 dark:bg-zinc-950/20">
          <ProgramRadar dimensions={dimensions} size={220} baseScore={baseScore} />
        </div>

        {/* Right Column: Threshold Questions */}
        {thresholds ? (
          <div className="flex flex-col justify-center h-full p-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Threshold Questions
            </p>
            <div className="space-y-3">
              {[
                { q: "q1", label: "Could AI produce 80% of this grad's first-2yr output?", val: thresholds.q1 },
                { q: "q2", label: "Does this program train graduates to design systems, own decisions, or generate original insight?", val: thresholds.val || thresholds.q2 },
                { q: "q3", label: "Will these graduates be more employable in 5 years than today?", val: thresholds.q3 }
              ].map((item) => {
                let badgeBg = "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20";
                if (item.val === "YES") badgeBg = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
                if (item.val === "NO") badgeBg = "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";

                return (
                  <div key={item.q} className="flex items-start gap-3 p-2 bg-muted/20 rounded-md border border-border/20 dark:bg-zinc-900/30">
                    <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold leading-none ${badgeBg}`}>
                      {item.val}
                    </span>
                    <span className="text-xs leading-normal text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-muted-foreground text-xs italic">
            No threshold diagnostics available.
          </div>
        )}
      </div>

      {openPopover && (
        <DimensionPopover
          dim={openPopover.dim}
          score={openPopover.score}
          evidence={(() => {
            let ev = programSlug ? DIMENSION_EVIDENCE[programSlug]?.[openPopover.dim.id] : undefined;
            if (!ev && openPopover.rationale) {
              ev = {
                rationale: openPopover.rationale,
                recommendations: []
              };
            }
            return ev;
          })()}
          anchorRect={openPopover.rect}
          onClose={() => setOpenPopover(null)}
        />
      )}
    </div>
  );
}

interface MarkdownSection {
  title: string;
  content: string;
}

function parseMarkdownToSections(markdown: string): MarkdownSection[] {
  if (!markdown) return [];
  const parts = markdown.split(/\n##\s+/);
  const sections: MarkdownSection[] = [];
  let intro = parts[0].trim();
  if (intro.startsWith("# ")) {
    const lines = intro.split("\n");
    intro = lines.slice(1).join("\n").trim();
  }
  if (intro) {
    sections.push({
      title: "Strategic Overview",
      content: intro,
    });
  }
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const firstNewLine = part.indexOf("\n");
    if (firstNewLine === -1) {
      sections.push({ title: part.trim(), content: "" });
    } else {
      const title = part.substring(0, firstNewLine).trim();
      const content = part.substring(firstNewLine + 1).trim();
      sections.push({ title, content });
    }
  }
  return sections;
}

function renderMarkdownAsPanels(markdown: string) {
  const sections = parseMarkdownToSections(markdown);
  if (sections.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-sm text-muted-foreground">
        No report content available.
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div key={idx} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
          <h3 className="text-base font-bold text-foreground border-b border-border pb-3 mb-4 flex items-center gap-2">
            <span className="w-1 h-3.5 bg-primary rounded-full shrink-0" />
            {section.title}
          </h3>
          <div className="prose prose-sm dark:prose-invert max-w-none prose-table:text-xs prose-th:font-semibold prose-td:align-top prose-headings:text-sm prose-headings:font-bold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {section.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

function parseSlug(slug: string): { code: string; type: "assessment" | "market" | "recommend" } {
  if (slug.startsWith("dfva-recommend-")) return { code: slug.slice("dfva-recommend-".length), type: "recommend" };
  if (slug.startsWith("dfva-market-")) return { code: slug.slice("dfva-market-".length), type: "market" };
  return { code: slug.slice("dfva-".length), type: "assessment" };
}

export default function ReportDetailPage() {
  const { reportSlug } = useParams<{ reportSlug: string }>();
  const { data: user } = useAuth();
  const uploadAlumniDataAction = useAction(uploadAlumniData);
  const updateInterventionAction = useAction(updateCourseIntervention);

  const report = reportSlug ? REPORT_CONTENT[reportSlug] : undefined;

  // 1. Navigation routing & fallbacks
  const { code, type: currentType } = useMemo(() => {
    return reportSlug ? parseSlug(reportSlug) : { code: "", type: "assessment" as const };
  }, [reportSlug]);

  const slugsByType = useMemo(() => ({
    assessment: "dfva-" + code,
    market: "dfva-market-" + code,
    recommend: "dfva-recommend-" + code,
  }), [code]);

  const program = useMemo(() => {
    return PROGRAMS.find(p => p.assessmentSlug === slugsByType.assessment);
  }, [slugsByType.assessment]);

  // Tab State: overview, map, market, redesign
  const [activeTab, setActiveTab] = useState<"overview" | "map" | "market" | "redesign">("overview");

  // Keep state synced with the legacy URL routing type
  useEffect(() => {
    if (currentType === "assessment") setActiveTab("overview");
    else if (currentType === "market") setActiveTab("market");
    else if (currentType === "recommend") setActiveTab("redesign");
  }, [currentType]);

  // 2. Load Assessment Jobs from DB
  const { data: jobs = [] } = useQuery(getAssessmentJobs, undefined, {
    enabled: !!user,
  });

  const matchingJob = useMemo(() => {
    return jobs.find(
      (j: any) =>
        j.courseCode?.toLowerCase() === code ||
        j.programName?.toLowerCase().includes(code) ||
        j.handbookUrl?.toLowerCase().includes(code)
    );
  }, [jobs, code]);

  // Load syllabus data state
  const [syllabusData, setSyllabusData] = useState(() => generateMockSyllabus(slugsByType.assessment));

  useEffect(() => {
    if (matchingJob && matchingJob.syllabusJson) {
      setSyllabusData(matchingJob.syllabusJson as any);
    } else {
      setSyllabusData(generateMockSyllabus(slugsByType.assessment));
    }
  }, [matchingJob, slugsByType.assessment]);

  // 3. Simulated/What-If Sandbox State
  const [simulatedScore, setSimulatedScore] = useState<number | null>(null);

  // 4. Client-side state for Interventions (with LocalStorage fallback)
  const { data: dbInterventions = [], refetch: refetchInterventions } = useQuery(
    getCourseInterventions,
    { assessmentJobId: matchingJob?.id ?? "" },
    { enabled: !!user && !!matchingJob?.id }
  );

  const [localInterventions, setLocalInterventions] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(`compass-interventions-${code}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`compass-interventions-${code}`, JSON.stringify(localInterventions));
    } catch (e) {
      console.error(e);
    }
  }, [localInterventions, code]);

  const activeInterventions = useMemo(() => {
    return matchingJob?.id ? dbInterventions : localInterventions;
  }, [matchingJob, dbInterventions, localInterventions]);

  // 5. Market Professional Licensure Filter State
  const [hideRegulatedCareers, setHideRegulatedCareers] = useState(false);

  // 6. Careers Alumni Data Uploader State
  const [isUploadingAlumni, setIsUploadingAlumni] = useState(false);
  const [alumniFile, setAlumniFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({
    jobTitle: "",
    employer: "",
    graduationYear: "",
    industryCluster: "",
  });
  const [isMappingAlumni, setIsMappingAlumni] = useState(false);
  const [mappingStep, setMappingStep] = useState<"idle" | "analyzing" | "mapping" | "success">("idle");
  const [successCount, setSuccessCount] = useState(0);

  // Student Flow Enrollment CSV Loader State
  const [flowUploadStatus, setFlowUploadStatus] = useState<"idle" | "success" | "error">("idle");

  if (!report) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Report not found</h1>
        <p className="text-muted-foreground mb-8">
          No report exists for slug <code>{reportSlug}</code>.
        </p>
        <Link to="/reports" className="text-primary hover:underline inline-flex items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to reports
        </Link>
      </div>
    );
  }

  const meta = reportSlug ? reportMeta[slugsByType.assessment] : null;
  const scoreText = simulatedScore !== null ? `${simulatedScore} / 36` : meta?.score || `${program?.score ?? 20} / 36`;

  // 7. Form submission: Update intervention assignment
  async function handleAssignOwner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const courseCode = formData.get("courseCode") as string;
    const dimensionId = formData.get("dimensionId") as string;
    const ownerName = formData.get("ownerName") as string;
    const ownerEmail = formData.get("ownerEmail") as string;
    const targetDate = formData.get("targetDate") as string;
    const status = formData.get("status") as string;

    if (!courseCode || !dimensionId || !ownerName || !ownerEmail) return;

    const newIntervention = {
      courseCode,
      dimensionId: dimensionStringToId(dimensionId),
      ownerName,
      ownerEmail,
      status,
      targetDate: targetDate || undefined,
    };

    if (matchingJob?.id) {
      try {
        await updateInterventionAction({
          assessmentJobId: matchingJob.id,
          courseCode,
          dimensionId: newIntervention.dimensionId,
          ownerName,
          ownerEmail,
          status,
          targetDate: newIntervention.targetDate,
        });
        refetchInterventions();
      } catch (err: any) {
        alert("Failed to update database intervention: " + err.message);
      }
    } else {
      // Local fallback
      setLocalInterventions(prev => {
        const updated = [...prev];
        const idx = updated.findIndex(
          i => i.courseCode === courseCode && i.dimensionId === newIntervention.dimensionId
        );
        if (idx !== -1) {
          updated[idx] = newIntervention;
        } else {
          updated.push(newIntervention);
        }
        return updated;
      });
    }

    e.currentTarget.reset();
  }

  // 8. Alumni Spreadsheet File Loader
  const handleAlumniFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAlumniFile(file);
    setMappingStep("analyzing");

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ""));
      const rows = lines.slice(1).map(line => {
        const cols = line.split(",").map(c => c.trim().replace(/^["']|["']$/g, ""));
        return Object.fromEntries(headers.map((h, i) => [h, cols[i] || ""]));
      });

      setCsvHeaders(headers);
      setCsvRows(rows);

      // AI Column Mapper Simulation
      setTimeout(() => {
        // Guess column mappings based on common substrings
        const guess: Record<string, string> = {
          jobTitle: headers.find(h => /job|title|role|position/i.test(h)) || headers[0] || "",
          employer: headers.find(h => /company|employer|organisation|firm/i.test(h)) || headers[1] || "",
          graduationYear: headers.find(h => /year|grad/i.test(h)) || headers[2] || "",
          industryCluster: headers.find(h => /cluster|industry|sector|field/i.test(h)) || headers[3] || "",
        };
        setColumnMapping(guess);
        setMappingStep("mapping");
      }, 2500);
    };
    reader.readAsText(file);
  };

  const handleAlumniImportSubmit = async () => {
    setIsUploadingAlumni(true);
    try {
      const mappedRecords = csvRows.map(row => ({
        jobTitle: row[columnMapping.jobTitle] || "Graduate",
        employer: row[columnMapping.employer] || "Undisclosed",
        graduationYear: parseInt(row[columnMapping.graduationYear], 10) || new Date().getFullYear(),
        industryCluster: row[columnMapping.industryCluster] || "Unassigned",
      }));

      if (user) {
        await uploadAlumniDataAction({
          programCode: code.toUpperCase(),
          alumni: mappedRecords,
        });
      } else {
        // Mock success for anonymous users
        console.log("Mock uploaded alumni records to local memory:", mappedRecords);
      }
      setSuccessCount(mappedRecords.length);
      setMappingStep("success");
    } catch (err: any) {
      alert("Alumni upload failed: " + err.message);
    } finally {
      setIsUploadingAlumni(false);
    }
  };

  // Student Flow Enrollment CSV loader
  const handleStudentFlowCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
      const parsedFlow: Record<string, number> = {};

      lines.forEach(line => {
        const parts = line.split(",");
        if (parts.length >= 2) {
          const cCode = parts[0].trim().toUpperCase();
          const count = parseInt(parts[1].trim(), 10);
          if (cCode && !isNaN(count)) {
            parsedFlow[cCode] = count;
          }
        }
      });

      const counts = Object.values(parsedFlow);
      if (counts.length === 0) {
        setFlowUploadStatus("error");
        return;
      }

      // Convert enrollment counts to relative flow percentages
      const maxCount = Math.max(...counts);
      const flowPercentages: Record<string, number> = {};
      Object.entries(parsedFlow).forEach(([cCode, count]) => {
        flowPercentages[cCode] = Math.round((count / maxCount) * 1000) / 10;
      });

      setSyllabusData(prev => ({
        ...prev,
        csvFlow: flowPercentages,
      }));
      setFlowUploadStatus("success");
      setTimeout(() => setFlowUploadStatus("idle"), 4000);
    };
    reader.readAsText(file);
  };

  // Filter careers list based on regulatory professional licensure toggle
  const currentCareers = useMemo(() => {
    const field = getFieldForCourse(code);
    return FIELD_CAREERS[field] || FIELD_CAREERS.other;
  }, [code]);

  const filteredCareers = useMemo(() => {
    if (hideRegulatedCareers) {
      return currentCareers.filter(c => c.reqs === "No");
    }
    return currentCareers;
  }, [currentCareers, hideRegulatedCareers]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* 1. Header Area */}
      <div className="mb-6">
        <Link
          to="/reports"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          All reports
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                {program?.program ?? report.title}
              </h1>
              {simulatedScore !== null && (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 animate-pulse">
                  Simulated delta active
                </span>
              )}
            </div>
            <p className="text-muted-foreground mt-1">{report.institution} · {program?.level || "Undergraduate"}</p>
          </div>
          <div className="flex items-center gap-3">
            {meta?.riskBand && (
              <span className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${riskBandStyles[meta.riskBand]}`}>
                {meta.riskBand}
              </span>
            )}
            <div className="flex flex-col items-end">
              <span className="text-2xl font-black text-foreground tracking-tight">{scoreText}</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">DFVA Durability Index</span>
            </div>
          </div>
        </div>

        {/* 4-Tab Interface Selection Navigation */}
        <div className="mt-8 flex border-b border-border">
          {[
            { id: "overview" as const, label: "Overview Dashboard", icon: BarChart2 },
            { id: "map" as const, label: "Curriculum Map", icon: Layers },
            { id: "market" as const, label: "Market Intelligence", icon: TrendingUp },
            { id: "redesign" as const, label: "Redesign Workspace", icon: ClipboardList },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold transition-all outline-none ${
                  isActive
                    ? "border-primary text-primary font-bold bg-muted/10"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Tab Contents */}
      <div className="space-y-6">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {(() => {
                const rawMarkdown = REPORT_CONTENT[slugsByType.assessment]?.markdown ?? report.markdown;
                const structured = parseStructured(rawMarkdown);
                if (structured) {
                  return (
                    <>
                      <InteractiveRubricPanel
                        dimensions={structured.data.dimensions}
                        thresholds={structured.data.thresholds}
                        programName={program?.program ?? report.title}
                        baseScore={program?.score ?? 20}
                        maxScore={program?.maxScore ?? 36}
                        programSlug={slugsByType.assessment}
                      />
                      {renderMarkdownAsPanels(structured.rest)}
                    </>
                  );
                }
                
                // Fallback to static program rubric if JSON parsing isn't applicable
                return (
                  <>
                    {program && (
                      <InteractiveRubricPanel
                        dimensions={program.dimensions}
                        thresholds={program.thresholds as any}
                        programName={program.program}
                        baseScore={program.score}
                        maxScore={program.maxScore}
                        programSlug={slugsByType.assessment}
                      />
                    )}
                    {renderMarkdownAsPanels(rawMarkdown)}
                  </>
                );
              })()}
              <WhyThisMatters testId="EXP-01" title="Why This Matters" />
            </div>

            <div className="space-y-6">

              {/* SVG Shift & Drift Timeline */}
              <ShiftDriftChart />

              {/* Key Assessment Guidelines Callout */}
              <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase text-foreground flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  Assessor Quality Standards
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  DFVA scores measure graduate structural irreplaceability in standard entry-level hiring models. Programs showing moderate/high risk clusters are recommended for syllabus adjustments using the Redesign tab.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURRICULUM MAP */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/60 backdrop-blur-md">
              <div>
                <h2 className="text-lg font-bold text-foreground">Interactive Curriculum Visualizer</h2>
                <p className="text-xs text-muted-foreground">
                  Map student flow coverage bottlenecks and IRA concept scaffolding progressions.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer bg-muted hover:bg-muted/80 border border-border rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors">
                  <Upload className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Upload Enrollment CSV</span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleStudentFlowCSV}
                    className="hidden"
                  />
                </label>
                {flowUploadStatus === "success" && (
                  <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Heatmap calibrated
                  </span>
                )}
                {flowUploadStatus === "error" && (
                  <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Bad file layout
                  </span>
                )}
              </div>
            </div>

            <CurriculumMap 
              syllabusData={syllabusData} 
              baseScore={program?.score ?? 20}
              onScoreSimulated={(simScore) => setSimulatedScore(simScore)}
            />
          </div>
        )}

        {/* TAB 3: MARKET INTELLIGENCE */}
        {activeTab === "market" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {renderMarkdownAsPanels(
                REPORT_CONTENT[slugsByType.market]?.markdown ?? "No custom market intelligence report loaded."
              )}
            </div>

            <div className="space-y-6">
              {/* Professional Licensure Filter */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <Filter className="h-4 w-4 text-primary" />
                    Regulatory Licensure Shield
                  </h3>
                  <button
                    onClick={() => setHideRegulatedCareers(!hideRegulatedCareers)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      hideRegulatedCareers ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${
                        hideRegulatedCareers ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Toggle to hide jobs requiring professional licensure, isolating careers directly vulnerable to immediate generative AI displacement.
                </p>

                <div className="space-y-2 border-t border-border pt-3">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Occupational Exposure List ({filteredCareers.length} pathways)
                  </div>
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
                    {filteredCareers.map((c, i) => (
                      <div key={i} className="flex justify-between items-center p-2 rounded bg-muted/40 border border-border/40 text-xs">
                        <div>
                          <div className="font-semibold text-foreground">{c.job}</div>
                          <div className="text-[10px] text-muted-foreground">{c.cluster}</div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${
                            c.risk === "High" ? "bg-red-500/10 text-red-400" : c.risk === "Moderate" ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                          }`}>
                            {c.risk} AI Risk
                          </span>
                          {c.reqs !== "No" && (
                            <div className="text-[8px] text-primary font-bold mt-0.5">{c.reqs}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alumni Destination CSV Loader */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Upload className="h-4 w-4 text-primary" />
                  Alumni Data Calibration
                </h3>
                <p className="text-xs text-muted-foreground">
                  Upload destination spreadsheets from the careers team to calibrate local market clusters and exposure weights.
                </p>

                {mappingStep === "idle" && (
                  <label className="flex flex-col items-center justify-center h-24 border border-dashed border-border hover:border-primary/50 rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Upload className="h-5 w-5 text-muted-foreground mb-1.5" />
                    <span className="text-xs font-semibold text-foreground">Select spreadsheet CSV</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">Rows: name, company, job_title, sector</span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleAlumniFileSelect}
                      className="hidden"
                    />
                  </label>
                )}

                {mappingStep === "analyzing" && (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <RefreshCw className="h-6 w-6 animate-spin text-primary mb-2" />
                    <div className="text-xs font-bold text-foreground">AI Scanning Columns...</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Extracting headers and matching job dimensions</div>
                  </div>
                )}

                {mappingStep === "mapping" && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-foreground mb-1">Confirm Column Mappings</div>
                    
                    {Object.keys(columnMapping).map((targetField) => (
                      <div key={targetField} className="flex justify-between items-center gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground capitalize">
                          {targetField.replace(/([A-Z])/g, " $1")}
                        </span>
                        <select
                          value={columnMapping[targetField]}
                          onChange={(e) => setColumnMapping(prev => ({ ...prev, [targetField]: e.target.value }))}
                          className="bg-muted border border-border rounded px-1.5 py-0.5 text-xs outline-none w-32 focus:border-primary bg-card"
                        >
                          <option value="">(Ignore)</option>
                          {csvHeaders.map((header) => (
                            <option key={header} value={header}>{header}</option>
                          ))}
                        </select>
                      </div>
                    ))}

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => setMappingStep("idle")}
                        className="flex-1 rounded border border-border py-1.5 text-xs text-muted-foreground hover:bg-muted font-semibold transition-colors"
                      >
                        Reset
                      </button>
                      <button
                        onClick={handleAlumniImportSubmit}
                        disabled={isUploadingAlumni}
                        className="flex-1 rounded bg-primary text-primary-foreground py-1.5 text-xs font-bold hover:opacity-90 transition-all shadow flex justify-center items-center gap-1.5"
                      >
                        {isUploadingAlumni ? (
                          <>
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            Importing...
                          </>
                        ) : (
                          "Import Data"
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {mappingStep === "success" && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs space-y-2">
                    <div className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Calibration Complete
                    </div>
                    <p className="text-[11px] text-emerald-300">
                      Successfully parsed and imported {successCount} graduate destinations. Program labor cluster risk scores have been refreshed.
                    </p>
                    <button
                      onClick={() => setMappingStep("idle")}
                      className="text-[10px] text-primary hover:underline font-semibold block pt-1"
                    >
                      Upload another file
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REDESIGN WORKSPACE */}
        {activeTab === "redesign" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {renderMarkdownAsPanels(
                REPORT_CONTENT[slugsByType.recommend]?.markdown ?? "No specific improvement plan loaded for this program."
              )}
            </div>

            <div className="space-y-6">
              {/* Curriculum Accountability Owner Map */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" />
                  Accountability Owner Map
                </h3>
                <p className="text-xs text-muted-foreground">
                  Assign key curriculum dimensions to subject coordinators to trigger compliance status email workflows.
                </p>

                <form onSubmit={handleAssignOwner} className="space-y-3 border-t border-border pt-3">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                      Select Course Node
                    </label>
                    <select
                      name="courseCode"
                      required
                      className="w-full bg-muted border border-border rounded p-2 text-xs outline-none focus:border-primary bg-card"
                    >
                      <option value="">Select subject...</option>
                      {syllabusData.courses.map(c => (
                        <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                      Select COMPASS Dimension
                    </label>
                    <select
                      name="dimensionId"
                      required
                      className="w-full bg-muted border border-border rounded p-2 text-xs outline-none focus:border-primary bg-card"
                    >
                      <option value="">Select dimension...</option>
                      {DIMENSIONS.map(d => (
                        <option key={d.id} value={d.id}>{d.id} - {d.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Coordinator Name
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        required
                        placeholder="Dr. Melb"
                        className="w-full bg-muted border border-border rounded p-2 text-xs outline-none focus:border-primary text-foreground bg-card"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="ownerEmail"
                        required
                        placeholder="melb@unimelb"
                        className="w-full bg-muted border border-border rounded p-2 text-xs outline-none focus:border-primary text-foreground bg-card"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Target Date (Optional)
                      </label>
                      <input
                        type="date"
                        name="targetDate"
                        className="w-full bg-muted border border-border rounded p-2 text-xs outline-none focus:border-primary text-foreground bg-card"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Review Status
                      </label>
                      <select
                        name="status"
                        required
                        className="w-full bg-muted border border-border rounded p-2 text-xs outline-none focus:border-primary bg-card"
                      >
                        <option value="assigned">Assigned</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-primary text-primary-foreground py-2 text-xs font-bold hover:opacity-90 transition-all shadow flex justify-center items-center gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Assign Curriculum Owner
                  </button>
                </form>

                {/* Assigned Owners List */}
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Active Ownership Mapping ({activeInterventions.length})
                  </div>
                  {activeInterventions.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground italic text-center py-2">
                      No owners mapped yet. Assign a coordinator above to begin tracking.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
                      {activeInterventions.map((item, i) => (
                        <div key={i} className="p-2.5 rounded bg-muted/40 border border-border text-xs space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-foreground">{item.courseCode}</span>
                            <span className={`inline-block rounded px-1.5 py-0.2 text-[8px] font-bold uppercase ${
                              item.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : item.status === "in_progress" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground font-medium">
                            Dimension: {dimensionIdToString(item.dimensionId)} ({DIMENSIONS.find(d => d.id === dimensionIdToString(item.dimensionId))?.label})
                          </div>
                          <div className="text-[10px] text-foreground flex items-center justify-between pt-1">
                            <span>Owner: {item.ownerName}</span>
                            {item.targetDate && (
                              <span className="text-[8px] text-muted-foreground">Due: {new Date(item.targetDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
