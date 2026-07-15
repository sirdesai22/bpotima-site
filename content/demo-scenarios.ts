export interface ExtractedField {
  id: string;
  label: string;
  value: string | number | boolean;
  sourceLine: number;
}

export interface Rule {
  id: string;
  label: string;
  condition: string;
  passed: boolean;
  dependsOn: string[];
}

export interface AuditEntry {
  timestamp: string;
  event: string;
  hash: string;
}

export interface Scenario {
  id: string;
  name: string;
  vertical: string;
  evidenceText: string;
  fields: ExtractedField[];
  rules: Rule[];
  verdict: "approve" | "escalate" | "reject";
  reasoning: string;
  auditLog: AuditEntry[];
}

const msme: Scenario = {
  id: "msme-credit",
  name: "MSME Credit Decision",
  vertical: "Financial Services",
  evidenceText: [
    "BUSINESS LOAN APPLICATION — ABC TRADING",
    "Business Type: Sole Proprietorship",
    "Monthly Revenue (Avg, Last 12 Months): $8,500",
    "Existing Debt: $2,100 (Microfinance Corp)",
    "Years in Operation: 4",
    "ID Verification: PASS (National ID #XXXX-XXXX-XXXX)",
    "Business Address: 123 Orchard Road, Singapore",
    "Reference: Trade Credit from Supplier A — $0 outstanding",
    "Notes: Owner reports seasonal dip during monsoon months",
  ].join("\n"),
  fields: [
    {
      id: "monthly-revenue",
      label: "Monthly Revenue",
      value: 8500,
      sourceLine: 2,
    },
    {
      id: "existing-debt",
      label: "Existing Debt",
      value: 2100,
      sourceLine: 3,
    },
    {
      id: "years-trading",
      label: "Years Trading",
      value: 4,
      sourceLine: 4,
    },
    {
      id: "id-verified",
      label: "ID Verification",
      value: "PASS",
      sourceLine: 5,
    },
  ],
  rules: [
    {
      id: "rule-revenue",
      label: "Monthly Revenue ≥ $5,000",
      condition: "Monthly revenue must be at least $5,000 to qualify for standard underwriting.",
      passed: true,
      dependsOn: ["monthly-revenue"],
    },
    {
      id: "rule-dti",
      label: "Debt-to-Income ≤ 40%",
      condition:
        "Existing debt ($2,100) ÷ Monthly revenue ($8,500) = 24.7%. Must be ≤ 40%.",
      passed: true,
      dependsOn: ["monthly-revenue", "existing-debt"],
    },
    {
      id: "rule-tenure",
      label: "Years Trading ≥ 3",
      condition:
        "Business must have at least 3 years of operating history.",
      passed: true,
      dependsOn: ["years-trading"],
    },
    {
      id: "rule-id",
      label: "ID Verification = PASS",
      condition: "Valid government-issued ID must be on file and verified.",
      passed: true,
      dependsOn: ["id-verified"],
    },
  ],
  verdict: "approve",
  reasoning:
    "All four underwriting criteria met. Monthly revenue of $8,500 exceeds the $5,000 minimum threshold. Debt-to-income ratio of 24.7% is well within the 40% limit. Business has 4 years of operating history (minimum 3 required). Identity verified. Standard terms apply.",
  auditLog: [
    {
      timestamp: "2026-07-15T09:23:11Z",
      event: "Application received via API",
      hash: "a3f2c8e1",
    },
    {
      timestamp: "2026-07-15T09:23:14Z",
      event: "Document ingestion complete (1 PDF, 1 image)",
      hash: "b7d4e9f2",
    },
    {
      timestamp: "2026-07-15T09:23:18Z",
      event: "Groundset-Vision: 4 fields extracted",
      hash: "c1e5f8a3",
    },
    {
      timestamp: "2026-07-15T09:23:19Z",
      event: "Rule 1 (Min Revenue): PASS",
      hash: "d9f2a6b4",
    },
    {
      timestamp: "2026-07-15T09:23:19Z",
      event: "Rule 2 (Debt-to-Income): PASS",
      hash: "e4b7c9d5",
    },
    {
      timestamp: "2026-07-15T09:23:19Z",
      event: "Rule 3 (Tenure): PASS",
      hash: "f8a3d1e6",
    },
    {
      timestamp: "2026-07-15T09:23:19Z",
      event: "Rule 4 (ID Verification): PASS",
      hash: "a1c4f7b2",
    },
    {
      timestamp: "2026-07-15T09:23:21Z",
      event: "Decision: APPROVE — auto-routed to disbursement queue",
      hash: "d3e6f9c4",
    },
    {
      timestamp: "2026-07-15T09:23:22Z",
      event: "Audit record sealed to ledger",
      hash: "f5a8b2d7",
    },
  ],
};

