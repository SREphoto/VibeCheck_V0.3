import React from 'react';
import { useStore } from '../store/store';
import { OutputMode, ExecutionStrategy, GenModel } from '../types';
import { MODE_SPECIFIC_PROMPTS, FRACTAL_PROMPTS, MODEL_LABELS } from '../constants';

const Header: React.FC = () => {
  const { 
    settings, 
    setSettings, 
    currentPrompt, 
    setPrompt, 
    runGeneration, 
    isGenerating, 
    theme, 
    setTheme,
    toggleVersusModel
  } = useStore();

  const handleRandomPrompt = () => {
    const modePrompts = MODE_SPECIFIC_PROMPTS[settings.outputMode] || [];
    if (modePrompts.length > 0) {
      const random = modePrompts[Math.floor(Math.random() * modePrompts.length)];
      setPrompt(random);
    }
  };

  const handleFractalPrompt = () => {
    if (FRACTAL_PROMPTS.length > 0) {
      const random = FRACTAL_PROMPTS[Math.floor(Math.random() * FRACTAL_PROMPTS.length)];
      setPrompt(random);
    }
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      setPrompt(val);
      // Reset selection so it can be picked again if needed
      e.target.value = ""; 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      runGeneration();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-black/60 border-b border-white/20 dark:border-white/10 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight">
              VibeCheck
            </h1>
          </div>

          <div className="flex items-center gap-4 text-sm">
             {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {/* Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          {/* Strategy & Mode */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-2">
             <div className="flex rounded-lg bg-black/5 dark:bg-white/5 p-1">
                {Object.values(ExecutionStrategy).map((strat) => (
                   <button
                    key={strat}
                    onClick={() => setSettings({ strategy: strat })}
                    className={`flex-1 text-xs font-medium py-1.5 px-2 rounded-md transition-all ${settings.strategy === strat ? 'bg-white dark:bg-white/10 shadow-sm text-indigo-600 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}
                   >
                     {strat}
                   </button>
                ))}
             </div>
             <select 
                value={settings.outputMode}
                onChange={(e) => setSettings({ outputMode: e.target.value as OutputMode })}
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
             >
                {Object.values(OutputMode).map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
             </select>
          </div>

          {/* Model Selection */}
          <div className="col-span-12 md:col-span-4 flex flex-col justify-center gap-2">
             {settings.strategy === ExecutionStrategy.BATCH ? (
               <div className="flex flex-col gap-2">
                  <select 
                    value={settings.selectedModel}
                    onChange={(e) => setSettings({ selectedModel: e.target.value as GenModel })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {Object.entries(MODEL_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <div className="flex items-center justify-between px-1">
                     <span className="text-xs text-gray-500">Count: {settings.batchSize}</span>
                     <input 
                       type="range" 
                       min="1" max="9" 
                       value={settings.batchSize} 
                       onChange={(e) => setSettings({ batchSize: parseInt(e.target.value) })}
                       className="w-32 accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                     />
                  </div>
               </div>
             ) : (
               <div className="flex flex-wrap gap-1">
                 {Object.entries(MODEL_LABELS).map(([key, label]) => {
                   const isSelected = settings.versusModels.includes(key as GenModel);
                   return (
                     <button
                       key={key}
                       onClick={() => toggleVersusModel(key as GenModel)}
                       className={`text-[10px] px-2 py-1 rounded-full border transition-all ${isSelected ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 text-indigo-700 dark:text-indigo-300' : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-500'}`}
                     >
                       {label.replace('Gemini', '').trim()}
                     </button>
                   )
                 })}
               </div>
             )}
          </div>

          {/* Prompt Input */}
          <div className="col-span-12 md:col-span-5 flex gap-2">
             <textarea
               value={currentPrompt}
               onChange={(e) => setPrompt(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder={`Describe your ${settings.outputMode} idea... (Ctrl+Enter to run)`}
               className="w-full h-full min-h-[80px] p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-black/40 transition-all outline-none resize-none text-sm"
             />
             <div className="flex flex-col gap-2">
                <button 
                  onClick={runGeneration}
                  disabled={isGenerating || !currentPrompt.trim()}
                  className={`h-full px-6 rounded-xl font-semibold shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white'}`}
                >
                  {isGenerating ? (
                    <span className="animate-spin">↻</span>
                  ) : (
                    <span>GO</span>
                  )}
                </button>
             </div>
          </div>
        </div>
        
        {/* Utilities */}
        <div className="flex items-center gap-3 text-xs">
           <button onClick={handleRandomPrompt} className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium">
             🎲 Random Prompt
           </button>
           <span className="text-gray-300 dark:text-gray-700">|</span>
           <button onClick={handleFractalPrompt} className="text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 font-medium">
             🌀 Fractal
           </button>
           <span className="text-gray-300 dark:text-gray-700">|</span>
           
           {/* Presets Dropdown */}
           <div className="relative">
             <select 
                onChange={handlePresetChange}
                className="appearance-none bg-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer outline-none pr-4 font-medium"
                defaultValue=""
             >
                <option value="" disabled>📂 Browse Presets</option>
                {MODE_SPECIFIC_PROMPTS[settings.outputMode]?.map((p, i) => (
                   <option key={i} value={p} className="text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-200">
                      {p.length > 60 ? p.substring(0, 60) + '...' : p}
                   </option>
                ))}
             </select>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;