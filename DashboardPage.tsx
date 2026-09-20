import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Layers, FileSearch, CheckCircle2, GitCompareArrows, Network, TrendingUp } from 'lucide-react';
import type { DashboardStats } from '@/types';
import { demoDashboardStats, demoInvestigationsList } from '@/data/demoData';
import type { AppPage } from '@/components/AppShell';

interface DashboardPageProps {
  onNavigate: (page: AppPage) => void;
}

const chartColors = ['#3b82f6', '#06b6d4', '#6366f1', '#8b5cf6', '#10b981'];

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const stats = demoDashboardStats;

  const statCards = [
    { label: 'Investigations', value: stats.totalInvestigations, icon: FileSearch, color: '#3b82f6' },
    { label: 'Related Versions', value: stats.relatedVersionsDiscovered, icon: Layers, color: '#06b6d4' },
    { label: 'Claims Analyzed', value: stats.claimsAnalyzed, icon: CheckCircle2, color: '#10b981' },
    { label: 'Changes Detected', value: stats.changesDetected, icon: GitCompareArrows, color: '#f59e0b' },
    { label: 'Evidence Relationships', value: stats.evidenceRelationships, icon: Network, color: '#6366f1' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Overview</h1>
        <p className="text-sm text-gray-500">Forensic investigation analytics and activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Investigations over time */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-blue-400" />
            <h3 className="text-sm font-semibold text-gray-300">Investigations Over Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.investigationsOverTime}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#8b8d97', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b8d97', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#11131a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="url(#areaGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Content type distribution */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Content Type Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={stats.contentTypeDistribution}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {stats.contentTypeDistribution.map((_, i) => (
                  <Cell key={i} fill={chartColors[i % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#11131a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {stats.contentTypeDistribution.map((item, i) => (
              <div key={item.type} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[i % chartColors.length] }} />
                <span className="text-gray-500">{item.type}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Transformation types */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Transformation Types Detected</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={stats.transformationTypes}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="type" tick={{ fill: '#8b8d97', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8b8d97', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: '#11131a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent investigations */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-300">Recent Investigations</h3>
          <button
            onClick={() => onNavigate('investigations')}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all
          </button>
        </div>
        <div className="space-y-2">
          {demoInvestigationsList.slice(0, 5).map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => onNavigate('demo')}
            >
              <div className="w-8 h-8 rounded-lg glass-light flex items-center justify-center">
                <FileSearch size={14} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-200 truncate">{inv.title}</div>
                <div className="text-xs text-gray-600 font-mono">{inv.id} · {inv.date}</div>
              </div>
              <div className="text-xs text-gray-500">{inv.versions} versions</div>
              <CheckCircle2 size={14} className="text-green-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
