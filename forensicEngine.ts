import type { ChangeCategory } from '@/types';

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, ' ')
    .trim();
}

export function generateTextHash(text: string): string {
  const normalized = normalizeText(text);
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const full = hex.repeat(4).slice(0, 32);
  return full;
}

export function generatePerceptualHash(seed: string = 'trace'): string {
  const chars = '0123456789abcdef';
  let hash = '';
  let seedNum = 0;
  for (let i = 0; i < seed.length; i++) {
    seedNum = (seedNum << 5) - seedNum + seed.charCodeAt(i);
    seedNum = seedNum & seedNum;
  }
  for (let i = 0; i < 32; i++) {
    seedNum = (seedNum * 1103515245 + 12345) & 0x7fffffff;
    hash += chars[seedNum % 16];
  }
  return hash;
}

export function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter((t) => t.length > 2);
}

export function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  return tf;
}

export function cosineSimilarity(textA: string, textB: string): number {
  const tokensA = tokenize(textA);
  const tokensB = tokenize(textB);
  const tfA = termFrequency(tokensA);
  const tfB = termFrequency(tokensB);

  const allTerms = new Set([...tfA.keys(), ...tfB.keys()]);
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (const term of allTerms) {
    const a = tfA.get(term) || 0;
    const b = tfB.get(term) || 0;
    dotProduct += a * b;
    magA += a * a;
    magB += b * b;
  }

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function jaccardSimilarity(textA: string, textB: string): number {
  const setA = new Set(tokenize(textA));
  const setB = new Set(tokenize(textB));
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

export function labelSimilarity(score: number): 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH' {
  if (score >= 0.9) return 'VERY HIGH';
  if (score >= 0.75) return 'HIGH';
  if (score >= 0.5) return 'MODERATE';
  return 'LOW';
}

export function extractEntities(
  text: string
): { type: string; value: string; context?: string }[] {
  const entities: { type: string; value: string; context?: string }[] = [];

  const dateRegex = /(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})/gi;
  let match;
  while ((match = dateRegex.exec(text)) !== null) {
    entities.push({ type: 'date', value: match[1] });
  }

  const emailRegex = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
  while ((match = emailRegex.exec(text)) !== null) {
    entities.push({ type: 'url', value: match[0], context: 'Email address' });
  }

  const refRegex = /(?:Ref(?:erence)?|NSC|GOVT|GOI)[\/\w]+\/\d+/gi;
  while ((match = refRegex.exec(text)) !== null) {
    entities.push({ type: 'number', value: match[0], context: 'Reference number' });
  }

  const orgRegex = /(?:National|Indian|Government|Ministry|Council|Department|Institute|University|College)[\w\s]*(?:of|for)\s+[\w\s]+/gi;
  while ((match = orgRegex.exec(text)) !== null) {
    entities.push({ type: 'organization', value: match[0].trim() });
  }

  const titleRegex = /(?:STUDENT|SCHOLARSHIP|APPLICATION|NOTICE|CIRCULAR|ADMISSION|EXAMINATION)[\w\s]+(?:NOTICE|CIRCULAR|ANNOUNCEMENT|APPLICATION)/gi;
  while ((match = titleRegex.exec(text)) !== null) {
    entities.push({ type: 'title', value: match[0].trim() });
  }

  return entities;
}

export function detectChanges(
  originalText: string,
  currentText: string
): { category: ChangeCategory; field: string; oldValue?: string; newValue?: string; description: string }[] {
  const changes: { category: ChangeCategory; field: string; oldValue?: string; newValue?: string; description: string }[] = [];

  const dateRegex = /(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})/gi;
  const originalDates: string[] = originalText.match(dateRegex) || [];
  const currentDates: string[] = currentText.match(dateRegex) || [];

  if (originalDates.length > 0 && currentDates.length > 0) {
    for (const origDate of originalDates) {
      if (!currentDates.includes(origDate)) {
        const replacement = currentDates.find((d) => !originalDates.includes(d));
        changes.push({
          category: 'MODIFIED',
          field: 'Date',
          oldValue: origDate,
          newValue: replacement,
          description: `Date changed from "${origDate}" to "${replacement || 'unknown'}"`,
        });
      }
    }
  }

  const originalLines = originalText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const currentLines = currentText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

  for (const line of originalLines) {
    if (!currentLines.some((cl) => cl.includes(line) || line.includes(cl))) {
      if (line.length > 5 && !currentText.includes(line)) {
        changes.push({
          category: 'REMOVED',
          field: 'Content Line',
          oldValue: line,
          description: `Content removed: "${line.substring(0, 80)}${line.length > 80 ? '...' : ''}"`,
        });
      }
    }
  }

  for (const line of currentLines) {
    if (!originalLines.some((ol) => ol.includes(line) || line.includes(ol))) {
      if (line.length > 5 && !originalText.includes(line)) {
        changes.push({
          category: 'ADDED',
          field: 'Content Line',
          newValue: line,
          description: `Content added: "${line.substring(0, 80)}${line.length > 80 ? '...' : ''}"`,
        });
      }
    }
  }

  return changes;
}
