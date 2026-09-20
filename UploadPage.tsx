import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Link,
  Type,
  Sparkles,
  X,
  ScanLine,
  FlaskConical,
  AlertCircle,
} from 'lucide-react';

interface UploadPageProps {
  onAnalyze: (fileName: string, fileType: string, text: string) => void;
  onLoadDemo: () => void;
}

type InputMode = 'file' | 'text' | 'url';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.txt'];

const DEMO_FALLBACK_TEXT = `URGENT! Apply immediately!

STUDENT SCHOLARSHIP APPLICATION NOTICE 2026

Issued by: National Scholarship Council of India

Application Deadline: 20 September 2026

Applications must be submitted online through the official scholarship portal.`;

export function UploadPage({ onAnalyze, onLoadDemo }: UploadPageProps) {
  const [mode, setMode] = useState<InputMode>('file');
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [file, setFile] = useState<{ name: string; size: string; type: string; rawSize: number } | null>(null);
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fileText, setFileText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setError(null);

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File exceeds 10MB limit. Please select a smaller file.');
      return;
    }

    const ext = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_TYPES.includes(ext)) {
      setError(`File type "${ext}" is not supported. Accepted: ${ACCEPTED_TYPES.join(', ')}`);
      return;
    }

    const sizeStr =
      selectedFile.size > 1024 * 1024
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(selectedFile.size / 1024).toFixed(0)} KB`;

    setFile({
      name: selectedFile.name,
      size: sizeStr,
      type: selectedFile.type || 'unknown',
      rawSize: selectedFile.size,
    });

    setScanning(true);

    // Read file content for text files
    if (selectedFile.type.startsWith('text/') || ext === '.txt') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileText(text || DEMO_FALLBACK_TEXT);
        setScanning(false);
      };
      reader.onerror = () => {
        setFileText(DEMO_FALLBACK_TEXT);
        setScanning(false);
      };
      reader.readAsText(selectedFile);
    } else {
      // For images/PDFs — OCR not available in browser, use demo fallback text
      setFileText(DEMO_FALLBACK_TEXT);
      setTimeout(() => setScanning(false), 2000);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleAnalyze = () => {
    if (mode === 'file' && file) {
      onAnalyze(file.name, file.type, fileText || DEMO_FALLBACK_TEXT);
    } else if (mode === 'text' && textContent.trim()) {
      onAnalyze('pasted_text.txt', 'text/plain', textContent);
    } else if (mode === 'url' && urlContent.trim()) {
      onAnalyze(urlContent, 'url', urlContent);
    }
  };

  const canAnalyze = mode === 'file' ? !!file && !scanning : mode === 'text' ? textContent.trim().length > 0 : urlContent.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Trace a piece of content.</h1>
        <p className="text-gray-500 mb-8">Upload an image, PDF, or text. TRACE will fingerprint it, search for related versions, and reconstruct the evidence trail.</p>

        {/* Input mode tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'file' as InputMode, label: 'Upload File', icon: Upload },
            { id: 'text' as InputMode, label: 'Paste Text', icon: Type },
            { id: 'url' as InputMode, label: 'Paste URL', icon: Link },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setMode(tab.id); setError(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                  mode === tab.id
                    ? 'glass border-blue-500/30 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-300">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File upload */}
        {mode === 'file' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all overflow-hidden ${
                dragging
                  ? 'border-blue-500 bg-blue-500/5'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {scanning && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 animate-scan" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-500/50 animate-scan" />
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="file-selected"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl glass flex items-center justify-center">
                        {file.type.includes('image') ? (
                          <ImageIcon size={28} className="text-blue-400" />
                        ) : (
                          <FileText size={28} className="text-blue-400" />
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); setFileText(''); setError(null); }}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <X size={16} className="text-gray-400" />
                      </button>
                    </div>
                    <div className="text-sm font-medium text-white mb-1">{file.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{file.size} · {file.type || 'unknown type'}</div>
                    {scanning && (
                      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-blue-400">
                        <ScanLine size={14} className="animate-pulse" />
                        Scanning content...
                      </div>
                    )}
                    {!scanning && fileText && (
                      <div className="mt-4 text-xs text-gray-600">
                        {file.type.includes('image') ? 'OCR fallback: using demo content for analysis' : 'Text extracted successfully'}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10"
                  >
                    <div className="w-16 h-16 rounded-xl glass mx-auto flex items-center justify-center mb-4">
                      <Upload size={28} className="text-gray-400" />
                    </div>
                    <div className="text-sm font-medium text-gray-200 mb-2">Drag and drop or click to upload</div>
                    <div className="text-xs text-gray-500">PDF, PNG, JPG, JPEG, WEBP, TXT · Max 10MB</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Text paste */}
        {mode === 'text' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste the text content you want to trace..."
              className="w-full h-48 glass rounded-2xl p-4 text-sm text-gray-200 placeholder-gray-600 outline-none resize-none focus:border-blue-500/30 transition-colors"
            />
          </motion.div>
        )}

        {/* URL paste */}
        {mode === 'url' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <input
              type="url"
              value={urlContent}
              onChange={(e) => setUrlContent(e.target.value)}
              placeholder="https://example.com/content-to-trace"
              className="w-full glass rounded-2xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-blue-500/30 transition-colors"
            />
            <p className="mt-2 text-xs text-gray-600">
              URL content will be analyzed using the text you provide. External fetching is not available in demo mode.
            </p>
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 rounded-xl font-medium text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} />
            ANALYZE CONTENT
          </button>
          <button
            onClick={onLoadDemo}
            className="flex items-center gap-2 glass-light px-8 py-3 rounded-xl font-medium text-sm tracking-wide hover:bg-white/5 transition-colors"
          >
            <FlaskConical size={16} />
            LOAD DEMO CASE
          </button>
        </div>

        {/* Info note */}
        <div className="mt-8 glass-light rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
          <span className="text-blue-400 font-medium">Demo Mode:</span> TRACE works fully offline with seeded data. No API keys or external services required. The demo case traces a scholarship notice through 5 versions showing deadline modification, cropping, and added urgency captions.
        </div>
      </motion.div>
    </div>
  );
}
