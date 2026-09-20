import { motion } from 'framer-motion';
import { FileSearch, CheckCircle2, ArrowRight } from 'lucide-react';
import { demoInvestigationsList } from '@/data/demoData';

interface InvestigationsListPageProps {
  onSelectInvestigation: (id: string) => void;
}

export function InvestigationsListPage({ onSelectInvestigation }: InvestigationsListPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Investigations</h1>
        <p className="text-sm text-gray-500">All forensic investigations</p>
      </div>

      <div className="space-y-3">
        {demoInvestigationsList.map((inv, i) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            onClick={() => onSelectInvestigation(inv.id)}
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-blue-500/20 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg glass-light flex items-center justify-center">
              <FileSearch size={18} className="text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{inv.title}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-600 font-mono">{inv.id}</span>
                <span className="text-xs text-gray-600">·</span>
                <span className="text-xs text-gray-500">{inv.date}</span>
                <span className="text-xs text-gray-600">·</span>
                <span className="text-xs text-gray-500 capitalize">{inv.type}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-blue-400">{inv.versions}</div>
              <div className="text-[10px] text-gray-600">versions</div>
            </div>
            <CheckCircle2 size={16} className="text-green-400" />
            <ArrowRight size={16} className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
