import React, { useState, useRef, useEffect } from 'react';
import { GenerationResult, OutputMode } from '../types';
import { MODEL_LABELS } from '../constants';
import Renderer from './Renderer';
import { useStore } from '../store/store';

interface OutputCardProps {
  result: GenerationResult;
}

const OutputCard: React.FC<OutputCardProps> = ({ result }) => {
  const [viewMode, setViewMode] = useState<'render' | 'code'>('render');
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const { setEditingResult } = useStore();

  const handleCopy = () => {
    const content = result.imageUrl || result.code || '';
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleRefine = () => {
      // Only find the roundId from parent context usually, but we can cheat or pass it down.
      // Since we don't have roundId in props, we need to find it in store or update props.
      // Actually, the store structure is recursive. Let's just pass the ID and let store find it?
      // Wait, store needs roundId. Let's pass it from Feed. 
      // OR simpler: We update `OutputCard` to not need roundId if we change store action?
      // No, easier to just find it in store if unique, OR passed via props.
      // Since props are cleaner, let's assume we passed it. 
      // BUT, I can't change Feed easily in this single file block without changing Feed too.
      // Let's do a search in the store action or pass it.
      // Wait, `result.id` is UUID. It should be unique globally.
      // Let's modify `setEditingResult` in store to take just resultId?
      // No, kept it simple: Let's search for the result ID in the global rounds list inside the store action? 
      // Actually, let's just iterate rounds in the click handler here? 
      // We have access to `useStore`.
      
      // Quick fix: Find round ID here.
      const state = useStore.getState();
      const round = state.rounds.find(r => r.results.some(res => res.id === result.id));
      if (round) {
          setEditingResult({ roundId: round.id, resultId: result.id });
      }
  };

  // Effect to highlight code when viewMode changes to 'code'
  useEffect(() => {
    if (viewMode === 'code' && codeRef.current && (window as any).Prism) {
       setTimeout(() => {
           (window as any).Prism.highlightElement(codeRef.current);
       }, 0);
    }
  }, [viewMode, result.code]);

  const isLoading = result.status === 'loading';
  const hasError = result.status === 'error';
  const canRefine = result.status === 'success' && result.outputMode !== OutputMode.IMAGE && result.code;

  // Determine language class for Prism
  const getLanguageClass = () => {
      switch (result.outputMode) {
          case OutputMode.HTML:
          case OutputMode.SVG:
              return 'language-markup';
          case OutputMode.P5JS:
          case OutputMode.THREEJS:
              return 'language-javascript';
          default:
              return 'language-javascript';
      }
  };

  return (
    <div className="group relative flex flex-col h-[400px] w-full rounded-2xl overflow-hidden backdrop-blur-md bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-lg transition-all hover:shadow-xl hover:scale-[1.01]">
      
      {/* Card Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 bg-gradient-to-b from-black/30 to-transparent pointer-events-none">
        <div className="flex items-center gap-2">
            <div className="pointer-events-auto px-2 py-1 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-mono text-white">
              {MODEL_LABELS[result.modelName as any] || result.modelName}
            </div>
            {result.status === 'success' && result.latencyMs !== undefined && (
               <div className="pointer-events-auto px-2 py-1 rounded-md bg-green-600 text-white shadow-md text-[10px] font-bold font-mono border border-green-500">
                  {result.latencyMs}ms
               </div>
            )}
        </div>
        
        <div className="pointer-events-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {canRefine && (
                <button 
                    onClick={handleRefine}
                    className="p-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500 shadow-md backdrop-blur-md transition-colors"
                    title="Refine this output"
                >
                    ✏️
                </button>
            )}
            {result.status === 'success' && (
                <>
                <button 
                    onClick={() => setViewMode(viewMode === 'render' ? 'code' : 'render')}
                    className="p-1.5 rounded bg-black/50 text-white hover:bg-black/70 backdrop-blur-md"
                    title={viewMode === 'render' ? "View Code" : "View Render"}
                >
                    {viewMode === 'render' ? '</>' : '👁️'}
                </button>
                <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded bg-black/50 text-white hover:bg-black/70 backdrop-blur-md text-xs"
                >
                    {copied ? '✓' : 'Copy'}
                </button>
                </>
            )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full h-full bg-gray-50 dark:bg-gray-900 relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-indigo-500 font-medium">Generating...</p>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-red-500 bg-red-50 dark:bg-red-900/10">
            <span className="text-3xl mb-2">⚠️</span>
            <p className="text-sm font-bold">Generation Failed</p>
            <p className="text-xs mt-1 opacity-80 font-mono break-words w-full">{result.errorMessage}</p>
          </div>
        )}

        {!isLoading && !hasError && (
           viewMode === 'render' ? (
             <Renderer code={result.code} mode={result.outputMode} imageUrl={result.imageUrl} />
           ) : (
             <div className="w-full h-full overflow-auto bg-[#2d2d2d]">
                <pre className={`!m-0 !p-4 !bg-transparent ${getLanguageClass()}`}>
                  <code ref={codeRef} className={getLanguageClass()}>
                    {result.code || "No code generated."}
                  </code>
                </pre>
             </div>
           )
        )}
      </div>
    </div>
  );
};

export default OutputCard;