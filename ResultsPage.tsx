import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, GitCompareArrows, Network, FileSearch, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { InvestigationResult } from '@/types';
import { ResultsHeader } from './ResultsHeader';
import { Timeline } from './Timeline';
import { ComparisonView } from './ComparisonView';
import { ProvenanceGraph } from './ProvenanceGraph';
import { ClaimAnalysis } from './ClaimAnalysis';
import { EvidencePanel } from './EvidencePanel';

type Tab = 'overview' | 'timeline' | 'changes' | 'graph' | 'claims' | 'sources' | 'evidence';

interface ResultsPageProps {
  result: InvestigationResult;
  onExportReport: () => void;
  presentationMode?: boolean;
}

export function ResultsPage({ result, onExportReport, presentationMode }: ResultsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>(presentationMode ? 'timeline' : 'overview');

  const tabs: { id: Tab; label: string; icon: typeof Clock }[] = [
    { id: 'overview', label: 'Overview', icon: FileSearch },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'changes', label: 'What Changed', icon: GitCompareArrows },
    { id: 'graph', label: 'Evidence Graph', icon: Network },
    { id: 'claims', label: 'Claims', icon: CheckCircle2 },
    { id: 'sources', label: 'Sources', icon: FileSearch },
    { id: 'evidence', label: 'Evidence', icon: FileSearch },
  ];

  const originalVersion = result.versions.find((v) => v.transformation === 'original') || result.versions[result.versions.length - 1];
  const currentVersion = result.versions.find((v) => v.isCurrent) || result.versions[0];

  const presentationSteps: Tab[] = ['timeline', 'changes', 'graph', 'claims', 'evidence'];
  const currentStepIndex = presentationSteps.indexOf(activeTab);

  const scrollToTab = (tab: Tab) => {
    setActiveTab(tab);
    if (presentationMode) return;
    setTimeout(() => {
      document.getElementById(`tab-${tab}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className={presentationMode ? 'max-w-6xl mx-auto' : 'max-w-5xl mx-auto'}>
      {/* Results Header */}
      <ResultsHeader
        result={result}
        onViewTimeline={() => scrollToTab('timeline')}
        onViewChanges={() => scrollToTab('changes')}
        onViewGraph={() => scrollToTab('graph')}
        onExportReport={onExportReport}
      />

      {/* Tabs */}
      <div className="sticky top-16 z-20 mt-8 mb-6 -mx-6 px-6 py-3 glass border-y border-white/5">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  active
                    ? 'bg-blue-500/10 text-white border border-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Investigation Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Input File</div>
                    <div className="text-sm text-gray-300 font-mono">{result.run.inputName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Input Type</div>
                    <div className="text-sm text-gray-300">{result.run.inputType}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Investigation ID</div>
                    <div className="text-sm text-gray-300 font-mono">{result.run.id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Date</div>
                    <div className="text-sm text-gray-300">{new Date(result.run.date).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-4">Discovered Versions</h3>
                <div className="space-y-2">
                  {result.versions.map((version, i) => (
                    <motion.div
                      key={version.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="glass rounded-xl p-4 flex items-center gap-4"
                    >
                      <div className="text-xs text-gray-600 font-mono w-6">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-white">{version.label}</div>
                          {version.sourceType === 'demo' && (
                            <span className="text-[9px] font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">DEMO</span>
                          )}
                          {version.sourceType === 'uploaded' && (
                            <span className="text-[9px] font-bold text-blue-400 px-1.5 py-0.5 rounded bg-blue-500/10">UPLOADED</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {version.timestamp} · {version.source}
                        </div>
                      </div>
                      {version.similarity && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold text-blue-400">{version.similarity.composite}%</div>
                          <div className="text-[10px] text-gray-600">{version.similarity.label}</div>
                        </div>
                      )}
                      {version.isCurrent && (
                        <div className="text-[10px] font-bold text-cyan-400 px-2 py-1 rounded bg-cyan-500/10 flex-shrink-0">
                          CURRENT
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div id="tab-timeline">
              <h2 className="text-xl font-bold mb-6">Content Evolution Timeline</h2>
              <Timeline items={result.timeline} />
            </div>
          )}

          {activeTab === 'changes' && (
            <div id="tab-changes">
              <h2 className="text-xl font-bold mb-2">What Changed?</h2>
              <p className="text-sm text-gray-500 mb-6">Side-by-side comparison of the original and current versions with detected differences.</p>
              <ComparisonView
                changes={result.changes}
                originalVersion={originalVersion}
                currentVersion={currentVersion}
              />
            </div>
          )}

          {activeTab === 'graph' && (
            <div id="tab-graph">
              <h2 className="text-xl font-bold mb-2">Provenance Graph</h2>
              <p className="text-sm text-gray-500 mb-6">Interactive graph showing how content evolved. Click nodes to inspect. Zoom and pan to explore.</p>
              <ProvenanceGraph graph={result.provenanceGraph} versions={result.versions} />
            </div>
          )}

          {activeTab === 'claims' && (
            <div id="tab-claims">
              <h2 className="text-xl font-bold mb-2">Claim Analysis</h2>
              <p className="text-sm text-gray-500 mb-6">Individual claims extracted from the content, each evaluated against available evidence.</p>
              <ClaimAnalysis claims={result.claims} />
            </div>
          )}

          {activeTab === 'sources' && (
            <div id="tab-sources">
              <h2 className="text-xl font-bold mb-2">Sources</h2>
              <p className="text-sm text-gray-500 mb-6">All discovered sources and their relationships to the current content.</p>
              <div className="space-y-3">
                {result.versions.map((version, i) => (
                  <motion.div
                    key={version.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="glass rounded-xl p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{version.label}</span>
                          {version.sourceType === 'demo' && (
                            <span className="text-[9px] font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10">DEMO SOURCE</span>
                          )}
                          {version.sourceType === 'uploaded' && (
                            <span className="text-[9px] font-bold text-blue-400 px-1.5 py-0.5 rounded bg-blue-500/10">USER UPLOAD</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{version.source}</div>
                      </div>
                      <div className="text-xs text-gray-600 font-mono">{version.timestamp}</div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-[10px] text-gray-600 mb-0.5">Content Type</div>
                        <div className="text-gray-400 capitalize">{version.contentType}</div>
                      </div>
                      {version.similarity && (
                        <div>
                          <div className="text-[10px] text-gray-600 mb-0.5">Relationship</div>
                          <div className="text-gray-400">{version.similarity.composite}% composite</div>
                        </div>
                      )}
                      {version.metadata?.fileName && (
                        <div>
                          <div className="text-[10px] text-gray-600 mb-0.5">File</div>
                          <div className="text-gray-400 font-mono truncate">{version.metadata.fileName}</div>
                        </div>
                      )}
                      {version.metadata?.fileSize && (
                        <div>
                          <div className="text-[10px] text-gray-600 mb-0.5">Size</div>
                          <div className="text-gray-400 font-mono">{version.metadata.fileSize}</div>
                        </div>
                      )}
                    </div>
                    {version.changes && version.changes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <div className="text-[10px] text-gray-600 font-semibold tracking-wide mb-2">EVIDENCE</div>
                        <div className="space-y-1">
                          {version.changes.map((c) => (
                            <div key={c.id} className="text-xs text-gray-500">
                              <span className="text-gray-400">{c.field}:</span> {c.description}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div id="tab-evidence">
              <h2 className="text-xl font-bold mb-2">Evidence Panel</h2>
              <p className="text-sm text-gray-500 mb-6">Detailed evidence items, fingerprints, extracted entities, and the final evidence summary.</p>
              <EvidencePanel
                evidence={result.evidence}
                summary={result.summary}
                entities={result.entities}
                fingerprint={result.fingerprint}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Presentation mode navigation */}
      {presentationMode && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <button
            onClick={() => {
              const prevIndex = Math.max(0, currentStepIndex - 1);
              setActiveTab(presentationSteps[prevIndex]);
            }}
            disabled={currentStepIndex <= 0}
            className="flex items-center gap-2 glass-light px-5 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <div className="flex items-center gap-2">
            {presentationSteps.map((step, i) => (
              <button
                key={step}
                onClick={() => setActiveTab(step)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentStepIndex ? 'bg-blue-500 w-6' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
          {currentStepIndex < presentationSteps.length - 1 ? (
            <button
              onClick={() => {
                const nextIndex = Math.min(presentationSteps.length - 1, currentStepIndex + 1);
                setActiveTab(presentationSteps[nextIndex]);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={onExportReport}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Export Report
            </button>
          )}
        </div>
      )}
    </div>
  );
}
