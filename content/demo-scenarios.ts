export interface EvidenceLine {
  text: string;
  highlight: boolean;
  sourceLine: number;
}

export interface ExtractedField {
  label: string;
  value: string;
  sourceLine: number;
  dependsOn: number[];
}

export interface Rule {
  id: string;
  condition: string;
  display: string;
  passed: boolean;
  dependsOn: string[];
}

export interface AuditEntry {
  timestamp: string;
  event: string;
  hash: string;
}

export interface CounterfactualConfig {
  fieldLabel: string;
  fieldDefault: number;
  fieldUnit: string;
  fieldRange: [number, number];
  fieldStep: number;
  thresholdLabel: string;
  thresholdDefault: number;
  thresholdUnit: string;
  thresholdRange: [number, number];
  thresholdStep: number;
  ruleId: string;
  owner: string;
  comparator: "lt" | "gt" | "lte" | "gte";
}

export interface ScenarioData {
  id: string;
  name: string;
  description: string;
  document: EvidenceLine[];
  extractedFields: ExtractedField[];
  rules: Rule[];
  verdict: {
    status: "approve" | "escalate" | "reject";
    reasoning: string;
    dependsOn: string[];
  };
  auditLog: AuditEntry[];
  counterfactual: CounterfactualConfig;
}

const approvalRules = [
  { condition: "document_verified", label: "Source document is authentic and unmodified" },
  { condition: "coverage_active", label: "Policy coverage was active on the claim date" },
  { condition: "amount_within_tier", label: "Claim amount is within automatic approval tier" },
  { condition: "no_prior_flags", label: "No prior flags on this policyholder" },
  { condition: "exclusion_check", label: "No exclusion clauses match the claim type" },
];

