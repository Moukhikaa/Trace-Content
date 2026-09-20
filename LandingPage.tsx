import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Fingerprint,
  ScanText,
  Eye,
  Brain,
  GitCompareArrows,
  FileSearch,
  Network,
  History,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { HeroAnimation } from './HeroAnimation';

interface LandingPageProps {
  onTraceContent: () => void;
  onWatchDemo: () => void;
}

const capabilities = [
  { icon: Fingerprint, title: 'Content Fingerprinting', desc: 'Generate deterministic text and perceptual hashes for robust matching.' },
  { icon: ScanText, title: 'OCR & Extraction', desc: 'Extract text from images, screenshots, and PDFs for analysis.' },
  { icon: Eye, title: 'Visual Similarity', desc: 'Perceptual hashing detects resized, compressed, and cropped versions.' },
  { icon: Brain, title: 'Semantic Similarity', desc: 'Compare meaning, entities, and claims across content versions.' },
  { icon: GitCompareArrows, title: 'Change Detection', desc: 'Identify added, removed, and modified content between versions.' },
  { icon: FileSearch, title: 'Claim Analysis', desc: 'Decompose content into individual claims and evaluate evidence.' },
  { icon: Network, title: 'Evidence Graph', desc: 'Visualize relationships between content, claims, and sources.' },
  { icon: History, title: 'Provenance Reconstruction', desc: 'Build a timeline of how content evolved across versions.' },
];

const useCases = [
  'Government Notices', 'College Circulars', 'Job Advertisements', 'Certificates',
  'Viral Screenshots', 'Product Claims', 'News Images', 'Social Media Posts',
];

const howItWorks = [
  { num: '01', label: 'UPLOAD', desc: 'Submit an image, screenshot, PDF, or text for analysis.' },
  { num: '02', label: 'FINGERPRINT', desc: 'Generate text and visual fingerprints of the content.' },
  { num: '03', label: 'DISCOVER', desc: 'Search for related versions using similarity matching.' },
  { num: '04', label: 'RECONSTRUCT', desc: 'Build a provenance graph of how content evolved.' },
  { num: '05', label: 'EXPLAIN', desc: 'Present evidence, changes, and claims in a clear summary.' },
];

export function LandingPage({ onTraceContent, onWatchDemo }: LandingPageProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Fingerprint size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">TRACE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#problem" className="hover:text-white transition-colors">Problem</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onWatchDemo}
              className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              Watch Demo
            </button>
            <button
              onClick={onTraceContent}
              className="text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Trace Content
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b0f]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs text-gray-400 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Content Provenance & Forensic Reconstruction
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">TRACE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-light text-gray-200 mb-4 max-w-3xl mx-auto"
          >
            Don't just check the content.
            <br />
            <span className="text-white font-medium">Trace how it became what you see.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            TRACE reconstructs the evidence trail behind digital content by finding related
            versions, detecting transformations, comparing claims, and visualizing how
            information evolved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={onTraceContent}
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              TRACE CONTENT
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onWatchDemo}
              className="flex items-center gap-2 glass-light px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide hover:bg-white/5 transition-colors"
            >
              TRY LIVE DEMO
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HeroAnimation />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Digital content rarely stays unchanged.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every transformation can remove context. TRACE helps you understand what was changed, when, and why it matters.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {['Original Document', 'Screenshot', 'Crop', 'Edited Text', 'Viral Post'].map((step, i) => (
              <div key={step} className="flex items-center gap-2 md:gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="glass rounded-xl px-6 py-8 w-44 text-center"
                >
                  <div className="text-xs text-gray-500 mb-2">Step {i + 1}</div>
                  <div className="text-sm font-medium text-gray-200">{step}</div>
                </motion.div>
                {i < 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.15 + 0.1 }}
                    className="hidden md:block"
                  >
                    <ArrowRight size={20} className="text-gray-600" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-6 relative bg-grid-fine">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How TRACE Works</h2>
            <p className="text-gray-500 text-lg">A five-step forensic pipeline from upload to evidence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                onMouseEnter={() => setActiveStep(i)}
                className="glass rounded-xl p-6 relative group cursor-default"
              >
                <div className="text-3xl font-bold gradient-text-cyan mb-3">{step.num}</div>
                <div className="text-sm font-semibold tracking-wide mb-2">{step.label}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-gray-500 text-lg">Eight forensic engines working together.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-xl p-6 group hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2">{cap.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{cap.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why TRACE Is Different</h2>
            <p className="text-gray-500 text-lg">Not a binary truth machine. An evidence reconstruction engine.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 border-red-500/10"
            >
              <div className="text-xs text-gray-500 mb-3 tracking-wide">TRADITIONAL DETECTOR</div>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={28} className="text-red-400" />
                <span className="text-2xl font-bold text-gray-300">"Likely fake"</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Binary verdicts without explanation. No evidence trail. No context.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 border-blue-500/20"
            >
              <div className="text-xs text-blue-400 mb-3 tracking-wide">TRACE</div>
              <div className="flex items-start gap-3 mb-4">
                <ShieldCheck size={28} className="text-blue-400 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-200">"Here is what changed,"</p>
                  <p className="text-sm text-gray-200">"where the related version was found,"</p>
                  <p className="text-sm text-gray-200">"and what evidence supports the relationship."</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <HelpCircle size={14} />
                <span>Evidence-based, not verdict-based</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 px-6 bg-grid-fine">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Use Cases</h2>
            <p className="text-gray-500 text-lg">Wherever content authenticity matters.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="glass-light rounded-full px-6 py-3 text-sm text-gray-300 hover:text-white hover:border-blue-500/30 transition-colors cursor-default"
              >
                {useCase}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to trace?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 text-lg mb-10"
          >
            Experience the full forensic pipeline in under 60 seconds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onTraceContent}
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              TRACE CONTENT
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onWatchDemo}
              className="glass-light px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide hover:bg-white/5 transition-colors"
            >
              TRY LIVE DEMO
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Fingerprint size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold">TRACE</span>
            <span className="text-xs text-gray-600 ml-2">Content Provenance & Forensic Reconstruction</span>
          </div>
          <div className="text-xs text-gray-600">
            Built for HACKDAY 1.0 — Tech for a Better Tomorrow
          </div>
        </div>
      </footer>
    </div>
  );
}
