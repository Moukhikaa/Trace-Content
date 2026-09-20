import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, AlertTriangle, Fingerprint } from 'lucide-react';
import type { EvidenceItem, ClaimStatus, EvidenceSummary, ExtractedEntity } from '@/types';

const statusConfig: Record<ClaimStatus, { icon: typeof CheckCircle2; color: string }> = {
  SUPPORTED: { icon: CheckCircle2, color: '#10b981' },
  CONTRADICTED: { icon: XCircle, color: '#ef4444' },
  UNVERIFIED: { icon: HelpCircle, color: '#f59e0b' },
  CONTEXT_MISSING: { icon: AlertTriangle, color: '#06b6d4' },
};

const levelConfig: Record<string, { label: string; color: string }> = {
  verified: { label: 'VERIFIED', color: '#10b981' },
  detected: { label: 'DETECTED', color: '#06b6d4' },
  probable: { label: 'PROBABLE', color: '#6366f1' },
  unavailable: { label: 'UNAVAILABLE', color: '#8b8d97' },
  assumption: { label: 'ASSUMPTION', color: '#f59e0b' },
};

interface EvidencePanelProps {
  evidence: EvidenceItem[];
  summary: EvidenceSummary;
  entities: ExtractedEntity[];
  fingerprint: {
    textHash: string;
    visualHash: string;
    perceptualHash: string;
    algorithm: string;
  };
}

const summaryIconMap = {
  check: { icon: CheckCircle2, color: '#10b981' },
  warning: { icon: AlertTriangle, color: '#f59e0b' },
  question: { icon: HelpCircle, color: '#06b6d4' },
};

export function EvidencePanel({ evidence, summary, entities, fingerprint }: EvidencePanelProps) {
  return (
    <div className="space-y-6">
      {/* Evidence items */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Evidence Items</h3>
        <div className="space-y-3">
          {evidence.map((item, i) => {
            const sConfig = statusConfig[item.status];
            const lConfig = levelConfig[item.evidenceLevel] || levelConfig.detected;
            const SIcon = sConfig.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-start gap-4">
                  <SIcon size={18} style={{ color: sConfig.color }} className="mt-0.5 flex-shrink-0" />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-white">{item.title}</span>
                      <span
                        className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                        style={{ color: lConfig.color, backgroundColor: `${lConfig.color}15` }}
                      >
                        {lConfig.label}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{item.description}</p>

                    {item.details && (
                      <div className="space-y-1">
                        {Object.entries(item.details).map(([key, value]) => (
                          <div key={key} className="flex items-start gap-2 text-xs">
                            <span className="text-gray-600 min-w-[120px]">{key}:</span>
                            <span className="text-gray-400 font-mono">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fingerprint */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Fingerprint size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-gray-300">Content Fingerprint</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-600 min-w-[100px]">Text Hash:</span>
            <span className="text-gray-400 font-mono break-all">{fingerprint.textHash}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-600 min-w-[100px]">Visual Hash:</span>
            <span className="text-gray-400 font-mono break-all">{fingerprint.visualHash}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-600 min-w-[100px]">Perceptual:</span>
            <span className="text-gray-400 font-mono break-all">{fingerprint.perceptualHash}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-600 min-w-[100px]">Algorithm:</span>
            <span className="text-gray-400">{fingerprint.algorithm}</span>
          </div>
        </div>
      </motion.div>

      {/* Entities */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Extracted Entities</h3>
        <div className="flex flex-wrap gap-2">
          {entities.map((entity) => (
            <div
              key={entity.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-light"
            >
              <span className="text-[10px] text-gray-600 uppercase tracking-wide">{entity.type}</span>
              <span className="text-xs text-gray-300 font-mono">{entity.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Evidence Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-xl p-5 border-blue-500/10"
      >
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Evidence Summary</h3>
        <div className="space-y-2 mb-4">
          {summary.findings.map((finding, i) => {
            const config = summaryIconMap[finding.icon];
            const Icon = config.icon;
            return (
              <div key={i} className="flex items-start gap-3">
                <Icon size={16} style={{ color: config.color }} className="mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-400">{finding.text}</span>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-2">CONCLUSION</div>
          <p className="text-sm text-gray-300 leading-relaxed">{summary.conclusion}</p>
        </div>
      </motion.div>
    </div>
  );
}
