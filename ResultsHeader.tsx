import { motion } from 'framer-motion';
import {
  Clock,
  GitCompareArrows,
  Network,
  FileDown,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Layers,
  FileSearch,
  FileText,
} from 'lucide-react';
import type { InvestigationResult } from '@/types';

interface ResultsHeaderProps {
  result: InvestigationResult;
  onViewTimeline: () => void;
  onViewChanges: () => void;
  onViewGraph: () => void;
  onExportReport: () => void;
}

export function ResultsHeader({
  result,
  onViewTimeline,
  onViewChanges,
  onViewGraph,
  onExportReport,
}: ResultsHeaderProps) {
  const { run, summary } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <FileSearch size={16} className="text-white" />
          </div>
          <span className="text-xs text-gray-500 font-mono">{run.id}</span>
          <span className="text-xs text-gray-600">·</span>
          <span className="text-xs text-gray-500">{new Date(run.date).toLocaleString()}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">TRACE</span> RESULT
        </h1>
        <div className="text-lg text-gray-400 font-light tracking-wide">
          EVIDENCE TRAIL RECONSTRUCTED
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Related Versions', value: run.versionsFound, icon: Layers, color: '#3b82f6' },
          { label: 'Strongest Match', value: `${run.strongestRelationship}%`, icon: CheckCircle2, color: '#10b981' },
          { label: 'Changes Detected', value: run.changesDetected, icon: AlertTriangle, color: '#f59e0b' },
          { label: 'Claims Analyzed', value: run.claimsAnalyzed, icon: FileText, color: '#06b6d4' },
          { label: 'Context Discrepancies', value: run.contextDiscrepancies, icon: HelpCircle, color: '#6366f1' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color: stat.color }} />
                <span className="text-[10px] text-gray-500 tracking-wide">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onViewTimeline}
          className="flex items-center gap-2 glass-light px-5 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
        >
          <Clock size={16} className="text-blue-400" />
          View Timeline
        </button>
        <button
          onClick={onViewChanges}
          className="flex items-center gap-2 glass-light px-5 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
        >
          <GitCompareArrows size={16} className="text-cyan-400" />
          Show Me What Changed
        </button>
        <button
          onClick={onViewGraph}
          className="flex items-center gap-2 glass-light px-5 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
        >
          <Network size={16} className="text-indigo-400" />
          Open Evidence Graph
        </button>
        <button
          onClick={onExportReport}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <FileDown size={16} />
          Export Report
        </button>
      </div>

      {/* Summary preview */}
      <div className="glass rounded-xl p-5 border-blue-500/10">
        <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-3">EVIDENCE SUMMARY</div>
        <div className="space-y-1.5 mb-4">
          {summary.findings.slice(0, 4).map((finding, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              {finding.icon === 'check' && <CheckCircle2 size={14} className="text-green-400 mt-0.5 flex-shrink-0" />}
              {finding.icon === 'warning' && <AlertTriangle size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />}
              {finding.icon === 'question' && <HelpCircle size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />}
              <span className="text-gray-400">{finding.text}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-white/5">
          <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-1">CONCLUSION</div>
          <p className="text-xs text-gray-300 leading-relaxed">{summary.conclusion}</p>
        </div>
      </div>
    </motion.div>
  );
}
