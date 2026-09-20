import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Fingerprint } from 'lucide-react';
import { analysisStages } from '@/services/analysisService';

interface AnalysisPipelineProps {
  onComplete: () => void;
  duration?: number;
}

export function AnalysisPipeline({ onComplete, duration = 6000 }: AnalysisPipelineProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    const stageDuration = duration / analysisStages.length;

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= analysisStages.length - 1) {
          clearInterval(interval);
          setCompletedStages((cp) => [...cp, prev]);
          setTimeout(onComplete, 500);
          return prev;
        }
        setCompletedStages((cp) => [...cp, prev]);
        return prev + 1;
      });
    }, stageDuration);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const progress = ((currentStage + 1) / analysisStages.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs text-gray-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            FORENSIC ANALYSIS IN PROGRESS
          </div>
          <h1 className="text-3xl font-bold mb-2">Analyzing Content</h1>
          <p className="text-gray-500 text-sm">Running the full forensic pipeline</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-mono">Progress</span>
            <span className="text-xs text-blue-400 font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Stages */}
        <div className="space-y-2">
          {analysisStages.map((stage, i) => {
            const isCompleted = completedStages.includes(i);
            const isActive = currentStage === i;
            const isPending = i > currentStage;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isPending ? 0.3 : 1,
                  x: 0,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  isActive ? 'glass border-blue-500/20' : 'border border-transparent'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle2 size={20} className="text-green-400" />
                    </motion.div>
                  ) : isActive ? (
                    <Loader2 size={20} className="text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center">
                      <span className="text-[10px] text-gray-600 font-mono">{stage.id}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className={`text-sm font-medium ${isPending ? 'text-gray-600' : 'text-white'}`}>
                    <span className="font-mono text-xs text-gray-500 mr-2">{String(stage.id).padStart(2, '0')}</span>
                    {stage.label}
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-gray-500 mt-1 overflow-hidden"
                      >
                        {stage.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isActive && (
                  <motion.div
                    className="flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="w-1 h-1 rounded-full bg-blue-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-600"
        >
          <Fingerprint size={14} className="text-blue-400" />
          TRACE Forensic Engine · Demo Mode
        </motion.div>
      </div>
    </div>
  );
}
