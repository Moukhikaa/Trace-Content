import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import type { Claim, ClaimStatus } from '@/types';

const statusConfig: Record<ClaimStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  SUPPORTED: { icon: CheckCircle2, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', label: 'SUPPORTED' },
  CONTRADICTED: { icon: XCircle, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'CONTRADICTED' },
  UNVERIFIED: { icon: HelpCircle, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', label: 'UNVERIFIED' },
  CONTEXT_MISSING: { icon: AlertTriangle, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', label: 'CONTEXT MISSING' },
};

interface ClaimAnalysisProps {
  claims: Claim[];
}

export function ClaimAnalysis({ claims }: ClaimAnalysisProps) {
  return (
    <div className="space-y-4">
      {claims.map((claim, i) => {
        const config = statusConfig[claim.status];
        const Icon = config.icon;

        return (
          <motion.div
            key={claim.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: config.bg }}
              >
                <Icon size={20} style={{ color: config.color }} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-bold tracking-wider px-2 py-1 rounded"
                    style={{ color: config.color, backgroundColor: config.bg }}
                  >
                    {config.label}
                  </span>
                  <span className="text-xs text-gray-600 font-mono">
                    {Math.round(claim.confidence * 100)}% confidence
                  </span>
                </div>

                <p className="text-sm text-gray-200 mb-3 italic">"{claim.text}"</p>

                <p className="text-xs text-gray-500 leading-relaxed mb-3">{claim.evidence}</p>

                {(claim.supportingEvidence || claim.contradictingEvidence) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {claim.supportingEvidence && (
                      <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                        <div className="text-[10px] text-green-400 font-semibold mb-1">SUPPORTING EVIDENCE</div>
                        <div className="text-xs text-gray-400">{claim.supportingEvidence}</div>
                      </div>
                    )}
                    {claim.contradictingEvidence && (
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                        <div className="text-[10px] text-red-400 font-semibold mb-1">CONTRADICTING EVIDENCE</div>
                        <div className="text-xs text-gray-400">{claim.contradictingEvidence}</div>
                      </div>
                    )}
                  </div>
                )}

                {claim.source && (
                  <div className="mt-3 text-[10px] text-gray-600">
                    Source: <span className="text-gray-500">{claim.source}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
