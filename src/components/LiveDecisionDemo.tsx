"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios, type ScenarioData, type AuditEntry } from "@content/demo-scenarios";

type Phase = "idle" | "extracting" | "rules" | "verdict" | "auditing" | "complete";

type TraceTarget =
  | { type: "verdict" }
  | { type: "rule"; id: string }
  | { type: "field"; label: string }
  | null;

function useSequencer(scenarioId: string) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleFields, setVisibleFields] = useState(0);
  const [visibleRules, setVisibleRules] = useState(0);
  const [visibleAudit, setVisibleAudit] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("idle");
    setVisibleFields(0);
    setVisibleRules(0);
    setVisibleAudit(0);
  }, []);

  const start = useCallback(() => {
    reset();
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    const fd = (n: number) => setTimeout(() => setVisibleFields(n), n * 500);
    const rd = (n: number) => setTimeout(() => setVisibleRules(n), n * 400);
    const ad = (n: number) => setTimeout(() => setVisibleAudit(n), n * 200);

    setPhase("extracting");
    setTimeout(() => {
      for (let i = 1; i <= scenario.extractedFields.length; i++) fd(i);
    }, 300);

    setTimeout(() => {
      setPhase("rules");
      for (let i = 1; i <= scenario.rules.length; i++) rd(i);
    }, scenario.extractedFields.length * 500 + 800);

    setTimeout(() => {
      setPhase("verdict");
    }, scenario.extractedFields.length * 500 + scenario.rules.length * 400 + 1200);

    setTimeout(() => {
      setPhase("auditing");
      for (let i = 1; i <= scenario.auditLog.length; i++) ad(i);
    }, scenario.extractedFields.length * 500 + scenario.rules.length * 400 + 2000);

    setTimeout(() => {
      setPhase("complete");
    }, scenario.extractedFields.length * 500 + scenario.rules.length * 400 + scenario.auditLog.length * 200 + 2600);
  }, [scenarioId, reset]);

  useEffect(() => {
    start();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [start]);

  return { phase, visibleFields, visibleRules, visibleAudit, reset };
}

const statusStyles: Record<string, string> = {
  approve: "bg-approve/10 text-approve border-approve/20",
  escalate: "bg-escalate/10 text-escalate border-escalate/20",
  reject: "bg-reject/10 text-reject border-reject/20",
};

const statusLabel: Record<string, string> = {
  approve: "APPROVE",
  escalate: "ESCALATE",
  reject: "REJECT",
};

function getHighlightSet(
  scenario: ScenarioData,
  target: TraceTarget
): Set<string> | null {
  if (!target) return null;
  const set = new Set<string>();

  if (target.type === "verdict") {
    for (const ruleId of scenario.verdict.dependsOn) {
      set.add(`rule:${ruleId}`);
      const rule = scenario.rules.find((r) => r.id === ruleId);
      if (rule) {
        for (const fieldLabel of rule.dependsOn) {
          set.add(`field:${fieldLabel}`);
        }
      }
    }
  } else if (target.type === "rule") {
    set.add(`rule:${target.id}`);
    const rule = scenario.rules.find((r) => r.id === target.id);
    if (rule) {
      for (const fieldLabel of rule.dependsOn) {
        set.add(`field:${fieldLabel}`);
      }
    }
  } else if (target.type === "field") {
    set.add(`field:${target.label}`);
  }

  return set;
}

function getHighlightedSourceLines(scenario: ScenarioData, target: TraceTarget): Set<number> | null {
  if (!target) return null;
  const set = new Set<number>();

  if (target.type === "verdict") {
    for (const ruleId of scenario.verdict.dependsOn) {
      const rule = scenario.rules.find((r) => r.id === ruleId);
      if (rule) {
        for (const fieldLabel of rule.dependsOn) {
          const field = scenario.extractedFields.find((f) => f.label === fieldLabel);
          if (field) field.dependsOn.forEach((l) => set.add(l));
        }
      }
    }
  } else if (target.type === "rule") {
    const rule = scenario.rules.find((r) => r.id === target.id);
    if (rule) {
      for (const fieldLabel of rule.dependsOn) {
        const field = scenario.extractedFields.find((f) => f.label === fieldLabel);
        if (field) field.dependsOn.forEach((l) => set.add(l));
      }
    }
  } else if (target.type === "field") {
    const field = scenario.extractedFields.find((f) => f.label === target.label);
    if (field) field.dependsOn.forEach((l) => set.add(l));
  }

  return set;
}

