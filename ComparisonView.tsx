import { motion } from 'framer-motion';
import { Plus, Minus, Edit3, ArrowRight, Check, FileText } from 'lucide-react';
import type { ContentChange, ContentVersion } from '@/types';

const categoryConfig = {
  ADDED: { icon: Plus, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  REMOVED: { icon: Minus, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  MODIFIED: { icon: Edit3, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  MOVED: { icon: ArrowRight, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)' },
  UNCHANGED: { icon: Check, color: '#8b8d97', bg: 'rgba(139, 141, 151, 0.1)' },
};

interface ComparisonViewProps {
  changes: ContentChange[];
  originalVersion: ContentVersion;
  currentVersion: ContentVersion;
}

interface DiffLine {
  type: 'unchanged' | 'added' | 'removed';
  text: string;
}

function computeLineDiff(original: string, current: string): DiffLine[] {
  const origLines = original.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const currLines = current.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

  const result: DiffLine[] = [];
  const origSet = new Set(origLines);
  const currSet = new Set(currLines);

  const allLines = [...new Set([...origLines, ...currLines])];

  for (const line of allLines) {
    const inOrig = origSet.has(line);
    const inCurr = currSet.has(line);
    if (inOrig && inCurr) {
      result.push({ type: 'unchanged', text: line });
    } else if (inOrig) {
      result.push({ type: 'removed', text: line });
    } else {
      result.push({ type: 'added', text: line });
    }
  }

  return result;
}

export function ComparisonView({ changes, originalVersion, currentVersion }: ComparisonViewProps) {
  const diffLines = computeLineDiff(originalVersion.contentText, currentVersion.contentText);

  const lineConfig = {
    unchanged: { color: '#8b8d97', bg: 'transparent', prefix: ' ' },
    added: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', prefix: '+' },
    removed: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', prefix: '-' },
  };

  return (
    <div className="space-y-6">
      {/* Side-by-side text comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-gray-400 tracking-wide">ORIGINAL</span>
            <span className="text-xs text-gray-600 font-mono ml-auto">{originalVersion.timestamp}</span>
          </div>
          <div className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
            {originalVersion.contentText}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-xl p-5 border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wide">CURRENT</span>
            <span className="text-xs text-gray-600 font-mono ml-auto">{currentVersion.timestamp}</span>
          </div>
          <div className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
            {currentVersion.contentText}
          </div>
        </motion.div>
      </div>

      {/* Unified diff view */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-gray-300">Unified Diff</h3>
          <div className="flex items-center gap-3 ml-auto text-[10px]">
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-sm bg-green-500/30" /> Added
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-sm bg-red-500/30" /> Removed
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-sm bg-gray-500/20" /> Unchanged
            </span>
          </div>
        </div>
        <div className="space-y-0.5 max-h-80 overflow-y-auto">
          {diffLines.map((line, i) => {
            const config = lineConfig[line.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
                className="flex items-start gap-2 px-3 py-1 rounded font-mono text-xs"
                style={{ backgroundColor: config.bg }}
              >
                <span className="text-gray-600 select-none w-4 flex-shrink-0">{config.prefix}</span>
                <span style={{ color: line.type === 'unchanged' ? '#9ca3af' : config.color }} className="break-all">
                  {line.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Changes list */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          Detected Changes
          <span className="text-xs text-gray-600 font-normal">({changes.length})</span>
        </h3>

        <div className="space-y-3">
          {changes.map((change, i) => {
            const config = categoryConfig[change.category];
            const Icon = config.icon;

            return (
              <motion.div
                key={change.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-xl p-4 flex items-start gap-4"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: config.bg }}
                >
                  <Icon size={16} style={{ color: config.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                      style={{ color: config.color, backgroundColor: config.bg }}
                    >
                      {change.category}
                    </span>
                    <span className="text-xs font-medium text-gray-300">{change.field}</span>
                  </div>

                  <p className="text-xs text-gray-500 mb-2">{change.description}</p>

                  {(change.oldValue || change.newValue) && (
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {change.oldValue && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-xs">
                          <Minus size={10} className="text-red-400" />
                          <span className="text-red-300 font-mono">{change.oldValue}</span>
                        </div>
                      )}
                      {change.oldValue && change.newValue && (
                        <ArrowRight size={12} className="text-gray-600" />
                      )}
                      {change.newValue && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-xs">
                          <Plus size={10} className="text-green-400" />
                          <span className="text-green-300 font-mono">{change.newValue}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
