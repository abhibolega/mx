
import React from 'react';
import { FRAMEWORKS, MANAGERIAL_PILLARS } from '../constants.tsx';
import { Pillar, FrameworkType } from '../types.ts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Info } from 'lucide-react';

interface DashboardProps {
  activeFramework: FrameworkType;
  onFrameworkChange: (framework: FrameworkType) => void;
  onPillarSelect: (pillar: Pillar) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeFramework, onFrameworkChange, onPillarSelect }) => {
  const pillars = FRAMEWORKS[activeFramework];
  
  const radarData = pillars.map(p => ({
    subject: p.title,
    level: Math.floor(Math.random() * 5) + 1,
    fullMark: 5,
  }));

  const frameworkDescriptions = {
    WCM: "An integrated management system aimed at achieving world-class competitive performance through the elimination of all types of waste.",
    TPM: "A system of maintaining and improving the integrity of production, safety and quality systems through equipment ownership.",
    TQM: "A management approach to long-term success through customer satisfaction, where all members of an organization participate in improvement.",
  };

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in duration-500">
      {/* Framework Selector Bar */}
      <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-fit overflow-x-auto">
        {(['WCM', 'TPM', 'TQM'] as FrameworkType[]).map((f) => (
          <button
            key={f}
            onClick={() => onFrameworkChange(f)}
            className={`flex-1 sm:flex-none px-4 lg:px-6 py-2 rounded-lg text-xs lg:text-sm font-bold transition-all whitespace-nowrap ${
              activeFramework === f 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Intro Section */}
      <section className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center transition-colors">
        <div className="flex-1 space-y-4 w-full">
          <div className="flex items-center gap-3">
             <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase rounded">Methodology</div>
             <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-slate-100">{activeFramework} Excellence</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-lg">
            {frameworkDescriptions[activeFramework]} For a <strong>Chemical Process Engineer</strong>, this provides the rigorous tools needed to stabilize and optimize complex reaction environments.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <StatCard value="ZERO" label="Accidents" color="text-green-600" />
            <StatCard value="ZERO" label="Breakdowns" color="text-red-500" />
            <StatCard value="ZERO" label="Defects" color="text-purple-600" />
            <StatCard value="ZERO" label="Waste" color="text-orange-500" />
          </div>
        </div>
        
        {/* Radar Maturity - Optimized for Mobile Labels */}
        <div className="w-full lg:w-[350px] aspect-square lg:h-[350px] shrink-0 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-2 border border-slate-100 dark:border-slate-700 overflow-hidden relative">
           <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center mt-2 uppercase tracking-widest absolute top-2 left-0 right-0 z-10">{activeFramework} MATURITY</p>
           <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="55%" 
              outerRadius="40%" 
              data={radarData}
              margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
            >
              <PolarGrid stroke="#475569" strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{fontSize: 7, fill: '#94a3b8', fontWeight: 700, width: 60}} 
              />
              <Radar name="Status" dataKey="level" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Methodology Pillars */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h4 className="text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-100">
            The {pillars.length} {activeFramework === 'TQM' ? 'Core Principles' : 'Technical Pillars'}
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">Step-by-step implementation modules</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => onPillarSelect(pillar)}
              className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all text-left flex flex-col h-full relative overflow-hidden active:scale-[0.98]"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform"></div>
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${pillar.color} rounded-xl flex items-center justify-center text-white text-xl lg:text-2xl mb-4 group-hover:rotate-6 transition-all shadow-md`}>
                {pillar.icon}
              </div>
              <h5 className="font-bold text-sm lg:text-base text-slate-900 dark:text-slate-100 mb-2">{pillar.title}</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
                {pillar.description}
              </p>
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest uppercase opacity-0 lg:group-hover:opacity-100 transition-all">
                EXPLORE METHOD <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Strategic Integration Section */}
      {activeFramework === 'WCM' && (
        <section className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 lg:p-8 text-white transition-colors border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4">
             <div className="w-96 h-96 border-8 border-white rounded-full"></div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg"><Info className="text-blue-400" /></div>
            <h4 className="text-lg lg:text-xl font-bold tracking-tight">Managerial Foundation</h4>
          </div>
          <p className="text-sm lg:text-base text-slate-400 mb-8 max-w-2xl leading-relaxed">
            Technical pillars of WCM cannot stand without a strong managerial foundation. These 10 criteria drive leadership behaviors and cultural consistency.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-4 gap-x-4">
            {MANAGERIAL_PILLARS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-blue-500 font-mono text-xs font-bold shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-[10px] lg:text-xs font-medium text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const StatCard: React.FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => (
  <div className="flex flex-col bg-slate-50 dark:bg-slate-800/30 p-2 rounded-lg lg:bg-transparent lg:p-0">
    <span className={`text-xl lg:text-3xl font-black ${color} tracking-tighter`}>{value}</span>
    <span className="text-[8px] lg:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

export default Dashboard;
