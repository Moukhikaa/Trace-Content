import type {
  ContentVersion,
  TimelineItem,
  ProvenanceGraph,
  Claim,
  EvidenceItem,
  ContentChange,
  ExtractedEntity,
  EvidenceSummary,
  AnalysisRun,
  InvestigationResult,
  DashboardStats,
} from '@/types';

export const DEMO_ORG = 'National Scholarship Council of India';
export const DEMO_DOC_TITLE = 'Student Scholarship Application Notice 2026';

export const demoVersions: ContentVersion[] = [
  {
    id: 'v1-original',
    label: 'Original Notice',
    timestamp: '2026-08-20',
    contentType: 'document',
    source: 'Official College Notice Board',
    sourceType: 'demo',
    transformation: 'original',
    contentText: `STUDENT SCHOLARSHIP APPLICATION NOTICE 2026

Issued by: National Scholarship Council of India
Reference: NSC/SCH/2026/0142

Eligible students are invited to apply for the Merit Scholarship Programme for the academic year 2026-2027.

Application Deadline: 30 September 2026

Applications must be submitted online through the official scholarship portal. Late applications will not be accepted.

Required documents:
- Mark sheet of previous academic year
- Income certificate
- Aadhaar card
- Passport-size photograph

For queries, contact the scholarship office at scholarship@nsc.edu.in

This is an official notice issued by the National Scholarship Council of India.`,
    metadata: {
      fileName: 'scholarship_notice_original.pdf',
      fileSize: '248 KB',
      mimeType: 'application/pdf',
      createdDate: '2026-08-20T09:00:00Z',
      modifiedDate: '2026-08-20T09:00:00Z',
    },
  },
  {
    id: 'v2-edited',
    label: 'Edited Notice',
    timestamp: '2026-08-24',
    contentType: 'document',
    source: 'Unknown Publisher (Social Media)',
    sourceType: 'demo',
    transformation: 'edited',
    contentText: `STUDENT SCHOLARSHIP APPLICATION NOTICE 2026

Issued by: National Scholarship Council of India
Reference: NSC/SCH/2026/0142

Eligible students are invited to apply for the Merit Scholarship Programme for the academic year 2026-2027.

Application Deadline: 20 September 2026

Applications must be submitted online through the official scholarship portal. Late applications will not be accepted.

Required documents:
- Mark sheet of previous academic year
- Income certificate
- Aadhaar card
- Passport-size photograph

For queries, contact the scholarship office at scholarship@nsc.edu.in

This is an official notice issued by the National Scholarship Council of India.`,
    metadata: {
      fileName: 'scholarship_notice_edited.pdf',
      fileSize: '246 KB',
      mimeType: 'application/pdf',
      createdDate: '2026-08-24T14:30:00Z',
      modifiedDate: '2026-08-24T14:30:00Z',
    },
    similarity: {
      visual: 99,
      text: 99,
      semantic: 98,
      entity: 100,
      composite: 99,
      label: 'VERY HIGH',
    },
    changes: [
      {
        id: 'c1',
        category: 'MODIFIED',
        field: 'Application Deadline',
        oldValue: '30 September 2026',
        newValue: '20 September 2026',
        description: 'Deadline changed from 30 September to 20 September 2026',
        evidenceLevel: 'detected',
      },
    ],
  },
  {
    id: 'v3-cropped',
    label: 'Cropped Screenshot',
    timestamp: '2026-08-25',
    contentType: 'screenshot',
    source: 'WhatsApp Forward',
    sourceType: 'demo',
    transformation: 'cropped',
    contentText: `STUDENT SCHOLARSHIP APPLICATION NOTICE 2026

Issued by: National Scholarship Council of India

Eligible students are invited to apply for the Merit Scholarship Programme for the academic year 2026-2027.

Application Deadline: 20 September 2026

Applications must be submitted online through the official scholarship portal.`,
    metadata: {
      fileName: 'scholarship_cropped.png',
      fileSize: '184 KB',
      mimeType: 'image/png',
      dimensions: '1080 x 1350',
      createdDate: '2026-08-25T10:15:00Z',
    },
    similarity: {
      visual: 87,
      text: 82,
      semantic: 90,
      entity: 95,
      composite: 88,
      label: 'HIGH',
    },
    changes: [
      {
        id: 'c2',
        category: 'REMOVED',
        field: 'Reference Number',
        oldValue: 'NSC/SCH/2026/0142',
        description: 'Reference number removed from cropped version',
        evidenceLevel: 'detected',
      },
      {
        id: 'c3',
        category: 'REMOVED',
        field: 'Contact Information',
        oldValue: 'scholarship@nsc.edu.in',
        description: 'Contact email and document list removed',
        evidenceLevel: 'detected',
      },
    ],
  },
  {
    id: 'v4-reposted',
    label: 'WhatsApp-Style Screenshot',
    timestamp: '2026-08-26',
    contentType: 'screenshot',
    source: 'WhatsApp Forward with Caption',
    sourceType: 'demo',
    transformation: 'reposted',
    contentText: `URGENT! Apply immediately!

STUDENT SCHOLARSHIP APPLICATION NOTICE 2026

Issued by: National Scholarship Council of India

Application Deadline: 20 September 2026

Applications must be submitted online through the official scholarship portal.`,
    metadata: {
      fileName: 'whatsapp_scholarship.jpg',
      fileSize: '92 KB',
      mimeType: 'image/jpeg',
      dimensions: '720 x 1280',
      createdDate: '2026-08-26T18:42:00Z',
    },
    similarity: {
      visual: 78,
      text: 75,
      semantic: 85,
      entity: 90,
      composite: 82,
      label: 'HIGH',
    },
    changes: [
      {
        id: 'c4',
        category: 'ADDED',
        field: 'Caption',
        newValue: 'URGENT! Apply immediately!',
        description: 'Urgency caption added to the reposted screenshot',
        evidenceLevel: 'detected',
      },
      {
        id: 'c5',
        category: 'REMOVED',
        field: 'Programme Details',
        oldValue: 'Merit Scholarship Programme for the academic year 2026-2027',
        description: 'Programme name and academic year partially removed',
        evidenceLevel: 'detected',
      },
    ],
  },
  {
    id: 'v5-current',
    label: 'Current Upload',
    timestamp: '2026-09-20',
    contentType: 'screenshot',
    source: 'User Upload',
    sourceType: 'uploaded',
    transformation: 'current',
    isCurrent: true,
    contentText: `URGENT! Apply immediately!

STUDENT SCHOLARSHIP APPLICATION NOTICE 2026

Issued by: National Scholarship Council of India

Application Deadline: 20 September 2026

Applications must be submitted online through the official scholarship portal.`,
    metadata: {
      fileName: 'uploaded_scholarship_screenshot.jpg',
      fileSize: '88 KB',
      mimeType: 'image/jpeg',
      dimensions: '720 x 1280',
      createdDate: '2026-09-20T12:00:00Z',
    },
    similarity: {
      visual: 97,
      text: 94,
      semantic: 96,
      entity: 91,
      composite: 94,
      label: 'VERY HIGH',
    },
  },
];

