import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from '@/components/landing/LandingPage';
import { AppShell, type AppPage } from '@/components/AppShell';
import { UploadPage } from '@/components/pages/UploadPage';
import { AnalysisPipeline } from '@/components/pages/AnalysisPipeline';
import { ResultsPage } from '@/components/results/ResultsPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { InvestigationsListPage } from '@/components/pages/InvestigationsListPage';
import { ReportPage } from '@/components/pages/ReportPage';
import { SettingsPage } from '@/components/pages/SettingsPage';
import { ProvenanceGraph } from '@/components/results/ProvenanceGraph';
import { runDemoAnalysis, analyzeContent } from '@/services/analysisService';
import { demoInvestigation, demoProvenanceGraph } from '@/data/demoData';
import type { InvestigationResult } from '@/types';

type View = 'landing' | 'app' | 'analysis' | 'results';

function App() {
  const [view, setView] = useState<View>('landing');
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [analysisResult, setAnalysisResult] = useState<InvestigationResult | null>(null);
  const [presentationMode, setPresentationMode] = useState(false);
  const [analysisKey, setAnalysisKey] = useState(0);
  const pendingAnalysisRef = useRef<{ fileName: string; fileType: string; text: string; isDemo: boolean } | null>(null);

  const goToApp = (page: AppPage) => {
    setCurrentPage(page);
    setView('app');
  };

  const handleTraceContent = useCallback(() => {
    goToApp('new-investigation');
  }, []);

  const handleWatchDemo = useCallback(() => {
    setAnalysisKey((k) => k + 1);
    pendingAnalysisRef.current = { fileName: 'demo', fileType: 'screenshot', text: '', isDemo: true };
    setView('analysis');
  }, []);

  const handleAnalyze = useCallback((fileName: string, fileType: string, text: string) => {
    setAnalysisKey((k) => k + 1);
    setView('analysis');
    pendingAnalysisRef.current = { fileName, fileType, text, isDemo: false };
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    if (pendingAnalysisRef.current?.isDemo) {
      setAnalysisResult(runDemoAnalysis());
    } else if (pendingAnalysisRef.current) {
      const { fileName, fileType, text } = pendingAnalysisRef.current;
      setAnalysisResult(analyzeContent(fileName, fileType, text));
    } else {
      setAnalysisResult(runDemoAnalysis());
    }
    setView('results');
    setCurrentPage('new-investigation');
  }, []);

  const handleLoadDemo = useCallback(() => {
    setAnalysisKey((k) => k + 1);
    pendingAnalysisRef.current = { fileName: 'demo', fileType: 'screenshot', text: '', isDemo: true };
    setView('analysis');
  }, []);

  const handleExportReport = useCallback(() => {
    setCurrentPage('reports');
    setView('app');
  }, []);

  const handleSelectInvestigation = useCallback((_id: string) => {
    setAnalysisResult(demoInvestigation);
    setView('results');
  }, []);

  const handleHome = useCallback(() => {
    setView('landing');
  }, []);

  // Landing page
  if (view === 'landing') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onTraceContent={handleTraceContent} onWatchDemo={handleWatchDemo} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Analysis pipeline
  if (view === 'analysis') {
    return (
      <AnalysisPipeline
        key={analysisKey}
        onComplete={handleAnalysisComplete}
        duration={6000}
      />
    );
  }

  // Results page (full screen, no app shell)
  if (view === 'results' && analysisResult) {
    return (
      <div className="min-h-screen bg-[#0a0b0f]">
        {presentationMode && (
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setPresentationMode(false)}
              className="glass-light px-4 py-2 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
            >
              Exit Presentation Mode
            </button>
          </div>
        )}
        <div className="sticky top-0 z-40 glass border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <button
            onClick={handleHome}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">T</span>
            </div>
            <span className="text-sm font-bold">TRACE</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPresentationMode(!presentationMode)}
              className="text-xs text-gray-400 hover:text-white transition-colors glass-light px-3 py-1.5 rounded-lg"
            >
              {presentationMode ? 'Exit' : 'Presentation Mode'}
            </button>
            <button
              onClick={() => goToApp('dashboard')}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
        <div className={presentationMode ? 'p-4' : 'p-6'}>
          <ResultsPage
            result={analysisResult}
            onExportReport={handleExportReport}
            presentationMode={presentationMode}
          />
        </div>
      </div>
    );
  }

  // App shell pages
  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={goToApp}
      onHome={handleHome}
      presentationMode={presentationMode}
      onTogglePresentation={() => {
        if (analysisResult) {
          setView('results');
          setPresentationMode(!presentationMode);
        } else {
          setPresentationMode(!presentationMode);
        }
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentPage === 'dashboard' && <DashboardPage onNavigate={goToApp} />}

          {currentPage === 'new-investigation' && (
            <UploadPage onAnalyze={handleAnalyze} onLoadDemo={handleLoadDemo} />
          )}

          {currentPage === 'investigations' && (
            <InvestigationsListPage onSelectInvestigation={handleSelectInvestigation} />
          )}

          {currentPage === 'evidence-graph' && (
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold mb-1">Evidence Graph</h1>
              <p className="text-sm text-gray-500 mb-6">
                Interactive provenance graph from the demo investigation. Click nodes to inspect, zoom and pan to explore.
              </p>
              <ProvenanceGraph graph={demoProvenanceGraph} versions={demoInvestigation.versions} />
            </div>
          )}

          {currentPage === 'reports' && analysisResult && <ReportPage result={analysisResult} />}
          {currentPage === 'reports' && !analysisResult && <ReportPage result={demoInvestigation} />}

          {currentPage === 'demo' && analysisResult && (
            <ResultsPage result={analysisResult} onExportReport={handleExportReport} />
          )}
          {currentPage === 'demo' && !analysisResult && (
            <div className="max-w-2xl mx-auto text-center py-20">
              <h2 className="text-xl font-bold mb-4">No investigation loaded</h2>
              <p className="text-sm text-gray-500 mb-6">
                Load the demo case to view a full investigation result.
              </p>
              <button
                onClick={handleLoadDemo}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Load Demo Case
              </button>
            </div>
          )}

          {currentPage === 'settings' && <SettingsPage />}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}


export default App;
