// compass/app/src/client/components/CurriculumMap.tsx
import React, { useState, useMemo, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import {
  Play,
  Settings,
  ShieldAlert,
  Award,
  RefreshCw,
  X,
  AlertTriangle,
} from "lucide-react";

interface CourseNodeData {
  code: string;
  title: string;
  level: number;
  prereqs: string[];
  core: boolean;
}

interface IraSkill {
  courseCode: string;
  dimensionId: string;
  level: "I" | "R" | "A";
  rationale: string;
}

interface SyllabusData {
  courses: CourseNodeData[];
  iraMatrix: IraSkill[];
  theoreticalFlow: Record<string, number>;
  csvFlow?: Record<string, number>;
}

interface CurriculumMapProps {
  syllabusData: SyllabusData;
  onScoreSimulated?: (simulatedScore: number) => void;
  baseScore: number;
  isGenericFallback?: boolean;
}

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

export function CurriculumMap({
  syllabusData,
  onScoreSimulated,
  baseScore,
  isGenericFallback,
}: CurriculumMapProps) {
  const [viewMode, setViewMode] = useState<"flow" | "ira">("flow");
  const [selectedDimension, setSelectedDimension] = useState<string>("D5");
  const [selectedNode, setSelectedNode] = useState<CourseNodeData | null>(null);

  // Sandbox simulations state
  const [simulatedSkills, setSimulatedSkills] = useState<IraSkill[]>(
    syllabusData.iraMatrix,
  );
  const [simulatedFlow, setSimulatedFlow] = useState<Record<string, number>>(
    syllabusData.csvFlow || syllabusData.theoreticalFlow,
  );

  // Synchronize initial state
  useEffect(() => {
    setSimulatedSkills(syllabusData.iraMatrix);
    setSimulatedFlow(syllabusData.csvFlow || syllabusData.theoreticalFlow);
  }, [syllabusData]);

  // Dagre layout configuration
  const getLayoutedElements = (
    courses: CourseNodeData[],
    skills: IraSkill[],
    flow: Record<string, number>,
  ) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: "TB", nodesep: 70, ranksep: 80 });

    courses.forEach((c) => {
      dagreGraph.setNode(c.code, { width: 180, height: 90 });
    });

    courses.forEach((c) => {
      c.prereqs.forEach((prereq) => {
        dagreGraph.setEdge(prereq, c.code);
      });
    });

    dagre.layout(dagreGraph);

    // Build React Flow Nodes
    const flowNodes = courses.map((c) => {
      const nodeWithPosition = dagreGraph.node(c.code);
      const isCore = c.core;

      // Determine node styling based on viewMode
      let bgColor = "bg-card";
      let borderStyle = isCore ? "border-primary border-2" : "border-border";
      let subText = `Level ${c.level}`;
      let badge: React.ReactNode = null;

      if (viewMode === "flow") {
        const traffic = flow[c.code] || 0;
        // Interpolate colors based on traffic
        if (traffic >= 90) {
          bgColor = "bg-red-500/10 text-red-900 dark:text-red-200";
          borderStyle = "border-red-500/50";
          subText = `${traffic}% Traffic (Core Bottleneck)`;
        } else if (traffic >= 50) {
          bgColor = "bg-amber-500/10 text-amber-900 dark:text-amber-200";
          borderStyle = "border-amber-500/50";
          subText = `${traffic}% Traffic`;
        } else {
          bgColor = "bg-blue-500/5 text-blue-900 dark:text-blue-200";
          borderStyle = "border-blue-500/30";
          subText = `${traffic}% Traffic`;
        }
      } else if (viewMode === "ira") {
        const skill = skills.find(
          (s) => s.courseCode === c.code && s.dimensionId === selectedDimension,
        );
        if (skill) {
          bgColor = "bg-primary/10 text-foreground";
          borderStyle = "border-primary";
          subText =
            skill.rationale.length > 30
              ? skill.rationale.slice(0, 27) + "..."
              : skill.rationale;

          const levelLabels = { I: "Intro", R: "Reinforce", A: "Assess" };
          const levelColors = {
            I: "bg-blue-500",
            R: "bg-purple-500",
            A: "bg-red-500",
          };

          badge = (
            <span
              className={`absolute -top-2 -right-2 ${
                levelColors[skill.level]
              } rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white shadow-md`}
            >
              {levelLabels[skill.level]}
            </span>
          );
        } else {
          // Fade out non-relevant courses in IRA mode
          bgColor = "bg-card/40 opacity-40";
          borderStyle = "border-border/30";
        }
      }

      return {
        id: c.code,
        position: {
          x: nodeWithPosition.x - 90,
          y: nodeWithPosition.y - 45,
        },
        data: {
          label: (
            <div className="relative flex h-full flex-col justify-between p-3 text-left text-xs">
              {badge}
              <div className="truncate font-bold" title={c.code}>
                {c.code}: {c.title}
              </div>
              <div className="text-muted-foreground mt-2 flex items-center justify-between text-[10px]">
                <span>{subText}</span>
                {isCore && (
                  <span className="bg-primary/20 text-primary rounded-sm px-1 text-[8px] font-bold">
                    CORE
                  </span>
                )}
              </div>
            </div>
          ),
        },
        className: `rounded-xl border shadow-sm ${bgColor} ${borderStyle} transition-all duration-300 w-[180px] h-[90px] cursor-pointer hover:shadow-md`,
      };
    });

    // Build React Flow Edges
    const flowEdges: any[] = [];
    courses.forEach((c) => {
      c.prereqs.forEach((prereq) => {
        flowEdges.push({
          id: `e-${prereq}-${c.code}`,
          source: prereq,
          target: c.code,
          animated: viewMode === "flow",
          style: {
            stroke: viewMode === "flow" ? "#3b82f6" : "#94a3b8",
            strokeWidth: 1.5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: viewMode === "flow" ? "#3b82f6" : "#94a3b8",
          },
        });
      });
    });

    return { nodes: flowNodes, edges: flowEdges };
  };

  const { nodes, edges } = useMemo(
    () =>
      getLayoutedElements(syllabusData.courses, simulatedSkills, simulatedFlow),
    [syllabusData, viewMode, selectedDimension, simulatedSkills, simulatedFlow],
  );

  const [rfNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges]);

  // Handle node selection
  const onNodeClick = (_event: React.MouseEvent, node: any) => {
    const course = syllabusData.courses.find((c) => c.code === node.id);
    if (course) setSelectedNode(course);
  };

  // Sandbox: toggle custom skill simulation
  const handleToggleSimulation = (
    dimensionId: string,
    level: "I" | "R" | "A" | "none",
  ) => {
    if (!selectedNode) return;

    let updatedSkills = [...simulatedSkills];
    const index = updatedSkills.findIndex(
      (s) =>
        s.courseCode === selectedNode.code && s.dimensionId === dimensionId,
    );

    if (level === "none") {
      if (index !== -1) updatedSkills.splice(index, 1);
    } else {
      const newSkill: IraSkill = {
        courseCode: selectedNode.code,
        dimensionId,
        level,
        rationale: "User simulated development upgrade.",
      };
      if (index !== -1) {
        updatedSkills[index] = newSkill;
      } else {
        updatedSkills.push(newSkill);
      }
    }

    setSimulatedSkills(updatedSkills);

    // Calculate simulated score shift
    // For MVP sandbox: each unique dimension having an "Assess" (A) adds 1 point to the base score (max 36)
    // if it wasn't assessed before.
    const baseAssessed = syllabusData.iraMatrix
      .filter((s) => s.level === "A")
      .map((s) => s.dimensionId);
    const simulatedAssessed = updatedSkills
      .filter((s) => s.level === "A")
      .map((s) => s.dimensionId);

    let newScore = baseScore;
    simulatedAssessed.forEach((dim) => {
      if (!baseAssessed.includes(dim)) newScore = Math.min(36, newScore + 1);
    });

    if (onScoreSimulated) onScoreSimulated(newScore);
  };

  return (
    <div className="border-border bg-muted/20 flex h-[550px] flex-col overflow-hidden rounded-xl border">
      {/* Illustrative data banner */}
      {isGenericFallback && (
        <div className="flex shrink-0 items-center gap-2 border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-700 dark:text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span>
            Showing illustrative placeholder data for a generic Master of
            Information Systems program. Real curriculum data is available for
            B-Des and B-Sci — select those programs for authentic mapping.
          </span>
        </div>
      )}

      <div className="relative flex flex-1 flex-col md:flex-row">
        {/* Visualizer Panel */}
        <div className="relative h-full flex-1">
          {/* Graph Toolbar Controls */}
          <div className="bg-card/85 border-border absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 rounded-lg border p-2 text-xs shadow-sm backdrop-blur-md">
            <button
              onClick={() => setViewMode("flow")}
              className={`rounded-md px-3 py-1.5 font-semibold transition-colors ${
                viewMode === "flow"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Student Traffic Heatmap
            </button>
            <button
              onClick={() => setViewMode("ira")}
              className={`rounded-md px-3 py-1.5 font-semibold transition-colors ${
                viewMode === "ira"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              IRA Scaffolding Map
            </button>

            {viewMode === "ira" && (
              <select
                value={selectedDimension}
                onChange={(e) => setSelectedDimension(e.target.value)}
                className="bg-muted border-border focus:border-primary rounded border px-2 py-1 text-xs outline-none"
              >
                {DIMENSIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.id}: {d.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Legend */}
          <div className="bg-card/85 border-border text-muted-foreground absolute bottom-4 left-4 z-10 space-y-1.5 rounded-lg border p-3 text-[10px] shadow-sm backdrop-blur-md">
            {viewMode === "flow" ? (
              <>
                <div className="text-foreground mb-1 font-semibold">
                  Student Coverage Legend
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded border border-red-500/50 bg-red-500/20" />
                  <span>90%+ (Core bottleneck)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded border border-amber-500/50 bg-amber-500/20" />
                  <span>50% - 89% (High Elective)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded border border-blue-500/30 bg-blue-500/10" />
                  <span>Under 50% (Elective)</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-foreground mb-1 font-semibold">
                  IRA Scaffolding Legend
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-blue-500" />
                  <span>Introduce (I)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-purple-500" />
                  <span>Reinforce (R)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-red-500" />
                  <span>Assess (A)</span>
                </div>
              </>
            )}
          </div>

          {/* React Flow Render area */}
          <ReactFlow
            nodes={rfNodes}
            edges={rfEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            className="h-full"
          >
            <Background color="#94a3b8" gap={16} size={1} />
            <Controls />
            <MiniMap nodeStrokeWidth={3} zoomable pannable />
          </ReactFlow>
        </div>

        {/* Sandbox "What-If" Sidebar Panel */}
        {selectedNode && (
          <div className="border-border bg-card/95 animate-in slide-in-from-right flex w-full flex-col justify-between overflow-y-auto border-t p-6 backdrop-blur-md duration-300 md:w-80 md:border-t-0 md:border-l">
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
                    {selectedNode.core ? "Core Subject" : "Elective Subject"}
                  </span>
                  <h3 className="text-foreground text-sm font-bold">
                    {selectedNode.code}: {selectedNode.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-muted/40 border-border rounded-lg border p-3">
                  <div className="text-muted-foreground mb-1 font-semibold">
                    Theoretical Student Flow
                  </div>
                  <div className="text-foreground text-sm font-bold">
                    {simulatedFlow[selectedNode.code] || 0}% coverage
                  </div>
                </div>

                <div>
                  <h4 className="text-foreground mb-2 flex items-center gap-1.5 font-semibold">
                    <Settings className="h-3.5 w-3.5" />
                    Simulate Curriculum Upgrade
                  </h4>
                  <p className="text-muted-foreground mb-3 text-[10px]">
                    Assign a new Assess-level mapping to a dimension — this adds
                    +1 to the simulated DFVA score (capped at 36). Sandbox only;
                    resets on page reload. See the Redesign Workspace tab for
                    persistent interventions.
                  </p>

                  <div className="max-h-[220px] space-y-3 overflow-y-auto pr-1">
                    {DIMENSIONS.map((dim) => {
                      const currentVal = simulatedSkills.find(
                        (s) =>
                          s.courseCode === selectedNode.code &&
                          s.dimensionId === dim.id,
                      );

                      return (
                        <div
                          key={dim.id}
                          className="bg-muted/20 border-border/50 flex items-center justify-between rounded border p-2"
                        >
                          <span
                            className="w-28 truncate text-[11px] font-medium"
                            title={dim.label}
                          >
                            {dim.id}: {dim.label}
                          </span>

                          <div className="flex gap-1">
                            {["I", "R", "A"].map((lvl) => (
                              <button
                                key={lvl}
                                onClick={() =>
                                  handleToggleSimulation(dim.id, lvl as any)
                                }
                                className={`h-6 w-6 rounded text-[10px] font-bold transition-all ${
                                  currentVal?.level === lvl
                                    ? "bg-primary text-primary-foreground scale-105 shadow-sm"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                            <button
                              onClick={() =>
                                handleToggleSimulation(dim.id, "none")
                              }
                              className={`h-6 w-6 rounded text-[10px] font-bold ${
                                !currentVal
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border mt-6 flex flex-col gap-2 border-t pt-4">
              <div className="text-muted-foreground flex gap-1.5 text-[10px]">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>
                  These simulations are client-side only and will reset on page
                  reload.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
