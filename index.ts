export type ContentType = 'pdf' | 'image' | 'screenshot' | 'text' | 'url' | 'document';

export type TransformationType =
  | 'original'
  | 'edited'
  | 'cropped'
  | 'screenshot'
  | 'reposted'
  | 'translated'
  | 'current';

export type ClaimStatus = 'SUPPORTED' | 'CONTRADICTED' | 'UNVERIFIED' | 'CONTEXT_MISSING';

export type EvidenceLevel = 'verified' | 'detected' | 'probable' | 'unavailable' | 'assumption';

export type ChangeCategory = 'ADDED' | 'REMOVED' | 'MODIFIED' | 'MOVED' | 'UNCHANGED';

export type SimilarityLabel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH';

export interface ContentVersion {
  id: string;
  label: string;
  timestamp: string;
  contentType: ContentType;
  source: string;
  sourceType: 'demo' | 'real' | 'uploaded';
  transformation: TransformationType;
  contentText: string;
  metadata: {
    fileName?: string;
    fileSize?: string;
    mimeType?: string;
    dimensions?: string;
    createdDate?: string;
    modifiedDate?: string;
    exif?: string;
  };
  similarity?: {
    visual: number;
    text: number;
    semantic: number;
    entity: number;
    composite: number;
    label: SimilarityLabel;
  };
  changes?: ContentChange[];
  evidence?: EvidenceItem[];
  isCurrent?: boolean;
}

export interface ContentChange {
  id: string;
  category: ChangeCategory;
  field: string;
  oldValue?: string;
  newValue?: string;
  description: string;
  evidenceLevel: EvidenceLevel;
}

export interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  evidence: string;
  supportingEvidence?: string;
  contradictingEvidence?: string;
  source?: string;
  confidence: number;
}

export interface EvidenceItem {
  id: string;
  title: string;
  status: ClaimStatus;
  description: string;
  evidenceLevel: EvidenceLevel;
  details?: Record<string, string>;
}

export interface ProvenanceNode {
  id: string;
  label: string;
  type: TransformationType;
  timestamp: string;
  isCurrent?: boolean;
}

export interface ProvenanceEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  relationship: string;
}

export interface ProvenanceGraph {
  nodes: ProvenanceNode[];
  edges: ProvenanceEdge[];
}

export interface TimelineItem {
  id: string;
  date: string;
  type: TransformationType;
  title: string;
  description: string;
  evidence: string;
  confidence: number;
  source: string;
}

export interface AnalysisRun {
  id: string;
  inputName: string;
  inputType: ContentType;
  date: string;
  status: 'completed' | 'running' | 'failed';
  versionsFound: number;
  changesDetected: number;
  claimsAnalyzed: number;
  strongestRelationship: number;
  contextDiscrepancies: number;
}

export interface InvestigationResult {
  id: string;
  run: AnalysisRun;
  versions: ContentVersion[];
  timeline: TimelineItem[];
  provenanceGraph: ProvenanceGraph;
  claims: Claim[];
  evidence: EvidenceItem[];
  changes: ContentChange[];
  fingerprint: {
    textHash: string;
    visualHash: string;
    perceptualHash: string;
  algorithm: string;
  };
  entities: ExtractedEntity[];
  summary: EvidenceSummary;
}

export interface ExtractedEntity {
  id: string;
  type: 'date' | 'number' | 'organization' | 'person' | 'location' | 'url' | 'title';
  value: string;
  context?: string;
}

export interface EvidenceSummary {
  findings: { icon: 'check' | 'warning' | 'question'; text: string }[];
  conclusion: string;
}

export interface DashboardStats {
  totalInvestigations: number;
  relatedVersionsDiscovered: number;
  claimsAnalyzed: number;
  changesDetected: number;
  evidenceRelationships: number;
  investigationsOverTime: { date: string; count: number }[];
  contentTypeDistribution: { type: string; count: number }[];
  transformationTypes: { type: string; count: number }[];
}
