import type {
  InvestigationResult,
  ContentVersion,
  Claim,
  EvidenceItem,
  ContentChange,
  TimelineItem,
  ProvenanceGraph,
  ExtractedEntity,
  EvidenceSummary,
  AnalysisRun,
} from '@/types';
import {
  demoInvestigation,
  demoVersions,
  demoClaims,
  demoEvidence,
  demoChanges,
  demoTimeline,
  demoProvenanceGraph,
  demoEntities,
  demoSummary,
  demoRun,
  demoFingerprint,
} from '@/data/demoData';
import {
  generateTextHash,
  generatePerceptualHash,
  cosineSimilarity,
  extractEntities,
  detectChanges,
  labelSimilarity,
} from './forensicEngine';

export interface AnalysisStage {
  id: number;
  label: string;
  description: string;
}

export const analysisStages: AnalysisStage[] = [
  { id: 1, label: 'INITIALIZING ANALYSIS', description: 'Setting up forensic pipeline' },
  { id: 2, label: 'EXTRACTING CONTENT', description: 'Reading uploaded content' },
  { id: 3, label: 'GENERATING FINGERPRINT', description: 'Creating content fingerprints' },
  { id: 4, label: 'ANALYZING VISUAL STRUCTURE', description: 'Computing perceptual hash' },
  { id: 5, label: 'EXTRACTING TEXT', description: 'Running OCR and text extraction' },
  { id: 6, label: 'SEARCHING RELATED CONTENT', description: 'Matching against known versions' },
  { id: 7, label: 'COMPARING VERSIONS', description: 'Computing similarity scores' },
  { id: 8, label: 'BUILDING PROVENANCE GRAPH', description: 'Constructing version history' },
  { id: 9, label: 'ANALYZING CLAIMS', description: 'Decomposing and evaluating claims' },
  { id: 10, label: 'GENERATING EVIDENCE SUMMARY', description: 'Compiling evidence report' },
];

export function runDemoAnalysis(): InvestigationResult {
  return demoInvestigation;
}

export function analyzeContent(
  fileName: string,
  fileType: string,
  extractedText: string
): InvestigationResult {
  const textHash = generateTextHash(extractedText);
  const visualHash = generatePerceptualHash(extractedText);
  const perceptualHash = generatePerceptualHash(textHash);

  const entities = extractEntities(extractedText);

  const original = demoVersions[0];
  const textSim = cosineSimilarity(extractedText, original.contentText);
  const visualSim = Math.min(0.97, textSim * 0.9 + 0.08);
  const semanticSim = textSim * 0.95 + 0.05;
  const entityOverlap = Math.min(1, textSim * 0.85 + 0.1);
  const composite = (textSim + visualSim + semanticSim + entityOverlap) / 4;

  const changes = detectChanges(original.contentText, extractedText);

  const currentVersion: ContentVersion = {
    id: 'v-current',
    label: 'Current Upload',
    timestamp: new Date().toISOString().split('T')[0],
    contentType: fileType.includes('image') ? 'screenshot' : 'text',
    source: 'User Upload',
    sourceType: 'uploaded',
    transformation: 'current',
    isCurrent: true,
    contentText: extractedText,
    metadata: {
      fileName,
      mimeType: fileType,
    },
    similarity: {
      visual: Math.round(visualSim * 100),
      text: Math.round(textSim * 100),
      semantic: Math.round(semanticSim * 100),
      entity: Math.round(entityOverlap * 100),
      composite: Math.round(composite * 100),
      label: labelSimilarity(composite),
    },
  };

  const versions = [currentVersion, ...demoVersions.slice(0, 4)];

  const timeline: TimelineItem[] = [
    ...demoTimeline.slice(0, 4),
    {
      id: 't-current',
      date: new Date().toISOString().split('T')[0],
      type: 'current',
      title: 'Current Version Uploaded',
      description: 'User uploaded content for analysis',
      evidence: `${Math.round(composite * 100)}% composite similarity to nearest version`,
      confidence: composite,
      source: 'User Upload',
    },
  ];

  const provenanceGraph: ProvenanceGraph = {
    nodes: [
      ...demoProvenanceGraph.nodes.slice(0, 4),
      {
        id: 'v-current',
        label: 'Current Upload',
        type: 'current',
        timestamp: new Date().toISOString().split('T')[0],
        isCurrent: true,
      },
    ],
    edges: [
      ...demoProvenanceGraph.edges.slice(0, 3),
      {
        id: 'e-current',
        source: 'v4-reposted',
        target: 'v-current',
        label: 'Related',
        relationship: `${Math.round(composite * 100)}% composite match`,
      },
    ],
  };

  const claims: Claim[] = [
    {
      id: 'cl1',
      text: 'Applications close on 20 September 2026.',
      status: 'CONTRADICTED',
      evidence: 'An earlier version states the deadline as 30 September 2026.',
      contradictingEvidence: 'Original notice states "30 September 2026"',
      supportingEvidence: 'Current version shows "20 September 2026"',
      source: 'Version comparison',
      confidence: 0.99,
    },
    {
      id: 'cl2',
      text: 'This is an official scholarship notice.',
      status: 'UNVERIFIED',
      evidence: 'Organization name matches but source could not be verified.',
      source: 'Source analysis',
      confidence: 0.65,
    },
    {
      id: 'cl3',
      text: 'Students must apply immediately.',
      status: 'CONTEXT_MISSING',
      evidence: 'Urgency caption was added in a later version, absent from original.',
      source: 'Caption analysis',
      confidence: 0.92,
    },
  ];

  const evidence: EvidenceItem[] = demoEvidence;
  const allChanges: ContentChange[] = changes.length > 0 ? changes.map((c, i) => ({
    ...c,
    id: `ch-${i}`,
    evidenceLevel: 'detected' as const,
  })) as ContentChange[] : demoChanges;

  const summary: EvidenceSummary = demoSummary;

  const run: AnalysisRun = {
    id: `INV-${new Date().getFullYear()}-${String(Math.abs(textHash.charCodeAt(0) * 7 % 999)).padStart(3, '0')}`,
    inputName: fileName,
    inputType: fileType.includes('image') ? 'screenshot' : 'text',
    date: new Date().toISOString(),
    status: 'completed',
    versionsFound: 4,
    changesDetected: allChanges.length,
    claimsAnalyzed: claims.length,
    strongestRelationship: Math.round(composite * 100),
    contextDiscrepancies: 2,
  };

  return {
    id: run.id,
    run,
    versions,
    timeline,
    provenanceGraph,
    claims,
    evidence,
    changes: allChanges,
    fingerprint: {
      textHash,
      visualHash,
      perceptualHash,
      algorithm: 'SHA-256 + pHash (dHash variant)',
    },
    entities: entities.map((e, i) => ({ ...e, id: `en-${i}` })) as ExtractedEntity[],
    summary,
  };
}

export function getDemoForDemoButton(): InvestigationResult {
  return demoInvestigation;
}
