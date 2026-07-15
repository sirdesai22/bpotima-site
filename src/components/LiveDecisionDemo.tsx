"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios, type Scenario } from "@content/demo-scenarios";

type Phase = "idle" | "extracting" | "rules" | "verdict" | "auditing" | "complete";
type TraceTarget =
  | { type: "field"; id: string }
  | { type: "rule"; id: string }
  | { type: "decision" }
  | null;

function useSequencer() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleRules, setVisibleRules] = useState(0);
  const [auditIndex, setAuditIndex] = useState(0);

  const start = useCallback(() => {
    setPhase("extracting");
    setVisibleRules(0);
    setAuditIndex(0);
    setTimeout(() => setPhase("rules"), 1200);
    setTimeout(() => setPhase("verdict"), 1800);
    setTimeout(() => setPhase("auditing"), 2400);
  }, []);

  useEffect(() => {
    if (phase !== "auditing") return;
    if (auditIndex >= 20) return;
    const t = setTimeout(() => setAuditIndex((i) => i + 1), 250);
    return () => clearTimeout(t);
  }, [phase, auditIndex]);

  const effectivePhase: Phase =
    phase === "auditing" && auditIndex >= 20 ? "complete" : phase;

  return {
    phase: effectivePhase,
    visibleRules,
    auditIndex,
    start,
    reset: useCallback(() => setPhase("idle"), []),
  };
}

function getHighlightedIds(
  scenario: Scenario,
  target: TraceTarget
): { fields: Set<string>; rules: Set<string> } {
  const fields = new Set<string>();
  const rules = new Set<string>();

  if (!target) return { fields, rules };

  if (target.type === "decision") {
    const decisionRules = scenario.rules.filter(() => true);
    decisionRules.forEach((r) => {
      rules.add(r.id);
      r.dependsOn.forEach((fid) => fields.add(fid));
    });
  } else if (target.type === "rule") {
    rules.add(target.id);
    const rule = scenario.rules.find((r) => r.id === target.id);
    rule?.dependsOn.forEach((fid) => fields.add(fid));
  } else if (target.type === "field") {
    fields.add(target.id);
  }

  return { fields, rules };
}

function buildBreadcrumb(scenario: Scenario, target: TraceTarget): string[] {
  if (!target) return [];
  const steps: string[] = [];

  if (target.type === "decision") {
    steps.push("Decision");
    const decisionRules = scenario.rules;
    const last = decisionRules[decisionRules.length - 1];
    if (last) {
      steps.push(`Rule: ${last.label}`);
      const dep = last.dependsOn[last.dependsOn.length - 1];
      const field = dep ? scenario.fields.find((f) => f.id === dep) : undefined;
      if (field) {
        steps.push(`${field.label}: ${formatVal(field.value)}`);
        steps.push(`Source line ${field.sourceLine + 1}`);
      }
    }
  } else if (target.type === "rule") {
    steps.push(`Rule: ${target.id}`);
    const rule = scenario.rules.find((r) => r.id === target.id);
    if (rule) {
      const dep = rule.dependsOn[rule.dependsOn.length - 1];
      const field = dep ? scenario.fields.find((f) => f.id === dep) : undefined;
      if (field) {
        steps.push(`${field.label}: ${formatVal(field.value)}`);
        steps.push(`Source line ${field.sourceLine + 1}`);
      }
    }
  } else if (target.type === "field") {
    const field = scenario.fields.find((f) => f.id === target.id);
    if (field) {
      steps.push(`${field.label}: ${formatVal(field.value)}`);
      steps.push(`Source line ${field.sourceLine + 1}`);
    }
  }

  return steps;
}

function formatVal(v: string | number | boolean): string {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") {
    if (v >= 1000) return `$${v.toLocaleString()}`;
    if (Number.isInteger(v)) return `${v}`;
    return `${v}`;
  }
  return v;
}

