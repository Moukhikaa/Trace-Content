import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Database, Brain, Shield, Info } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-sm text-gray-500">Configuration and system information</p>
      </div>

      {/* System status */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-gray-300">System Status</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Forensic Engine', status: 'Active', color: '#10b981' },
            { label: 'Demo Mode', status: 'Enabled', color: '#06b6d4' },
            { label: 'AI Service', status: 'Not configured (using fallback)', color: '#f59e0b' },
            { label: 'Database', status: 'Demo data (no persistence)', color: '#8b8d97' },
            { label: 'OCR Service', status: 'Fallback extraction', color: '#f59e0b' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{item.label}</span>
              <span className="text-xs font-mono" style={{ color: item.color }}>{item.status}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Brain size={16} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-gray-300">AI Configuration</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">OPENAI_API_KEY</label>
            <div className="px-3 py-2 rounded-lg glass-light text-xs text-gray-600 font-mono">
              Not configured · Using deterministic demo mode
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">MODEL_NAME</label>
            <div className="px-3 py-2 rounded-lg glass-light text-xs text-gray-600 font-mono">
              Not set · Default: gpt-4o
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          When API keys are configured, TRACE uses AI for semantic similarity, entity extraction, and claim analysis. Without keys, the system falls back to deterministic algorithms.
        </p>
      </motion.div>

      {/* Database */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Database size={16} className="text-indigo-400" />
          <h3 className="text-sm font-semibold text-gray-300">Database</h3>
        </div>
        <p className="text-xs text-gray-500">
          TRACE is currently running in demo mode with seeded data. Investigations are not persisted. When Supabase is configured, the system stores investigations, fingerprints, versions, and evidence in PostgreSQL.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {['users', 'projects', 'uploads', 'content_fingerprints', 'content_versions', 'similarity_matches', 'claims', 'evidence', 'transformations', 'analysis_runs', 'reports'].map((table) => (
            <div key={table} className="px-3 py-1.5 rounded glass-light text-gray-500 font-mono">
              {table}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-green-400" />
          <h3 className="text-sm font-semibold text-gray-300">Security</h3>
        </div>
        <ul className="text-xs text-gray-500 space-y-1.5">
          <li>· File types are validated on upload (PDF, PNG, JPG, JPEG, WEBP, TXT)</li>
          <li>· File size limited to 10MB</li>
          <li>· Extracted text is sanitized before processing</li>
          <li>· Uploaded files are never executed</li>
          <li>· API keys are never exposed to the frontend</li>
          <li>· Metadata is never fabricated — unavailable metadata is labeled as such</li>
        </ul>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-5 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <SettingsIcon size={16} className="text-blue-400" />
          <span className="text-sm font-bold">TRACE</span>
        </div>
        <p className="text-xs text-gray-500">
          AI-Powered Digital Content Provenance & Forensic Reconstruction Platform
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Built for HACKDAY 1.0 — Tech for a Better Tomorrow
        </p>
      </motion.div>
    </div>
  );
}