const healthcare: Scenario = {
  id: "healthcare-pa",
  name: "Healthcare Prior Authorization",
  vertical: "Healthcare",
  evidenceText: [
    "PRIOR AUTHORIZATION REQUEST — Orthopedic Surgery",
    "Member ID: MEM-88472 | Plan: PPO Gold",
    "Referring Provider: Dr. S. Lim (Orthopedic Associates) — In-Network",
    "Diagnosis Code: M54.5 — Low back pain",
    "Requested Procedure: 63030 — Arthroscopic lumbar discectomy",
    "Prior Conservative Treatment: 12 weeks (physical therapy, NSAIDs)",
    "Patient History: No prior lumbar surgery | BMI: 27 | Non-smoker",
    "Clinical Notes: MRI shows L4-L5 disc herniation with nerve root compression",
    "Additional Notes: Patient failed conservative management — persistent radicular pain",
  ].join("\n"),
  fields: [
    {
      id: "diagnosis-code",
      label: "Diagnosis Code",
      value: "M54.5",
      sourceLine: 3,
    },
    {
      id: "requested-procedure",
      label: "Requested Procedure",
      value: "63030 — Arthroscopic lumbar discectomy",
      sourceLine: 4,
    },
    {
      id: "prior-treatment-weeks",
      label: "Prior Conservative Treatment",
      value: 12,
      sourceLine: 5,
    },
    {
      id: "in-network",
      label: "In-Network Provider",
      value: true,
      sourceLine: 2,
    },
  ],
  rules: [
    {
      id: "rule-conservative-care",
      label: "Prior Conservative Treatment ≥ 6 weeks",
      condition:
        "Plan requires minimum 6 weeks of documented conservative therapy before surgical procedure.",
      passed: true,
      dependsOn: ["prior-treatment-weeks"],
    },
    {
      id: "rule-in-network",
      label: "In-Network Provider = true",
      condition:
        "Procedure must be performed by an in-network provider for standard coverage.",
      passed: true,
      dependsOn: ["in-network"],
    },
    {
      id: "rule-auth-required",
      label: "Diagnosis Requires Prior Authorization",
      condition:
        "Diagnosis code M54.5 maps to a procedure that requires prior authorization per plan policy.",
      passed: true,
      dependsOn: ["diagnosis-code", "requested-procedure"],
    },
  ],
  verdict: "approve",
  reasoning:
    "Prior authorization criteria satisfied. Patient completed 12 weeks of conservative therapy (≥ 6 weeks required). Provider is in-network. Diagnosis code M54.5 maps to an approved procedure with standard coverage. Medical necessity supported by MRI findings and failed conservative management. Auto-approved per plan policy.",
  auditLog: [
    {
      timestamp: "2026-07-15T10:15:42Z",
      event: "PA request received via provider portal",
      hash: "g7h2j4k1",
    },
    {
      timestamp: "2026-07-15T10:15:45Z",
      event: "Document ingestion: referral letter + clinical notes + MRI report",
      hash: "l8m3n5o2",
    },
    {
      timestamp: "2026-07-15T10:15:49Z",
      event: "Groundset-Vision: 4 fields extracted",
      hash: "p9q4r6s3",
    },
    {
      timestamp: "2026-07-15T10:15:50Z",
      event: "Rule 1 (Conservative Care ≥ 6 wks): PASS",
      hash: "t1u5v7w4",
    },
    {
      timestamp: "2026-07-15T10:15:50Z",
      event: "Rule 2 (In-Network Provider): PASS",
      hash: "x2y6z8a5",
    },
    {
      timestamp: "2026-07-15T10:15:50Z",
      event: "Rule 3 (Prior Auth Required): PASS",
      hash: "b3c7d9e6",
    },
    {
      timestamp: "2026-07-15T10:15:52Z",
      event: "Decision: APPROVE — auto-notified provider and member",
      hash: "f4g8h1i7",
    },
    {
      timestamp: "2026-07-15T10:15:53Z",
      event: "Audit record sealed to ledger",
      hash: "j5k9l2m8",
    },
  ],
};

export const scenarios: Scenario[] = [msme, healthcare];

export function getScenario(id: string): Scenario {
  return scenarios.find((s) => s.id === id) || scenarios[0];
}
