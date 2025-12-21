import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import Renderer from './Renderer';
import { MODEL_LABELS } from '../constants';

const RefineModal: React.FC = () => {
  const { editingResult, rounds, setEditingResult, runRefinement } = useStore();
  const [instruction, setInstruction] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEditingResult(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setEditingResult]);

  if (!editingResult) return null;

  const round = rounds.find(r => r.id === editingResult.roundId);
  const result = round?.results.find(r => r.id === editingResult.resultId);

  if (!result) return null;

  const handleSubmit = async () => {
    if (!instruction.trim()) return;
    setIsUpdating(true);
    await runRefinement(instruction);
    setIsUpdating(false);
    setInstruction('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setEditingResult(null)}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10">
        
        {/* Header (Mobile Only) */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Refine Output</h3>
            <button onClick={() => setEditingResult(null)} className="text-gray-500">✕</button>
        </div>

        {/* Left Column: Renderer */}
        <div className="flex-1 relative bg-gray-100 dark:bg-black/50 min-h-[50vh] md:min-h-full">
            <Renderer code={result.code} mode={result.outputMode} imageUrl={result.imageUrl} />
            
            {/* Loading Overlay */}
            {result.status === 'loading' && (
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
                        Updating Code...
                    </span>
                </div>
            )}
        </div>

        {/* Right Column: Controls */}
        <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
            
            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Refine</h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">
                        {MODEL_LABELS[result.modelName as any] || result.modelName}
                    </p>
                </div>
                <button 
                    onClick={() => setEditingResult(null)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Chat/History Area (Placeholder for future chat history, currently just instructions) */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 mb-4">
                    <p className="text-sm text-indigo-900 dark:text-indigo-200">
                        <span className="mr-2">💡</span>
                        <b>Pro Tip:</b> Describe what you want to change about the visualization.
                    </p>
                    <ul className="text-xs text-indigo-700 dark:text-indigo-300 mt-2 space-y-1 list-disc list-inside opacity-80">
                        <li>"Change the colors to a sunset palette"</li>
                        <li>"Make the animation faster"</li>
                        <li>"Add more particles"</li>
                        <li>"Make it respond to mouse clicks"</li>
                    </ul>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                    Instructions
                </label>
                <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={result.status === 'loading'}
                    placeholder="e.g. Make the background blue..."
                    className="w-full h-32 p-4 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm transition-all mb-4"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!instruction.trim() || result.status === 'loading'}
                    className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${
                        !instruction.trim() || result.status === 'loading'
                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                    }`}
                >
                    {result.status === 'loading' ? 'Updating...' : 'Update Code'}
                </button>
                <div className="text-center mt-2">
                    <span className="text-[10px] text-gray-400">Ctrl + Enter to submit</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RefineModal;