function BreadcrumbStrip({
  scenario,
  target,
  onClear,
}: {
  scenario: ScenarioData;
  target: TraceTarget;
  onClear: () => void;
}) {
  if (!target) return null;

  const crumbs: string[] = [];

  if (target.type === "verdict") {
    crumbs.push("Decision");
    for (const id of scenario.verdict.dependsOn) {
      const r = scenario.rules.find((rule) => rule.id === id);
      crumbs.push(r ? `${r.id}: ${r.condition}` : id);
    }
  } else if (target.type === "rule") {
    const rule = scenario.rules.find((r) => r.id === target.id);
    if (rule) {
      crumbs.push(`${rule.id}: ${rule.condition}`);
      crumbs.push(...rule.dependsOn);
    }
  } else if (target.type === "field") {
    const field = scenario.extractedFields.find((f) => f.label === target.label);
    if (field) {
      crumbs.push(`${field.label}: ${field.value}`);
      crumbs.push(...field.dependsOn.map((l) => `source: L${l}`));
    }
  }

  if (crumbs.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-soft/70 overflow-x-auto whitespace-nowrap pb-1">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-ink-soft/30">&larr;</span>}
          <span>{crumb}</span>
        </span>
      ))}
      <button
        onClick={onClear}
        className="ml-2 text-ink-soft/40 hover:text-ink-soft transition-colors"
      >
        &times;
      </button>
    </div>
  );
}

