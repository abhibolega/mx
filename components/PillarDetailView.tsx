
import React from 'react';
import { Pillar } from '../types';
import { ChevronLeft, CheckCircle2, Beaker, Map, Layers } from 'lucide-react';

interface PillarDetailViewProps {
  pillar: Pillar;
  onBack: () => void;
}

const PillarDetailView: React.FC<PillarDetailViewProps> = ({ pillar, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 font-medium transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ChevronLeft size={20} />
        Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
        <div className={`w-16 h-16 lg:w-20 lg:h-20 ${pillar.color} rounded-2xl flex items-center justify-center text-white text-3xl lg:text-4xl shadow-lg shrink-0`}>
          {pillar.icon}
        </div>
        <div>
          <h2 className="text-2xl lg:text-4xl font-black text-slate-900 dark:text-slate-100">{pillar.title}</h2>
          <p className="text-base lg:text-xl text-slate-500 dark:text-slate-400 mt-1 lg:mt-2">{pillar.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-slate-900 p-5 lg:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <h4 className="flex items-center gap-2 text-base lg:text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">
              <Layers className="text-blue-500" size={20} />
              7-Step Methodology
            </h4>
            <div className="space-y-6 lg:space-y-8">
              {pillar.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-sm transition-all group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600">
                      {idx + 1}
                    </div>
                    {idx < pillar.steps.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 dark:bg-slate-800 my-2"></div>}
                  </div>
                  <div className="pt-0.5 pb-2">
                    <p className="font-bold text-sm lg:text-base text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </p>
                    <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 dark:bg-blue-900/10 p-5 lg:p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 transition-colors">
            <h4 className="flex items-center gap-2 text-base lg:text-lg font-bold text-blue-900 dark:text-blue-300 mb-4">
              <Beaker className="text-blue-600 dark:text-blue-400" size={20} />
              Chemical Process Focus
            </h4>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 text-blue-900 dark:text-blue-300 text-xs lg:text-sm leading-relaxed italic transition-colors">
              "{pillar.chemicalContext}"
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-900 p-5 lg:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <h4 className="flex items-center gap-2 text-base lg:text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
              <Map className="text-orange-500" size={20} />
              Key Concepts
            </h4>
            <ul className="space-y-3">
              {pillar.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-slate-900 dark:bg-slate-800 text-white p-5 lg:p-6 rounded-xl shadow-lg border border-slate-700">
            <h5 className="font-bold text-xs lg:text-sm mb-2 opacity-80 uppercase tracking-widest">Pillar Target</h5>
            <p className="text-xl lg:text-2xl font-black text-blue-400 uppercase tracking-tighter">{pillar.specificGoal}</p>
            <p className="text-[10px] text-slate-400 mt-3 italic leading-snug">Targets are defined as the total elimination of specific losses related to this pillar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillarDetailView;
