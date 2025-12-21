export enum OutputMode {
  P5JS = 'P5.js',
  SVG = 'SVG',
  HTML = 'HTML/JS',
  THREEJS = 'Three.js',
  IMAGE = 'Image',
}

export enum ExecutionStrategy {
  BATCH = 'Batch',
  VERSUS = 'Versus',
}

export enum GenModel {
  FLASH_LITE = 'gemini-flash-lite-latest', // Mapped internally
  FLASH_2_5 = 'gemini-2.5-flash',
  FLASH_2_5_THINKING = 'gemini-2.5-flash-thinking', // Custom key for logic handling
  PRO_3_0 = 'gemini-3-pro-preview', // Gemini 3.0 Pro
  FLASH_IMAGE = 'gemini-2.5-flash-image',
  IMAGEN_4 = 'imagen-4.0-generate-001', // High Quality Image Gen
}

export interface GenerationResult {
  id: string;
  modelName: string;
  outputMode: OutputMode;
  code: string | null;
  imageUrl?: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  latencyMs?: number;
  errorMessage?: string;
}

export interface Round {
  id: string;
  timestamp: number;
  prompt: string;
  strategy: ExecutionStrategy;
  results: GenerationResult[];
}

export interface AppState {
  theme: 'light' | 'dark';
  currentPrompt: string;
  settings: {
    outputMode: OutputMode;
    strategy: ExecutionStrategy;
    selectedModel: GenModel; // Primary model for Batch
    batchSize: number;
    versusModels: GenModel[]; // Models for Versus
  };
  rounds: Round[];
  isGenerating: boolean;
  editingResult: { roundId: string; resultId: string } | null;
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  setPrompt: (prompt: string) => void;
  setSettings: (settings: Partial<AppState['settings']>) => void;
  addRound: (round: Round) => void;
  updateResult: (roundId: string, resultId: string, update: Partial<GenerationResult>) => void;
  toggleVersusModel: (model: GenModel) => void;
  
  // Refinement Actions
  setEditingResult: (ids: { roundId: string; resultId: string } | null) => void;
  runRefinement: (instruction: string) => Promise<void>;
}