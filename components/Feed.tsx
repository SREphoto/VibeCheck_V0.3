import React from 'react';
import { useStore } from '../store/store';
import OutputCard from './OutputCard';
import { MODE_SPECIFIC_PROMPTS, MODEL_LABELS } from '../constants';

const Feed: React.FC = () => {
  const { rounds, settings, setPrompt } = useStore();

  const handleSelectPrompt = (p: string) => {
      setPrompt(p);
  };

  if (rounds.length === 0) {
    const modePrompts = MODE_SPECIFIC_PROMPTS[settings.outputMode] || [];
    // Show a generous slice of prompts to browse
    const displayPrompts = modePrompts.slice(0, 15);
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-6xl mx-auto px-4 animate-in fade-in duration-700">
        <div className="mb-10 text-center space-y-3">
             <div className="text-7xl mb-4 opacity-20 animate-bounce duration-[3000ms] select-none">🎨</div>
             <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Start your Vibe Check
             </h2>
             <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
                Select a mode in the header, then choose a starter idea below to generate code instantly.
             </p>
        </div>

        <div className="w-full">
           <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                 {settings.outputMode} Ideas
              </h3>
              <span className="text-xs text-gray-400 font-mono">
                 {modePrompts.length} PRESETS
              </span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayPrompts.map((prompt, idx) => (
                  <button 
                      key={idx}
                      onClick={() => handleSelectPrompt(prompt)}
                      className="group relative text-left p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-indigo-500 transition-opacity text-xs font-bold">
                          APPLY ↗
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors font-medium pr-6">
                          {prompt}
                      </p>
                  </button>
              ))}
           </div>

           <div className="mt-12 text-center">
               <p className="text-xs text-gray-400">
                   Current Model: <span className="font-mono text-indigo-500">{MODEL_LABELS[settings.selectedModel]}</span>
               </p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24 pt-4">
      {rounds.map((round) => (
        <div key={round.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          {/* Round Header */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-6 border-b border-black/5 dark:border-white/5 pb-4">
             <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
               {round.prompt}
             </h2>
             <div className="flex items-center gap-2 text-xs font-mono text-gray-500 opacity-70">
               <span>{new Date(round.timestamp).toLocaleTimeString()}</span>
               <span>•</span>
               <span className="uppercase">{round.strategy}</span>
             </div>
          </div>

          {/* Grid of Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {round.results.map((result) => (
              <OutputCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;