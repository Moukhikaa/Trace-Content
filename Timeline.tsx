import { motion } from 'framer-motion';
import { FileText, Edit3, Scissors, Share2, Smartphone, AlertCircle } from 'lucide-react';
import type { TimelineItem, TransformationType } from '@/types';

const typeConfig: Record<TransformationType, { icon: typeof FileText; color: string; label: string }> = {
  original: { icon: FileText, color: '#3b82f6', label: 'ORIGINAL' },
  edited: { icon: Edit3, color: '#06b6d4', label: 'EDITED' },
  cropped: { icon: Scissors, color: '#6366f1', label: 'CROPPED' },
  screenshot: { icon: Smartphone, color: '#8b5cf6', label: 'SCREENSHOT' },
  reposted: { icon: Share2, color: '#06b6d4', label: 'REPOSTED' },
  translated: { icon: Edit3, color: '#6366f1', label: 'TRANSLATED' },
  current: { icon: AlertCircle, color: '#3b82f6', label: 'CURRENT' },
};

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-cyan-500/30 to-transparent" />

      <div className="space-y-6">
        {items.map((item, i) => {
          const config = typeConfig[item.type] || typeConfig.original;
          const Icon = config.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-16"
            >
              {/* Node dot */}
              <div
                className="absolute left-3 top-2 w-7 h-7 rounded-full flex items-center justify-center border-2 z-10"
                style={{ backgroundColor: '#0a0b0f', borderColor: config.color }}
              >
                <Icon size={12} style={{ color: config.color }} />
              </div>

              <div className="glass rounded-xl p-4 hover:border-white/10 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span
                      className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: config.color, backgroundColor: `${config.color}15` }}
                    >
                      {config.label}
                    </span>
                    <div className="text-sm font-medium text-white mt-2">{item.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono">{item.date}</div>
                    <div className="text-[10px] text-gray-600 mt-1">
                      {Math.round(item.confidence * 100)}% confidence
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.description}</p>

                <div className="flex items-center gap-4 text-[10px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Evidence:</span>
                    <span className="text-gray-400">{item.evidence}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                  <span className="text-gray-600">Source:</span>
                  <span className="text-gray-400">{item.source}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