function VerdictBadge({
  verdict,
  hasPulsed,
}: {
  verdict: string;
  hasPulsed: boolean;
}) {
  const colors: Record<string, string> = {
    approve: "bg-approve/10 text-approve border-approve/30",
    escalate: "bg-escalate/10 text-escalate border-escalate/30",
    reject: "bg-reject/10 text-reject border-reject/30",
  };

  return (
    <span
      className={`inline-block font-mono text-xs font-bold px-3 py-1 rounded border transition-all ${
        colors[verdict] || colors.approve
      } ${!hasPulsed ? "animate-pulse" : ""}`}
      style={{ animationDuration: "2s" }}
    >
      {verdict.toUpperCase()}
    </span>
  );
}

function EvidencePanel({
  scenario,
  phase,
  traceTarget,
  onFieldClick,
}: {
  scenario: Scenario;
  phase: Phase;
  traceTarget: TraceTarget;
  onFieldClick: (id: string) => void;
}) {
  const isComplete = phase === "complete";
  const { fields: hlFields } = getHighlightedIds(scenario, traceTarget);
  const visibleCount = phase === "extracting" || phase === "idle" ? 0 : scenario.fields.length;

  const lines = scenario.evidenceText.split("\n");

  return (
    <div className="space-y-3">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Evidence
      </h3>
      <div className="rounded border border-line bg-surface p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {lines.map((line, i) => {
          const isExtracted = scenario.fields.some((f) => f.sourceLine === i);
          const isHighlighted =
            isExtracted &&
            scenario.fields.some(
              (f) => f.sourceLine === i && hlFields.has(f.id)
            );
          return (
            <div
              key={i}
              className={`py-0.5 transition-opacity duration-150 ${
                traceTarget && !isHighlighted && isExtracted
                  ? "opacity-30"
                  : traceTarget && !isExtracted
                    ? "opacity-30"
                    : ""
              } ${
                isExtracted
                  ? isHighlighted
                    ? "bg-highlight/15 rounded px-0.5 -mx-0.5"
                    : "bg-highlight/8 rounded px-0.5 -mx-0.5"
                  : ""
              }`}
            >
              <span className="text-ink-soft/40 select-none mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {line}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {phase !== "idle" && phase !== "extracting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1.5"
          >
            {scenario.fields.slice(0, visibleCount).map((f, i) => {
              const isDimmed = traceTarget && !hlFields.has(f.id);
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: traceTarget && !hlFields.has(f.id) ? 0.3 : 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.15, delay: i * 0.1 }}
                  onClick={() => isComplete && onFieldClick(f.id)}
                  className={`flex items-center justify-between py-1.5 px-3 rounded border text-sm ${
                    isComplete
                      ? "cursor-pointer border-accent/20 hover:border-accent/50"
                      : "border-transparent"
                  } ${isDimmed ? "opacity-30" : ""}`}
                >
                  <span className="font-sans text-ink-soft">{f.label}</span>
                  <span className="font-mono text-ink font-medium">
                    {formatVal(f.value)}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RulesPanel({
  scenario,
  phase,
  visibleRules,
  traceTarget,
  onRuleClick,
}: {
  scenario: Scenario;
  phase: Phase;
  visibleRules: number;
  traceTarget: TraceTarget;
  onRuleClick: (id: string) => void;
}) {
  const isComplete = phase === "complete";
  const { rules: hlRules } = getHighlightedIds(scenario, traceTarget);

  return (
    <div className="space-y-3">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Rules
      </h3>
      <div className="space-y-2">
        <AnimatePresence>
          {scenario.rules.slice(0, visibleRules).map((r, i) => {
            const isDimmed = traceTarget && !hlRules.has(r.id);
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: isDimmed ? 0.3 : 1,
                  y: 0,
                }}
                transition={{ duration: 0.15, delay: i * 0.05 }}
                onClick={() => isComplete && onRuleClick(r.id)}
                className={`rounded border p-3 ${
                  isComplete
                    ? "cursor-pointer border-accent/20 hover:border-accent/50"
                    : "border-line"
                } ${r.passed ? "bg-approve/5" : "bg-escalate/5"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-sans text-sm font-medium text-ink">
                    {r.label}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-semibold whitespace-nowrap ${
                      r.passed ? "text-approve" : "text-escalate"
                    }`}
                  >
                    {r.passed ? "PASS" : "FLAG"}
                  </span>
                </div>
                <p className="font-sans text-xs text-ink-soft mt-1 leading-relaxed">
                  {r.condition}
                </p>
                {isComplete && (
                  <div className="mt-1 text-right">
                    <span className="font-sans text-[10px] text-accent underline decoration-dotted underline-offset-2 hover:no-underline transition-opacity">
                      trace
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BreadcrumbStrip({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;
  return (
    <div className="rounded border border-highlight/30 bg-highlight/8 px-3 py-2 overflow-hidden text-xs font-mono text-ink-soft flex flex-wrap items-center gap-1">
      {steps.map((s, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-soft/30">&larr;</span>}
          <span className={i === steps.length - 1 ? "text-accent font-medium" : ""}>
            {s}
          </span>
        </span>
      ))}
    </div>
  );
}

function DecisionPanel({
  scenario,
  phase,
  auditIndex,
  traceTarget,
  onDecisionClick,
  onClearTrace,
  hasPulsed,
}: {
  scenario: Scenario;
  phase: Phase;
  auditIndex: number;
  traceTarget: TraceTarget;
  onDecisionClick: () => void;
  onClearTrace: () => void;
  hasPulsed: boolean;
}) {
  const isComplete = phase === "complete";
  const isVerdictVisible =
    phase === "verdict" || phase === "auditing" || phase === "complete";
  const breadcrumb = buildBreadcrumb(scenario, traceTarget);

  return (
    <div className="space-y-3">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Decision
      </h3>

      {breadcrumb.length > 0 && <BreadcrumbStrip steps={breadcrumb} />}

      <AnimatePresence>
        {isVerdictVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              if (isComplete) {
                if (traceTarget?.type === "decision") onClearTrace();
                else onDecisionClick();
              }
            }}
            className={`rounded border p-4 ${
              isComplete
                ? "cursor-pointer border-accent/20 hover:border-accent/50"
                : "border-line"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-sm font-semibold text-ink">Verdict</span>
              <div className="flex items-center gap-2">
                <VerdictBadge
                  verdict={scenario.verdict}
                  hasPulsed={hasPulsed}
                />
                {isComplete && (
                  <span className="font-sans text-[11px] text-accent underline decoration-dotted underline-offset-2 hover:no-underline cursor-pointer">
                    click to trace
                  </span>
                )}
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-ink/80">
              {scenario.reasoning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "auditing" || phase === "complete" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded border border-line bg-surface p-3"
          >
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-widest text-ink-soft mb-2">
              Audit Trail
            </h4>
            <div className="space-y-1">
              {scenario.auditLog.slice(0, auditIndex).map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 font-mono text-[11px] text-ink-soft"
                >
                  <span className="text-ink-soft/40 w-16 shrink-0">
                    {entry.timestamp.split("T")[1].slice(0, 8)}
                  </span>
                  <span className="flex-1 truncate">{entry.event}</span>
                  <span className="text-ink-soft/40 hidden sm:inline">
                    {entry.hash.slice(0, 8)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => {
            const headers = "Timestamp,Event,Hash";
            const rows = scenario.auditLog
              .map((e) => `${e.timestamp},"${e.event}",${e.hash}`)
              .join("\n");
            const csv = `${headers}\n${rows}`;
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `audit-trail-${scenario.id}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="w-full rounded border border-line bg-surface px-3 py-2 font-mono text-xs text-ink-soft hover:bg-bg hover:text-ink transition-colors cursor-pointer"
        >
          Export .csv
        </motion.button>
      )}
    </div>
  );
}

export default function LiveDecisionDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const scenario = scenarios.find((s) => s.id === activeId) || scenarios[0];
  const { phase, visibleRules, auditIndex, start, reset } = useSequencer();
  const [traceTarget, setTraceTarget] = useState<TraceTarget>(null);
  const [hasPulsed, setHasPulsed] = useState(false);

  const [mobilePanel, setMobilePanel] = useState(0);

  const handleRun = useCallback(() => {
    setTraceTarget(null);
    setHasPulsed(false);
    start();
  }, [start]);

  const handleScenarioSwitch = useCallback(
    (id: string) => {
      setActiveId(id);
      setTraceTarget(null);
      setHasPulsed(false);
      reset();
    },
    [reset]
  );

  useEffect(() => {
    if (phase === "complete" && !hasPulsed) {
      const t = setTimeout(() => setHasPulsed(true), 0);
      return () => clearTimeout(t);
    }
  }, [phase, hasPulsed]);

  const panels = [
    <EvidencePanel
      key="evidence"
      scenario={scenario}
      phase={phase}
      traceTarget={traceTarget}
      onFieldClick={(id) =>
        setTraceTarget(
          traceTarget?.type === "field" && traceTarget.id === id
            ? null
            : { type: "field", id }
        )
      }
    />,
    <RulesPanel
      key="rules"
      scenario={scenario}
      phase={phase}
      visibleRules={visibleRules}
      traceTarget={traceTarget}
      onRuleClick={(id) =>
        setTraceTarget(
          traceTarget?.type === "rule" && traceTarget.id === id
            ? null
            : { type: "rule", id }
        )
      }
    />,
    <DecisionPanel
      key="decision"
      scenario={scenario}
      phase={phase}
      auditIndex={auditIndex}
      traceTarget={traceTarget}
      onDecisionClick={() =>
        setTraceTarget(
          traceTarget?.type === "decision" ? null : { type: "decision" }
        )
      }
      onClearTrace={() => setTraceTarget(null)}
      hasPulsed={hasPulsed}
    />,
  ];

  return (
    <div className="space-y-6" id="interactive-demo">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioSwitch(s.id)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeId === s.id
                  ? "bg-accent text-white"
                  : "bg-surface text-ink-soft border border-line hover:bg-bg"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {phase === "idle" && (
          <button
            onClick={handleRun}
            className="px-5 py-2 rounded bg-accent text-white text-sm font-semibold hover:bg-accent-light transition-colors"
          >
            Run demo
          </button>
        )}

        {phase !== "idle" && phase !== "complete" && (
          <span className="font-mono text-xs text-accent animate-pulse">
            processing&hellip;
          </span>
        )}

        {phase === "complete" && (
          <span className="font-mono text-xs text-ink-soft">
            done &middot; click any item to trace
          </span>
        )}
      </div>

      {phase === "idle" && (
        <div className="rounded border border-line bg-surface p-8 text-center">
          <p className="font-sans text-sm text-ink-soft">
            Select a scenario above, then click &ldquo;Run demo&rdquo; to see the
            decision pipeline in action.
          </p>
        </div>
      )}

      {phase !== "idle" && (
        <>
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {panels.map((panel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {panel}
              </motion.div>
            ))}
          </div>

          <div className="md:hidden">
            <div className="flex border-b border-line mb-4">
              {["Evidence", "Rules", "Decision"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setMobilePanel(i)}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    mobilePanel === i
                      ? "text-accent border-b-2 border-accent"
                      : "text-ink-soft"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {panels[mobilePanel]}
          </div>
        </>
      )}

      <p className="font-sans text-[11px] text-ink-soft/60 text-center leading-relaxed max-w-2xl mx-auto">
        Nothing here is generative. Field extraction is grounded to a line in the
        source document. The decision path is the client&apos;s own deterministic
        policy, unedited by Groundset. The only thing authored for this demo is the
        animation.
      </p>
    </div>
  );
}