export const demoTimeline: TimelineItem[] = [
  {
    id: 't1',
    date: '2026-08-20',
    type: 'original',
    title: 'Original Notice Published',
    description: 'Official scholarship notice published with deadline of 30 September 2026',
    evidence: 'Official source identified as National Scholarship Council of India',
    confidence: 0.98,
    source: 'Official College Notice Board',
  },
  {
    id: 't2',
    date: '2026-08-24',
    type: 'edited',
    title: 'Deadline Modified',
    description: 'Application deadline changed from 30 September to 20 September 2026',
    evidence: '99% text similarity to original; single field modification detected',
    confidence: 0.99,
    source: 'Unknown Publisher (Social Media)',
  },
  {
    id: 't3',
    date: '2026-08-25',
    type: 'cropped',
    title: 'Content Cropped',
    description: 'Reference number, contact details, and document list removed',
    evidence: '87% visual similarity; 82% text similarity; missing sections detected',
    confidence: 0.88,
    source: 'WhatsApp Forward',
  },
  {
    id: 't4',
    date: '2026-08-26',
    type: 'reposted',
    title: 'Urgency Caption Added',
    description: 'Screenshot reposted with "URGENT! Apply immediately!" caption',
    evidence: '78% visual similarity; urgency text added; programme details removed',
    confidence: 0.82,
    source: 'WhatsApp Forward with Caption',
  },
  {
    id: 't5',
    date: '2026-09-20',
    type: 'current',
    title: 'Current Version Uploaded',
    description: 'User uploaded the current screenshot for analysis',
    evidence: '94% composite similarity to Version 4; 97% visual similarity',
    confidence: 0.94,
    source: 'User Upload',
  },
];

