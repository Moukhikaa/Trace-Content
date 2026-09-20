import { motion } from 'framer-motion';
import { Printer, FileDown, Fingerprint } from 'lucide-react';
import type { InvestigationResult } from '@/types';

interface ReportPageProps {
  result: InvestigationResult;
}

export function ReportPage({ result }: ReportPageProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Action bar */}
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-2xl font-bold mb-1">Investigation Report</h1>
            <p className="text-sm text-gray-500">Printable forensic report</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 glass-light px-5 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
            >
              <Printer size={16} />
              Print
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <FileDown size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Report content */}
        <div className="glass rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Fingerprint size={20} className="text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">TRACE</div>
                <div className="text-xs text-gray-500">Content Provenance & Forensic Reconstruction</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 font-mono">{result.run.id}</div>
              <div className="text-xs text-gray-500">{new Date(result.run.date).toLocaleString()}</div>
            </div>
          </div>

          {/* Input info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Investigation Input</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">File Name:</span>{' '}
                <span className="text-gray-300 font-mono">{result.run.inputName}</span>
              </div>
              <div>
                <span className="text-gray-600">Content Type:</span>{' '}
                <span className="text-gray-300">{result.run.inputType}</span>
              </div>
              <div>
                <span className="text-gray-600">Text Hash:</span>{' '}
                <span className="text-gray-300 font-mono text-xs">{result.fingerprint.textHash}</span>
              </div>
              <div>
                <span className="text-gray-600">Algorithm:</span>{' '}
                <span className="text-gray-300">{result.fingerprint.algorithm}</span>
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Related Versions', value: result.run.versionsFound },
                { label: 'Strongest Match', value: `${result.run.strongestRelationship}%` },
                { label: 'Changes Detected', value: result.run.changesDetected },
                { label: 'Claims Analyzed', value: result.run.claimsAnalyzed },
                { label: 'Context Discrepancies', value: result.run.contextDiscrepancies },
              ].map((stat) => (
                <div key={stat.label} className="glass-light rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-400">{stat.value}</div>
                  <div className="text-[10px] text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Timeline</h3>
            <div className="space-y-2">
              {result.timeline.map((item) => (
                <div key={item.id} className="flex gap-4 text-sm border-l-2 border-blue-500/20 pl-4 pb-3">
                  <div className="text-xs text-gray-500 font-mono w-24 flex-shrink-0">{item.date}</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-200">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Changes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Detected Changes</h3>
            <div className="space-y-2">
              {result.changes.map((change) => (
                <div key={change.id} className="flex items-start gap-3 text-sm">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-400">
                    {change.category}
                  </span>
                  <div className="flex-1">
                    <span className="text-gray-300">{change.field}: </span>
                    <span className="text-gray-500">{change.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Claims */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Claims Analysis</h3>
            <div className="space-y-3">
              {result.claims.map((claim) => (
                <div key={claim.id} className="glass-light rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-400">
                      {claim.status}
                    </span>
                    <span className="text-xs text-gray-600">{Math.round(claim.confidence * 100)}% confidence</span>
                  </div>
                  <p className="text-sm text-gray-200 italic mb-1">"{claim.text}"</p>
                  <p className="text-xs text-gray-500">{claim.evidence}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence summary */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Evidence Summary</h3>
            <div className="space-y-1.5 mb-4">
              {result.summary.findings.map((finding, i) => (
                <div key={i} className="text-sm text-gray-400">
                  {finding.icon === 'check' && '✓ '}
                  {finding.icon === 'warning' && '⚠ '}
                  {finding.icon === 'question' && '? '}
                  {finding.text}
                </div>
              ))}
            </div>
            <div className="glass-light rounded-lg p-4">
              <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-2">CONCLUSION</div>
              <p className="text-sm text-gray-300 leading-relaxed">{result.summary.conclusion}</p>
            </div>
          </div>

          {/* Limitations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Limitations</h3>
            <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
              <li>Analysis is based on available evidence and may not capture all content versions.</li>
              <li>Chronological ordering represents probable relationships, not confirmed causality.</li>
              <li>External source verification requires internet access and may be unavailable in demo mode.</li>
              <li>Visual similarity scores are approximate and based on perceptual hashing.</li>
            </ul>
          </div>

          <div className="text-center text-xs text-gray-600 pt-4 border-t border-white/5">
            Generated by TRACE · Content Provenance & Forensic Reconstruction Platform
          </div>
        </div>
      </motion.div>
    </div>
  );
}
