import { motion } from 'framer-motion';
import { FileText, Scissors, Edit3, Share2, Smartphone } from 'lucide-react';

const stages = [
  { label: 'Original', icon: FileText, color: '#3b82f6' },
  { label: 'Edited', icon: Edit3, color: '#06b6d4' },
  { label: 'Cropped', icon: Scissors, color: '#6366f1' },
  { label: 'Reposted', icon: Share2, color: '#06b6d4' },
  { label: 'Current', icon: Smartphone, color: '#3b82f6' },
];

export function HeroAnimation() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {stages.slice(0, -1).map((_, i) => {
          const x1 = 10 + (i * 80) / (stages.length - 1) * 0.8 + 5;
          const x2 = 10 + ((i + 1) * 80) / (stages.length - 1) * 0.8 + 5;
          return (
            <motion.line
              key={i}
              x1={`${x1 * 1.2}%`}
              y1="50%"
              x2={`${x2 * 1.2}%`}
              y2="50%"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.3 }}
            />
          );
        })}
      </svg>

      <div className="relative flex items-center justify-between w-full max-w-3xl px-4">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3 relative z-10"
            >
              <div
                className="w-16 h-16 rounded-2xl glass flex items-center justify-center relative group"
                style={{ borderColor: `${stage.color}40` }}
              >
                <motion.div
                  animate={{ boxShadow: `0 0 20px ${stage.color}30` }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute inset-0 rounded-2xl"
                />
                <Icon size={24} style={{ color: stage.color }} />
                {i < stages.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 -right-3 w-2 h-2 rounded-full"
                    style={{ backgroundColor: stage.color }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                )}
              </div>
              <span className="text-xs font-medium text-gray-400 tracking-wide">{stage.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