export const demoProvenanceGraph: ProvenanceGraph = {
  nodes: [
    { id: 'v1-original', label: 'Original Notice', type: 'original', timestamp: '2026-08-20' },
    { id: 'v2-edited', label: 'Edited Notice', type: 'edited', timestamp: '2026-08-24' },
    { id: 'v3-cropped', label: 'Cropped Screenshot', type: 'cropped', timestamp: '2026-08-25' },
    { id: 'v4-reposted', label: 'WhatsApp Screenshot', type: 'reposted', timestamp: '2026-08-26' },
    { id: 'v5-current', label: 'Current Upload', type: 'current', timestamp: '2026-09-20', isCurrent: true },
  ],
  edges: [
    { id: 'e1', source: 'v1-original', target: 'v2-edited', label: 'Edited', relationship: 'Deadline changed' },
    { id: 'e2', source: 'v2-edited', target: 'v3-cropped', label: 'Cropped', relationship: 'Content removed' },
    { id: 'e3', source: 'v3-cropped', target: 'v4-reposted', label: 'Reposted', relationship: 'Caption added' },
    { id: 'e4', source: 'v4-reposted', target: 'v5-current', label: 'Related', relationship: '94% composite match' },
  ],
};

export const demoClaims: Claim[] = [
  {
    id: 'cl1',
    text: 'Applications close on 20 September 2026.',
    status: 'CONTRADICTED',
    evidence: 'An earlier version of this notice states the deadline as 30 September 2026. The current version shows 20 September.',
    contradictingEvidence: 'Original notice (2026-08-20) states "30 September 2026"',
    supportingEvidence: 'Current version consistently shows "20 September 2026"',
    source: 'Version comparison (v1 vs v5)',
    confidence: 0.99,
  },
  {
    id: 'cl2',
    text: 'This is an official scholarship notice from the National Scholarship Council of India.',
    status: 'UNVERIFIED',
    evidence: 'The organization name matches the original notice, but the current version was sourced from a WhatsApp forward, not an official channel. The original publisher could not be independently verified for this reposted version.',
    supportingEvidence: 'Organization name matches across all versions',
    contradictingEvidence: 'Current version sourced from informal channel, not official source',
    source: 'Source analysis',
    confidence: 0.65,
  },
  {
    id: 'cl3',
    text: 'Students must apply immediately due to urgency.',
    status: 'CONTEXT_MISSING',
    evidence: 'The urgency caption "URGENT! Apply immediately!" was added in a later reposted version and does not appear in the original notice. The original notice does not contain urgency language.',
    contradictingEvidence: 'Urgency caption absent from original; added in Version 4',
    supportingEvidence: 'Current version does contain urgency text',
    source: 'Caption analysis (v1 vs v4)',
    confidence: 0.92,
  },
];