export const scenarios: ScenarioData[] = [
  {
    id: "insurance-claim",
    name: "Insurance Claim Review",
    description: "Auto claim — policyholder files for collision damage.",
    document: [
      { text: "CLAIM REPORT — BP-2407-1832", highlight: false, sourceLine: 1 },
      { text: "Policyholder: James K. Morton", highlight: true, sourceLine: 2 },
      { text: "Policy: AUTO-PLATINUM-8821", highlight: true, sourceLine: 3 },
      { text: "Date of incident: 2024-07-12", highlight: true, sourceLine: 4 },
      { text: "Location: Portland, OR (milepost 23, I-84 W)", highlight: false, sourceLine: 5 },
      { text: "Description: Rear-end collision at traffic signal.", highlight: false, sourceLine: 6 },
      { text: "Third-party vehicle: 2022 Toyota Camry, OR-LIC-7FKD291", highlight: false, sourceLine: 7 },
      { text: "Estimated damage: $3,420.00", highlight: true, sourceLine: 8 },
      { text: "Police report: PR-2024-0712-443 (on file)", highlight: false, sourceLine: 9 },
      { text: "Policyholder at fault: No (third-party cited)", highlight: true, sourceLine: 10 },
      { text: "Coverage active: Yes (paid through 2025-03-15)", highlight: true, sourceLine: 11 },
      { text: "Prior claims: None on this policy", highlight: false, sourceLine: 12 },
      { text: "Exclusion review: No exclusion clauses triggered", highlight: false, sourceLine: 13 },
      { text: "SUBMITTED: 2024-07-14 by adjuster K. Chen", highlight: false, sourceLine: 14 },
    ],
    extractedFields: [
      { label: "Policyholder", value: "James K. Morton", sourceLine: 2, dependsOn: [2] },
      { label: "Policy", value: "AUTO-PLATINUM-8821", sourceLine: 3, dependsOn: [3] },
      { label: "Incident date", value: "2024-07-12", sourceLine: 4, dependsOn: [4] },
      { label: "Estimated damage", value: "$3,420.00", sourceLine: 8, dependsOn: [8] },
      { label: "At fault", value: "No", sourceLine: 10, dependsOn: [10] },
      { label: "Coverage active", value: "Yes", sourceLine: 11, dependsOn: [11] },
    ],
    rules: [
      { id: "R1", condition: "document_verified", display: "Source document authentic and unmodified", passed: true, dependsOn: ["Policyholder", "Policy"] },
      { id: "R2", condition: "coverage_active", display: "Policy coverage active on 2024-07-12", passed: true, dependsOn: ["Policy", "Incident date"] },
      { id: "R3", condition: "amount_within_tier", display: "Claim amount \u2264 $5,000 auto-approval tier  \u2192  $3,420.00", passed: true, dependsOn: ["Estimated damage"] },
      { id: "R4", condition: "no_prior_flags", display: "No prior claims on this policyholder", passed: true, dependsOn: ["Policyholder"] },
      { id: "R5", condition: "exclusion_check", display: "No exclusion clauses triggered by this claim", passed: true, dependsOn: ["Policyholder", "Incident date"] },
    ],
    verdict: {
      status: "approve",
      reasoning:
        "All five rules passed. The claim is within the automatic approval tier, coverage is active, and no flags or exclusions apply. Approve for payment of $3,420.00.",
      dependsOn: ["R1", "R2", "R3", "R4", "R5"],
    },
    auditLog: [
      { timestamp: "2024-07-14T09:13:22Z", event: "Document received — BP-2407-1832", hash: "a3f2c8e1b7d9045a" },
      { timestamp: "2024-07-14T09:13:24Z", event: "Extraction complete — 6 fields identified", hash: "e7c3d91f2a6b8045" },
      { timestamp: "2024-07-14T09:13:25Z", event: "R1: document_verified → PASS", hash: "b4a1d8e3f27c9056" },
      { timestamp: "2024-07-14T09:13:26Z", event: "R2: coverage_active → PASS", hash: "d9f2e7c1a3b80564" },
      { timestamp: "2024-07-14T09:13:26Z", event: "R3: amount_within_tier → PASS", hash: "c1e4f7a2d8b30965" },
      { timestamp: "2024-07-14T09:13:27Z", event: "R4: no_prior_flags → PASS", hash: "f3a6b9c2e7d10487" },
      { timestamp: "2024-07-14T09:13:27Z", event: "R5: exclusion_check → PASS", hash: "e8b2d5f1a4c70963" },
      { timestamp: "2024-07-14T09:13:28Z", event: "All rules passed — routing to approval", hash: "a7d3e1f8b2c60594" },
      { timestamp: "2024-07-14T09:13:29Z", event: "Decision: APPROVE — $3,420.00", hash: "b9c4f7e2a1d80365" },
      { timestamp: "2024-07-14T09:13:30Z", event: "Audit record sealed — hash chain complete", hash: "d2e5f8a3b6c10479" },
    ],
    counterfactual: {
      fieldLabel: "Estimated damage",
      fieldDefault: 3420,
      fieldUnit: "$",
      fieldRange: [1000, 8000],
      fieldStep: 100,
      thresholdLabel: "Auto-approval tier limit",
      thresholdDefault: 5000,
      thresholdUnit: "$",
      thresholdRange: [2000, 8000],
      thresholdStep: 100,
      ruleId: "R3",
      owner: "Meridian Mutual Insurance Co.",
      comparator: "lt",
    },
  },
  {
    id: "sme-credit",
    name: "SME Credit Line",
    description: "Small business credit line application — $75,000 limit.",
    document: [
      { text: "CREDIT APPLICATION — SME-2024-0551", highlight: false, sourceLine: 1 },
      { text: "Applicant: North Coast Roasters LLC", highlight: true, sourceLine: 2 },
      { text: "Entity type: LLC (registered 2019)", highlight: false, sourceLine: 3 },
      { text: "Requested limit: $75,000", highlight: true, sourceLine: 4 },
      { text: "Annual revenue (declared): $420,000", highlight: true, sourceLine: 5 },
      { text: "Years in operation: 5", highlight: false, sourceLine: 6 },
      { text: "Credit score (business): 718", highlight: true, sourceLine: 7 },
      { text: "Debt-to-income ratio: 0.31", highlight: true, sourceLine: 8 },
      { text: "Industry: Food & Beverage (NAICS 722515)", highlight: false, sourceLine: 9 },
      { text: "Collateral offered: Equipment valued at $90,000", highlight: true, sourceLine: 10 },
      { text: "Previous credit line: None with this institution", highlight: false, sourceLine: 11 },
      { text: "Principal: S. Marino — SSN verified", highlight: false, sourceLine: 12 },
      { text: "Review note: Applicant meets all tier-2 criteria", highlight: false, sourceLine: 13 },
      { text: "Flag: Revenue documentation requires verification", highlight: true, sourceLine: 14 },
      { text: "SUBMITTED: 2024-08-02 by officer M. Reyes", highlight: false, sourceLine: 15 },
    ],
    extractedFields: [
      { label: "Applicant", value: "North Coast Roasters LLC", sourceLine: 2, dependsOn: [2] },
      { label: "Requested limit", value: "$75,000", sourceLine: 4, dependsOn: [4] },
      { label: "Annual revenue", value: "$420,000", sourceLine: 5, dependsOn: [5] },
      { label: "Credit score", value: "718", sourceLine: 7, dependsOn: [7] },
      { label: "DTI ratio", value: "0.31", sourceLine: 8, dependsOn: [8] },
      { label: "Collateral", value: "$90,000 equipment", sourceLine: 10, dependsOn: [10] },
      { label: "Flag", value: "Revenue docs need verification", sourceLine: 14, dependsOn: [14] },
    ],
    rules: [
      { id: "R1", condition: "entity_verified", display: "Registered LLC matches applicant name  \u2192  North Coast Roasters LLC", passed: true, dependsOn: ["Applicant"] },
      { id: "R2", condition: "min_revenue_threshold", display: "Annual revenue \u2265 $250,000 minimum  \u2192  $420,000", passed: true, dependsOn: ["Annual revenue"] },
      { id: "R3", condition: "credit_score_minimum", display: "Business credit score \u2265 650  \u2192  718", passed: true, dependsOn: ["Credit score"] },
      { id: "R4", condition: "dti_within_range", display: "Debt-to-income ratio \u2264 0.40  \u2192  0.31", passed: true, dependsOn: ["DTI ratio"] },
      { id: "R5", condition: "collateral_sufficient", display: "Collateral value \u2265 $75,000 requested limit  \u2192  $90,000", passed: true, dependsOn: ["Collateral"] },
      { id: "R6", condition: "revenue_docs_verified", display: "Revenue documentation on file and verifiable", passed: false, dependsOn: ["Flag", "Annual revenue"] },
    ],
    verdict: {
      status: "escalate",
      reasoning:
        "Five of six rules passed. The application meets credit and collateral requirements, but R6 flagged: the declared revenue of $420,000 requires documentation verification before the file can proceed to approval. Escalate to underwriting for review of provided financial statements.",
      dependsOn: ["R1", "R2", "R3", "R4", "R5", "R6"],
    },
    auditLog: [
      { timestamp: "2024-08-02T14:22:10Z", event: "Application received — SME-2024-0551", hash: "b8d2f4a1c7e90356" },
      { timestamp: "2024-08-02T14:22:12Z", event: "Extraction complete — 7 fields identified", hash: "e1a4c7f2d8b50963" },
      { timestamp: "2024-08-02T14:22:14Z", event: "R1: entity_verified → PASS", hash: "c3f6a9d2e7b10485" },
      { timestamp: "2024-08-02T14:22:14Z", event: "R2: min_revenue_threshold → PASS", hash: "a5d8e1b4f7c20963" },
      { timestamp: "2024-08-02T14:22:15Z", event: "R3: credit_score_minimum → PASS", hash: "f2b5e8a1d4c70963" },
      { timestamp: "2024-08-02T14:22:15Z", event: "R4: dti_within_range → PASS", hash: "d7e2a5f8b1c40963" },
      { timestamp: "2024-08-02T14:22:16Z", event: "R5: collateral_sufficient → PASS", hash: "e9c2f5a8d1b70463" },
      { timestamp: "2024-08-02T14:22:16Z", event: "R6: revenue_docs_verified → FLAG", hash: "b3d6e9a2f5c10874" },
      { timestamp: "2024-08-02T14:22:17Z", event: "R6 flagged — routing to escalation", hash: "a1f4e7b2d8c50963" },
      { timestamp: "2024-08-02T14:22:18Z", event: "Decision: ESCALATE — underwriting review", hash: "c8e1d4a7f2b60953" },
      { timestamp: "2024-08-02T14:22:20Z", event: "Audit record sealed — hash chain complete", hash: "f5a8d2e7b1c40369" },
    ],
    counterfactual: {
      fieldLabel: "Credit score",
      fieldDefault: 718,
      fieldUnit: "",
      fieldRange: [550, 800],
      fieldStep: 10,
      thresholdLabel: "Minimum credit score",
      thresholdDefault: 650,
      thresholdUnit: "",
      thresholdRange: [550, 750],
      thresholdStep: 10,
      ruleId: "R3",
      owner: "Pacific Meridian Credit Union",
      comparator: "gte",
    },
  },
];
