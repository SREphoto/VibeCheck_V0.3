import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, OutputMode, ExecutionStrategy, GenModel, Round, GenerationResult } from '../types';
import { generateContent, refineContent } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

interface StoreState extends AppState {
  runGeneration: () => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default to dark for creative coder vibe
      currentPrompt: '',
      settings: {
        outputMode: OutputMode.P5JS,
        strategy: ExecutionStrategy.BATCH,
        selectedModel: GenModel.FLASH_2_5,
        batchSize: 3,
        versusModels: [GenModel.FLASH_2_5, GenModel.PRO_3_0],
      },
      rounds: [],
      isGenerating: false,
      editingResult: null,

      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
      },

      setPrompt: (prompt) => set({ currentPrompt: prompt }),
      
      setSettings: (newSettings) => set((state) => ({ 
        settings: { ...state.settings, ...newSettings } 
      })),

      addRound: (round) => set((state) => ({ 
        rounds: [round, ...state.rounds] 
      })),

      updateResult: (roundId, resultId, update) => set((state) => ({
        rounds: state.rounds.map(r => 
          r.id === roundId 
            ? { ...r, results: r.results.map(res => res.id === resultId ? { ...res, ...update } : res) }
            : r
        )
      })),

      toggleVersusModel: (model) => set((state) => {
        const current = state.settings.versusModels;
        const exists = current.includes(model);
        if (exists && current.length > 1) {
            return { settings: { ...state.settings, versusModels: current.filter(m => m !== model) } };
        } else if (!exists && current.length < 4) {
            return { settings: { ...state.settings, versusModels: [...current, model] } };
        }
        return state;
      }),

      setEditingResult: (ids) => set({ editingResult: ids }),

      runRefinement: async (instruction) => {
        const { editingResult, rounds, updateResult } = get();
        if (!editingResult) return;

        const round = rounds.find(r => r.id === editingResult.roundId);
        const result = round?.results.find(r => r.id === editingResult.resultId);
        
        if (!result || !result.code) return;

        // Set status to loading to show feedback in UI (Card and Modal)
        updateResult(editingResult.roundId, editingResult.resultId, { status: 'loading' });

        const startTime = performance.now();
        
        const data = await refineContent(
            result.code, 
            instruction, 
            result.modelName as GenModel, 
            result.outputMode
        );

        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);

        updateResult(editingResult.roundId, editingResult.resultId, {
            status: data.error ? 'error' : 'success',
            code: data.code || result.code, // Keep old code on error
            errorMessage: data.error,
            latencyMs: latency
        });
      },

      runGeneration: async () => {
        const { currentPrompt, settings, addRound, updateResult } = get();
        if (!currentPrompt.trim()) return;

        set({ isGenerating: true });

        const roundId = uuidv4();
        const timestamp = Date.now();
        const strategy = settings.strategy;

        // Prepare placeholders
        const initialResults: GenerationResult[] = [];
        
        if (strategy === ExecutionStrategy.BATCH) {
          for (let i = 0; i < settings.batchSize; i++) {
            initialResults.push({
              id: uuidv4(),
              modelName: settings.selectedModel,
              outputMode: settings.outputMode,
              code: null,
              status: 'loading',
            });
          }
        } else {
          // Versus
          settings.versusModels.forEach(model => {
            initialResults.push({
              id: uuidv4(),
              modelName: model,
              outputMode: settings.outputMode,
              code: null,
              status: 'loading',
            });
          });
        }

        addRound({
            id: roundId,
            prompt: currentPrompt,
            timestamp,
            strategy,
            results: initialResults
        });

        // Execute Requests in Parallel
        const promises = initialResults.map(async (res) => {
           const startTime = performance.now();
           const isThinking = res.modelName === GenModel.FLASH_2_5_THINKING;
           
           const data = await generateContent(currentPrompt, res.modelName as GenModel, settings.outputMode, isThinking);
           
           const endTime = performance.now();
           const latency = Math.round(endTime - startTime);

           updateResult(roundId, res.id, {
             status: data.error ? 'error' : 'success',
             code: data.code,
             imageUrl: data.imageUrl,
             errorMessage: data.error,
             latencyMs: latency
           });
        });

        await Promise.all(promises);
        set({ isGenerating: false });
      }

    }),
    {
      name: 'vibecheck-storage',
      partialize: (state) => ({ theme: state.theme, rounds: state.rounds }), 
    }
  )
);