export const demoEvidence: EvidenceItem[] = [
  {
    id: 'ev1',
    title: 'Deadline Discrepancy',
    status: 'CONTRADICTED',
    description: 'The application deadline in the current version (20 September 2026) differs from the earliest discovered version (30 September 2026).',
    evidenceLevel: 'verified',
    details: {
      'Current version': '20 September 2026',
      'Earliest version': '30 September 2026',
      'Relationship': '99% text similarity',
      'Matched version': 'v1-original',
    },
  },
  {
    id: 'ev2',
    title: 'Organization Name Consistency',
    status: 'SUPPORTED',
    description: 'The organization name "National Scholarship Council of India" appears consistently across all discovered versions.',
    evidenceLevel: 'verified',
    details: {
      'Versions checked': '5 of 5',
      'Organization': 'National Scholarship Council of India',
      'Consistency': '100%',
    },
  },
  {
    id: 'ev3',
    title: 'Missing Reference Number',
    status: 'CONTRADICTED',
    description: 'The reference number NSC/SCH/2026/0142 present in the original is absent from the current version.',
    evidenceLevel: 'detected',
    details: {
      'Original reference': 'NSC/SCH/2026/0142',
      'Current version': 'Not present',
      'Removed in': 'Version 3 (cropped)',
    },
  },
  {
    id: 'ev4',
    title: 'Added Urgency Caption',
    status: 'CONTRADICTED',
    description: 'The caption "URGENT! Apply immediately!" does not appear in the original notice and was added in a later reposted version.',
    evidenceLevel: 'detected',
    details: {
      'Original': 'No urgency text',
      'Current': 'URGENT! Apply immediately!',
      'First appeared in': 'Version 4 (2026-08-26)',
    },
  },
  {
    id: 'ev5',
    title: 'Current Publisher Verification',
    status: 'UNVERIFIED',
    description: 'The publisher of the current screenshot could not be independently verified. The content was sourced from an informal forwarding channel.',
    evidenceLevel: 'unavailable',
    details: {
      'Source': 'WhatsApp forward',
      'Official source': 'Not confirmed for this version',
    },
  },
];

export const demoChanges: ContentChange[] = [
  {
    id: 'ch1',
    category: 'MODIFIED',
    field: 'Application Deadline',
    oldValue: '30 September 2026',
    newValue: '20 September 2026',
    description: 'Deadline changed from 30 September to 20 September 2026',
    evidenceLevel: 'detected',
  },
  {
    id: 'ch2',
    category: 'REMOVED',
    field: 'Reference Number',
    oldValue: 'NSC/SCH/2026/0142',
    description: 'Reference number removed from cropped version',
    evidenceLevel: 'detected',
  },
  {
    id: 'ch3',
    category: 'REMOVED',
    field: 'Contact Email',
    oldValue: 'scholarship@nsc.edu.in',
    description: 'Contact email removed from cropped version',
    evidenceLevel: 'detected',
  },
  {
    id: 'ch4',
    category: 'ADDED',
    field: 'Urgency Caption',
    newValue: 'URGENT! Apply immediately!',
    description: 'Urgency caption added in reposted version',
    evidenceLevel: 'detected',
  },
  {
    id: 'ch5',
    category: 'REMOVED',
    field: 'Document List',
    oldValue: 'Mark sheet, Income certificate, Aadhaar card, Photograph',
    description: 'Required documents list removed from cropped version',
    evidenceLevel: 'detected',
  },
];

export const demoEntities: ExtractedEntity[] = [
  { id: 'en1', type: 'organization', value: 'National Scholarship Council of India', context: 'Issuing authority' },
  { id: 'en2', type: 'date', value: '20 September 2026', context: 'Application deadline (current)' },
  { id: 'en3', type: 'date', value: '30 September 2026', context: 'Application deadline (original)' },
  { id: 'en4', type: 'title', value: 'Student Scholarship Application Notice 2026', context: 'Document title' },
  { id: 'en5', type: 'url', value: 'scholarship@nsc.edu.in', context: 'Contact email (removed in current)' },
  { id: 'en6', type: 'number', value: 'NSC/SCH/2026/0142', context: 'Reference number (removed in current)' },
];

