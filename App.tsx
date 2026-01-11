
import React, { useState, useEffect } from 'react';
import { ViewMode, Pillar, FrameworkType } from './types.ts';
import { FRAMEWORKS } from './constants.tsx';
import Dashboard from './components/Dashboard.tsx';
import PillarDetailView from './components/PillarDetailView.tsx';
import AiTutorView from './components/AiTutorView.tsx';
import GlossaryView from './components/GlossaryView.tsx';
import { BookOpen, LayoutDashboard, MessageSquare, Sun, Moon, Globe, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [activeFramework, setActiveFramework] = useState<FrameworkType>('WCM');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handlePillarClick = (pillar: Pillar) => {
    setSelectedPillar(pillar);
    setViewMode(ViewMode.PILLAR_DETAIL);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const renderView = () => {
    switch (viewMode) {
      case ViewMode.DASHBOARD:
        return (
          <Dashboard 
            activeFramework={activeFramework} 
            onFrameworkChange={setActiveFramework}
            onPillarSelect={handlePillarClick} 
          />
        );
      case ViewMode.PILLAR_DETAIL:
        return selectedPillar ? (
          <PillarDetailView pillar={selectedPillar} onBack={() => setViewMode(ViewMode.DASHBOARD)} />
        ) : <Dashboard activeFramework={activeFramework} onFrameworkChange={setActiveFramework} onPillarSelect={handlePillarClick} />;
      case ViewMode.AI_TUTOR:
        return <AiTutorView currentFramework={activeFramework} />;
      case ViewMode.GLOSSARY:
        return <GlossaryView />;
      default:
        return <Dashboard activeFramework={activeFramework} onFrameworkChange={setActiveFramework} onPillarSelect={handlePillarClick} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800 z-40 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-black">P</div>
              MX Portal
            </h1>
            <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-widest font-semibold">Manufacturing Excellence</p>
          </div>
          <button onClick={closeSidebar} className="lg:hidden p-1 text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 py-4 px-3 space-y-1">
          <NavItem 
            active={viewMode === ViewMode.DASHBOARD} 
            onClick={() => { setViewMode(ViewMode.DASHBOARD); closeSidebar(); }}
            icon={<LayoutDashboard size={20} />}
            label="Frameworks"
          />
          <NavItem 
            active={viewMode === ViewMode.AI_TUTOR} 
            onClick={() => { setViewMode(ViewMode.AI_TUTOR); closeSidebar(); }}
            icon={<MessageSquare size={20} />}
            label="AI Expert Tutor"
          />
          <NavItem 
            active={viewMode === ViewMode.GLOSSARY} 
            onClick={() => { setViewMode(ViewMode.GLOSSARY); closeSidebar(); }}
            icon={<BookOpen size={20} />}
            label="Knowledge Base"
          />
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Globe size={14} className="text-blue-400" />
              <span>Context: {activeFramework}</span>
            </div>
            <div className="mt-2 w-full bg-slate-700 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-4 flex justify-between items-center transition-colors">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-sm lg:text-lg font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px] lg:max-w-none">
              {viewMode === ViewMode.DASHBOARD ? `${activeFramework} Overview` : 
               viewMode === ViewMode.PILLAR_DETAIL ? `${selectedPillar?.title}` :
               viewMode === ViewMode.AI_TUTOR ? `Expert: ${activeFramework}` : "Glossary"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
             <span className="hidden sm:inline text-[10px] font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded uppercase tracking-wider">Expert Track</span>
             <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default App;