function EvidencePanel({
  scenario,
  visibleFields,
  traceTarget,
  highlightSet,
  onFieldClick,
  isComplete,
}: {
  scenario: ScenarioData;
  visibleFields: number;
  traceTarget: TraceTarget;
  highlightSet: Set<string> | null;
  onFieldClick: (label: string) => void;
  isComplete: boolean;
}) {
  const sourceHighlight = getHighlightedSourceLines(scenario, traceTarget);
  const isDimmed = highlightSet !== null;

  return (
    <div className="space-y-4">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Evidence
      </h3>
      <div className="rounded-lg border border-line bg-surface overflow-hidden">
        <div className="border-b border-line bg-bg px-3 py-1.5 font-mono text-[11px] text-ink-soft">
          {scenario.id === "insurance-claim"
            ? "BP-2407-1832.pdf"
            : "SME-2024-0551.pdf"}
        </div>
        <div className="p-3 space-y-[2px] font-mono text-[12px] leading-relaxed transition-opacity duration-150">
          {scenario.document.map((line, i) => {
            const isExtracted = line.highlight;
            const sourceMatch = sourceHighlight && sourceHighlight.has(line.sourceLine);
            const baseHighlight = isExtracted && !isDimmed;
            return (
              <div
                key={i}
                className={`${
                  baseHighlight
                    ? "bg-highlight/8 border-l-2 border-highlight/30 pl-2 -ml-3 pr-2 py-[1px]"
                    : sourceMatch
                      ? "bg-highlight/15 border-l-2 border-highlight/50 pl-2 -ml-3 pr-2 py-[1px]"
                      : "pl-2"
                } text-ink/80 transition-all duration-150 ${
                  isDimmed
                    ? sourceMatch
                      ? "opacity-100"
                      : "opacity-30"
                    : "opacity-100"
                }`}
              >
                <span className="text-ink-soft/50 mr-2 select-none">
                  {String(line.sourceLine).padStart(2, "0")}
                </span>
                {line.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
          Extracted fields
        </h4>
        <div className="space-y-1.5">
          {scenario.extractedFields.map((field, i) => {
            const inTrace = highlightSet?.has(`field:${field.label}`);
            return (
              <AnimatePresence key={field.label}>
                {i < visibleFields && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      if (isComplete) onFieldClick(field.label);
                    }}
                    className={`flex items-center justify-between rounded border px-3 py-1.5 transition-all duration-150 ${
                      isComplete
                        ? `cursor-pointer hover:border-highlight/40 ${
                            traceTarget || highlightSet
                              ? inTrace
                                ? "border-highlight/40 bg-highlight/8 opacity-100"
                                : "border-line bg-surface opacity-30"
                              : "border-line bg-surface hover:bg-highlight/5"
                          }`
                        : "border-line bg-surface"
                    }`}
                  >
                    <span className="font-sans text-xs text-ink-soft">
                      {field.label}
                      {isComplete && (
                        <span className="ml-2 font-sans text-[10px] text-accent underline decoration-dotted underline-offset-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          trace
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-ink">{field.value}</span>
                      <span className="rounded bg-highlight/10 px-1.5 py-0.5 font-mono text-[10px] text-highlight">
                        L{field.sourceLine}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RulesPanel({
  scenario,
  visibleRules,
  traceTarget,
  highlightSet,
  onRuleClick,
  isComplete,
}: {
  scenario: ScenarioData;
  visibleRules: number;
  traceTarget: TraceTarget;
  highlightSet: Set<string> | null;
  onRuleClick: (ruleId: string) => void;
  isComplete: boolean;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Rules
      </h3>
      <div className="space-y-2">
        {scenario.rules.map((rule, i) => {
          const inTrace = highlightSet?.has(`rule:${rule.id}`);
          return (
            <AnimatePresence key={rule.id}>
              {i < visibleRules && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    if (isComplete) onRuleClick(rule.id);
                  }}
                  className={`rounded border px-3 py-2 transition-all duration-150 ${
                    rule.passed
                      ? "border-approve/20 bg-approve/5"
                      : "border-escalate/20 bg-escalate/5"
                  } ${
                    isComplete
                      ? `cursor-pointer ${
                          traceTarget || highlightSet
                            ? inTrace
                              ? "opacity-100"
                              : "opacity-30"
                            : "hover:border-approve/40"
                        }`
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[11px] text-ink-soft shrink-0">{rule.id}</span>
                        <span className="font-mono text-[11px] text-ink/70 truncate">{rule.condition}</span>
                      </div>
                      <p className="font-sans text-sm text-ink leading-snug">
                        {rule.display}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          rule.passed ? "text-approve" : "text-escalate"
                        }`}
                      >
                        {rule.passed ? "PASS" : "FLAG"}
                      </span>
                    </div>
                  </div>
                  {isComplete && (
                    <div className="mt-1 text-right">
                      <span className="font-sans text-[10px] text-accent underline decoration-dotted underline-offset-2 hover:no-underline transition-opacity">
                        trace
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}

function DecisionPanel({
  scenario,
  phase,
  visibleAudit,
  traceTarget,
  highlightSet,
  onVerdictClick,
  onClearTrace,
  hasCompletedOnce,
}: {
  scenario: ScenarioData;
  phase: Phase;
  visibleAudit: number;
  traceTarget: TraceTarget;
  highlightSet: Set<string> | null;
  onVerdictClick: () => void;
  onClearTrace: () => void;
  hasCompletedOnce: boolean;
}) {
  const isComplete = phase === "complete";

  return (
    <div className="space-y-4">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
        Decision
      </h3>

      {isComplete && traceTarget && (
        <div className="rounded border border-line bg-bg px-3 py-2 overflow-hidden">
          <BreadcrumbStrip
            scenario={scenario}
            target={traceTarget}
            onClear={onClearTrace}
          />
        </div>
      )}

      <AnimatePresence>
        {(phase === "verdict" || phase === "auditing" || phase === "complete") && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              if (isComplete) onVerdictClick();
            }}
            className={`rounded-lg border p-4 transition-all duration-150 ${
              statusStyles[scenario.verdict.status] || ""
            } ${
              isComplete && highlightSet
                ? `cursor-pointer ${
                    traceTarget?.type === "verdict"
                      ? "opacity-100 ring-2 ring-highlight/20"
                      : "opacity-30"
                  }`
                : isComplete && traceTarget === null
                  ? "cursor-pointer"
                  : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.span
                animate={
                  hasCompletedOnce
                    ? {}
                    : {
                        scale: [1, 1.08, 1],
                        transition: { duration: 0.5, delay: 0.3 },
                      }
                }
                className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-bold ${
                  scenario.verdict.status === "approve"
                    ? "bg-approve/15 text-approve"
                    : scenario.verdict.status === "escalate"
                      ? "bg-escalate/15 text-escalate"
                      : "bg-reject/15 text-reject"
                }`}
              >
                {statusLabel[scenario.verdict.status]}
              </motion.span>
              {isComplete && (
                <span className="font-sans text-[11px] text-accent underline decoration-dotted underline-offset-2 hover:no-underline cursor-pointer">
                  click to trace
                </span>
              )}
            </div>
            <p className="font-sans text-sm leading-relaxed text-ink/90">
              {scenario.verdict.reasoning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === "auditing" || phase === "complete") && (
        <div className="space-y-2">
          <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
            Audit trail
          </h4>
          <div className="rounded-lg border border-line overflow-hidden">
            <div className="divide-y divide-line max-h-48 overflow-y-auto">
              {scenario.auditLog.map((entry: AuditEntry, i: number) => (
                <AnimatePresence key={entry.hash}>
                  {i < visibleAudit && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                      className="px-3 py-1.5 flex items-center gap-3 font-mono text-[11px]"
                    >
                      <span className="text-ink-soft/50 w-20 shrink-0">
                        {entry.timestamp.split("T")[1].slice(0, 8)}
                      </span>
                      <span className="text-ink/80 flex-1 truncate">{entry.event}</span>
                      <span className="text-ink-soft/40 font-mono text-[10px] hidden sm:inline">
                        {entry.hash.slice(0, 8)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </div>
      )}

      {isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => {
            const headers = "Timestamp,Event,Hash";
            const rows = scenario.auditLog
              .map((e: AuditEntry) => `${e.timestamp},"${e.event}",${e.hash}`)
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
          className="w-full rounded-md border border-line bg-surface px-3 py-2 font-mono text-xs text-ink-soft hover:bg-bg hover:text-ink transition-colors cursor-pointer"
        >
          Export .csv
        </motion.button>
      )}
    </div>
  );
}

function CounterfactualSliders({ scenario }: { scenario: ScenarioData }) {
  const cf = scenario.counterfactual;
  if (!cf) return null;

  const [fieldValue, setFieldValue] = useState(cf.fieldDefault);
  const [thresholdValue, setThresholdValue] = useState(cf.thresholdDefault);

  function formatVal(v: number) {
    return cf.fieldUnit ? `${cf.fieldUnit}${v.toLocaleString()}` : v.toString();
  }

  function formatThreshold(v: number) {
    return cf.thresholdUnit ? `${cf.thresholdUnit}${v.toLocaleString()}` : v.toString();
  }

  const fieldChanged = fieldValue !== cf.fieldDefault;
  const thresholdChanged = thresholdValue !== cf.thresholdDefault;
  const isModified = fieldChanged || thresholdChanged;

  const passes =
    cf.comparator === "lt"
      ? fieldValue < thresholdValue
      : cf.comparator === "lte"
        ? fieldValue <= thresholdValue
        : cf.comparator === "gt"
          ? fieldValue > thresholdValue
          : fieldValue >= thresholdValue;

  const originalPassed = scenario.rules.find((r) => r.id === cf.ruleId)?.passed ?? true;
  const flipped = passes !== originalPassed;

  let verdictLabel: string;
  let verdictDesc: string;
  if (!isModified) {
    verdictLabel = statusLabel[scenario.verdict.status];
    verdictDesc = "Original outcome — no adjustments applied.";
  } else if (flipped) {
    verdictLabel = passes ? "APPROVE" : "ESCALATE";
    const diffSummary = fieldChanged
      ? `${cf.fieldLabel} moved from ${formatVal(cf.fieldDefault)} \u2192 ${formatVal(fieldValue)}.`
      : `POLICY-${cf.ruleId} threshold moved from ${cf.comparator === "gte" || cf.comparator === "gt" ? "\u2265" : "\u2264"}${formatThreshold(cf.thresholdDefault)} \u2192 ${cf.comparator === "gte" || cf.comparator === "gt" ? "\u2265" : "\u2264"}${formatThreshold(thresholdValue)}.`;
    verdictDesc = `What changed: ${diffSummary} ${verdictLabel === "APPROVE" ? "All criteria now satisfied." : "Rule now flags."} Everything else identical.`;
  } else {
    verdictLabel = statusLabel[scenario.verdict.status];
    const diffSummary = fieldChanged
      ? `${cf.fieldLabel} (${formatVal(fieldValue)}) within threshold (${formatThreshold(thresholdValue)})`
      : `Threshold adjusted (${formatThreshold(thresholdValue)}) but outcome unchanged`;
    verdictDesc = `No change in verdict. ${diffSummary}.`;
  }

  function reset() {
    setFieldValue(cf.fieldDefault);
    setThresholdValue(cf.thresholdDefault);
  }

  const verdictClasses =
    verdictLabel === "APPROVE" || verdictLabel === "APPROVED"
      ? "bg-approve/15 text-approve"
      : "bg-escalate/15 text-escalate";

  const verdictBorderClass =
    verdictLabel === "APPROVE" || verdictLabel === "APPROVED"
      ? "border-approve/20 bg-approve/10"
      : "border-escalate/20 bg-escalate/10";

  return (
    <div className="mt-12 pt-10 border-t border-line">
      <h3 className="font-serif text-2xl text-ink mb-2">
        What would change this?
      </h3>
      <p className="font-sans text-sm text-ink-soft mb-8 max-w-xl">
        Adjust the evidence or the policy rule to see how the decision shifts.
        Each slider controls a different thing — one is the case fact, one is the client&apos;s rule.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg border border-ink/15 bg-surface p-5">
          <label className="flex items-center justify-between mb-1">
            <span className="font-sans text-xs font-semibold text-ink-soft uppercase tracking-widest">
              Case fact
            </span>
            <span className="font-mono text-sm text-ink">
              {formatVal(fieldValue)}
            </span>
          </label>
          <p className="font-sans text-xs text-ink/80 mb-4">
            {cf.fieldLabel}
          </p>
          <input
            type="range"
            min={cf.fieldRange[0]}
            max={cf.fieldRange[1]}
            step={cf.fieldStep}
            value={fieldValue}
            onChange={(e) => setFieldValue(Number(e.target.value))}
            className="slider-neutral w-full"
          />
          <div className="flex justify-between font-mono text-[10px] text-ink-soft/50 mt-1">
            <span>{formatVal(cf.fieldRange[0])}</span>
            <span>{formatVal(cf.fieldRange[1])}</span>
          </div>
        </div>

        <div className="rounded-lg border border-accent/15 bg-surface p-5">
          <label className="flex items-center justify-between mb-1">
            <span className="font-sans text-xs font-semibold text-ink-soft uppercase tracking-widest">
              Policy threshold
            </span>
            <span className="font-mono text-sm text-accent">
              {cf.comparator === "gte" || cf.comparator === "gt" ? "\u2265" : "\u2264"}
              {formatThreshold(thresholdValue)}
            </span>
          </label>
          <p className="font-sans text-xs text-ink/80 mb-2">
            {cf.thresholdLabel}
          </p>
          <div className="flex items-center gap-1 mb-3">
            <span className="font-mono text-[10px] text-ink-soft/60">&#128274;</span>
            <span className="font-sans text-[10px] text-ink-soft/60">
              Client-owned &middot; Editable only by {cf.owner}
            </span>
          </div>
          <input
            type="range"
            min={cf.thresholdRange[0]}
            max={cf.thresholdRange[1]}
            step={cf.thresholdStep}
            value={thresholdValue}
            onChange={(e) => setThresholdValue(Number(e.target.value))}
            className="slider-accent w-full"
          />
          <div className="flex justify-between font-mono text-[10px] text-ink-soft/50 mt-1">
            <span>{formatThreshold(cf.thresholdRange[0])}</span>
            <span>{formatThreshold(cf.thresholdRange[1])}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 flex-wrap">
        <div className={`rounded-lg border p-4 flex-1 min-w-[240px] ${verdictBorderClass}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-bold ${verdictClasses}`}>
              {verdictLabel}
            </span>
          </div>
          <p className="font-sans text-sm leading-relaxed text-ink/90">
            {verdictDesc}
          </p>
        </div>

        {isModified && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={reset}
            className="self-start rounded-md border border-line bg-surface px-4 py-2.5 font-mono text-xs text-ink-soft hover:bg-bg hover:text-ink transition-colors cursor-pointer shrink-0"
          >
            Reset to original
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default function LiveDecisionDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const scenario = scenarios.find((s) => s.id === activeId) || scenarios[0];
  const { phase, visibleFields, visibleRules, visibleAudit } = useSequencer(activeId);
  const isComplete = phase === "complete";
  const hasCompletedOnceRef = useRef(false);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  useEffect(() => {
    if (phase === "complete" && !hasCompletedOnceRef.current) {
      hasCompletedOnceRef.current = true;
      setHasCompletedOnce(true);
    }
  }, [phase]);

  useEffect(() => {
    hasCompletedOnceRef.current = false;
    setHasCompletedOnce(false);
  }, [activeId]);

  const [traceTarget, setTraceTarget] = useState<TraceTarget>(null);
  const highlightSet = getHighlightSet(scenario, traceTarget);

  useEffect(() => {
    if (phase !== "complete") {
      setTraceTarget(null);
    }
  }, [phase]);

  function handleVerdictClick() {
    if (phase !== "complete") return;
    setTraceTarget((prev) => (prev?.type === "verdict" ? null : { type: "verdict" }));
  }

  function handleRuleClick(ruleId: string) {
    setTraceTarget((prev) =>
      prev?.type === "rule" && prev.id === ruleId ? null : { type: "rule", id: ruleId }
    );
  }

  function handleFieldClick(label: string) {
    setTraceTarget((prev) =>
      prev?.type === "field" && prev.label === label ? null : { type: "field", label }
    );
  }

  function handleClearTrace() {
    setTraceTarget(null);
  }

  function handlePanelClick(e: React.MouseEvent) {
    if (traceTarget && e.target === e.currentTarget) {
      setTraceTarget(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeId === s.id
                ? "bg-accent text-white"
                : "text-ink-soft hover:text-ink hover:bg-bg"
            }`}
          >
            <span className="hidden sm:inline">{s.name}</span>
            <span className="sm:hidden text-xs">
              {s.id === "insurance-claim" ? "Claim" : "Credit"}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-6" onClick={handlePanelClick}>
        <EvidencePanel
          scenario={scenario}
          visibleFields={visibleFields}
          traceTarget={traceTarget}
          highlightSet={highlightSet}
          onFieldClick={handleFieldClick}
          isComplete={isComplete}
        />
        <RulesPanel
          scenario={scenario}
          visibleRules={visibleRules}
          traceTarget={traceTarget}
          highlightSet={highlightSet}
          onRuleClick={handleRuleClick}
          isComplete={isComplete}
        />
        <DecisionPanel
          scenario={scenario}
          phase={phase}
          visibleAudit={visibleAudit}
          traceTarget={traceTarget}
          highlightSet={highlightSet}
          onVerdictClick={handleVerdictClick}
          onClearTrace={handleClearTrace}
          hasCompletedOnce={hasCompletedOnce}
        />
      </div>

      <div className="lg:hidden space-y-6">
        <div className="rounded-lg border border-line bg-bg px-4 py-2">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-soft">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold">
              1
            </span>
            Evidence
            {phase !== "idle" && <span className="text-approve ml-auto">&#10003;</span>}
          </div>
        </div>
        <div className="pl-6 border-l-2 border-line">
          <EvidencePanel
            scenario={scenario}
            visibleFields={visibleFields}
            traceTarget={traceTarget}
            highlightSet={highlightSet}
            onFieldClick={handleFieldClick}
            isComplete={isComplete}
          />
        </div>

        <div className="rounded-lg border border-line bg-bg px-4 py-2">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-soft">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold">
              2
            </span>
            Rules
            {(phase === "rules" || phase === "verdict" || phase === "auditing" || phase === "complete") && (
              <span className="text-approve ml-auto">&#10003;</span>
            )}
          </div>
        </div>
        <div className="pl-6 border-l-2 border-line">
          <RulesPanel
            scenario={scenario}
            visibleRules={visibleRules}
            traceTarget={traceTarget}
            highlightSet={highlightSet}
            onRuleClick={handleRuleClick}
            isComplete={isComplete}
          />
        </div>

        <div className="rounded-lg border border-line bg-bg px-4 py-2">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-soft">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold">
              3
            </span>
            Decision
            {(phase === "auditing" || phase === "complete") && (
              <span className="text-approve ml-auto">&#10003;</span>
            )}
          </div>
        </div>
        <div className="pl-6 border-l-2 border-line">
          <DecisionPanel
            scenario={scenario}
            phase={phase}
            visibleAudit={visibleAudit}
            traceTarget={traceTarget}
            highlightSet={highlightSet}
            onVerdictClick={handleVerdictClick}
            onClearTrace={handleClearTrace}
            hasCompletedOnce={hasCompletedOnce}
          />
        </div>
      </div>

      <p className="text-[11px] text-ink-soft/60 leading-relaxed max-w-2xl mx-auto text-center font-sans">
        Nothing here is generative. Field extraction is grounded to source lines in the original document.
        The rule logic is the client&apos;s own and unedited by GroundSet. The only thing authored for this demo
        is the animation.
      </p>

      {isComplete && <CounterfactualSliders scenario={scenario} />}
    </div>
  );
}