export const demoSummary: EvidenceSummary = {
  findings: [
    { icon: 'check', text: 'Related earlier version identified (94% composite similarity)' },
    { icon: 'check', text: 'Strong text similarity across all versions (94%)' },
    { icon: 'check', text: 'Same organization name detected in all versions' },
    { icon: 'warning', text: 'Deadline differs from original (30 Sep vs 20 Sep)' },
    { icon: 'warning', text: 'Important context appears to be missing (reference number, contact details)' },
    { icon: 'warning', text: 'Urgency caption added in later version, absent from original' },
    { icon: 'question', text: 'Current publisher could not be independently verified' },
  ],
  conclusion:
    'Available evidence indicates that the current version differs from an earlier related document. The deadline was modified, contextual information was removed, and an urgency caption was added in later versions. The evidence does not independently establish the intent behind these changes.',
};

export const demoRun: AnalysisRun = {
  id: 'INV-2026-001',
  inputName: 'uploaded_scholarship_screenshot.jpg',
  inputType: 'screenshot',
  date: '2026-09-20T12:00:00Z',
  status: 'completed',
  versionsFound: 4,
  changesDetected: 5,
  claimsAnalyzed: 3,
  strongestRelationship: 94,
  contextDiscrepancies: 2,
};

export const demoFingerprint = {
  textHash: 'a3f7b2c9d1e8f4a6b5c3d2e1f0a9b8c7',
  visualHash: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9',
  perceptualHash: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
  algorithm: 'SHA-256 + pHash (dHash variant)',
};

export const demoInvestigation: InvestigationResult = {
  id: 'INV-2026-001',
  run: demoRun,
  versions: demoVersions,
  timeline: demoTimeline,
  provenanceGraph: demoProvenanceGraph,
  claims: demoClaims,
  evidence: demoEvidence,
  changes: demoChanges,
  fingerprint: demoFingerprint,
  entities: demoEntities,
  summary: demoSummary,
};

export const demoDashboardStats: DashboardStats = {
  totalInvestigations: 12,
  relatedVersionsDiscovered: 47,
  claimsAnalyzed: 38,
  changesDetected: 29,
  evidenceRelationships: 64,
  investigationsOverTime: [
    { date: 'Aug 15', count: 1 },
    { date: 'Aug 18', count: 2 },
    { date: 'Aug 22', count: 3 },
    { date: 'Aug 28', count: 2 },
    { date: 'Sep 02', count: 4 },
    { date: 'Sep 08', count: 3 },
    { date: 'Sep 14', count: 5 },
    { date: 'Sep 20', count: 4 },
  ],
  contentTypeDistribution: [
    { type: 'Screenshot', count: 6 },
    { type: 'Document', count: 3 },
    { type: 'Image', count: 2 },
    { type: 'PDF', count: 1 },
  ],
  transformationTypes: [
    { type: 'Edited', count: 8 },
    { type: 'Cropped', count: 6 },
    { type: 'Reposted', count: 7 },
    { type: 'Original', count: 5 },
    { type: 'Translated', count: 3 },
  ],
};

export const demoInvestigationsList = [
  {
    id: 'INV-2026-001',
    title: 'Scholarship Notice — Deadline Discrepancy',
    date: '2026-09-20',
    type: 'screenshot',
    versions: 4,
    status: 'completed' as const,
  },
  {
    id: 'INV-2026-002',
    title: 'Government Circular — Modified Date',
    date: '2026-09-15',
    type: 'document',
    versions: 3,
    status: 'completed' as const,
  },
  {
    id: 'INV-2026-003',
    title: 'Job Advertisement — Altered Salary',
    date: '2026-09-12',
    type: 'image',
    versions: 5,
    status: 'completed' as const,
  },
  {
    id: 'INV-2026-004',
    title: 'Certificate — Forged Signature',
    date: '2026-09-08',
    type: 'pdf',
    versions: 2,
    status: 'completed' as const,
  },
  {
    id: 'INV-2026-005',
    title: 'Viral Screenshot — Misleading Caption',
    date: '2026-09-05',
    type: 'screenshot',
    versions: 4,
    status: 'completed' as const,
  },
];
