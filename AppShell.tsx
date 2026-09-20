import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileSearch,
  FolderOpen,
  Network,
  FileBarChart,
  FlaskConical,
  Settings,
  Fingerprint,
  Search,
  Bell,
  User,
  Home,
  Menu,
  X,
} from 'lucide-react';

export type AppPage =
  | 'dashboard'
  | 'new-investigation'
  | 'investigations'
  | 'evidence-graph'
  | 'reports'
  | 'demo'
  | 'settings';

interface AppShellProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onHome: () => void;
  children: React.ReactNode;
  presentationMode?: boolean;
  onTogglePresentation?: () => void;
}

const navItems: { id: AppPage; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'new-investigation', label: 'New Investigation', icon: FileSearch },
  { id: 'investigations', label: 'Investigations', icon: FolderOpen },
  { id: 'evidence-graph', label: 'Evidence Graph', icon: Network },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'demo', label: 'Demo Investigation', icon: FlaskConical },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function AppShell({
  currentPage,
  onNavigate,
  onHome,
  children,
  presentationMode = false,
  onTogglePresentation,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  const handleNavigate = (page: AppPage) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      <button
        onClick={onHome}
        className="flex items-center gap-2 px-6 py-5 border-b border-white/5 hover:bg-white/5 transition-colors w-full"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Fingerprint size={18} className="text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">TRACE</span>
      </button>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? 'bg-blue-500/10 text-white border border-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={18} className={active ? 'text-blue-400' : ''} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button
          onClick={onTogglePresentation}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors glass-light"
        >
          <FlaskConical size={14} />
          Presentation Mode
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white flex">
      {/* Desktop sidebar */}
      {!presentationMode && (
        <aside className="hidden lg:flex w-64 border-r border-white/5 flex-col fixed h-full z-40 glass">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {!presentationMode && mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-50"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="lg:hidden fixed top-0 left-0 h-full w-64 border-r border-white/5 flex flex-col z-50 glass"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors z-10"
              >
                <X size={18} className="text-gray-400" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className={presentationMode ? 'flex-1' : 'flex-1 lg:ml-64'}>
        {/* Topbar */}
        {!presentationMode && (
          <header className="h-16 border-b border-white/5 glass flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} className="text-gray-400" />
              </button>
              <button
                onClick={onHome}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Home size={16} />
              </button>
              <span className="text-sm text-gray-600 hidden sm:inline">/</span>
              <span className="text-sm font-medium capitalize hidden sm:inline">
                {navItems.find((n) => n.id === currentPage)?.label || currentPage}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-light w-64">
                <Search size={14} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search investigations..."
                  className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none flex-1"
                />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Notifications">
                <Bell size={18} className="text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center" aria-label="Profile">
                <User size={16} className="text-white" />
              </div>
            </div>
          </header>
        )}

        {presentationMode && onTogglePresentation && (
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={onTogglePresentation}
              className="glass-light px-4 py-2 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
            >
              Exit Presentation Mode
            </button>
          </div>
        )}

        <main className={presentationMode ? 'p-4' : 'p-4 sm:p-6'}>{children}</main>
      </div>
    </div>
  );
}
