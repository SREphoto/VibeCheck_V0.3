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
  FLASH_LITE = 'gemini-2.5-flash-lite',
  FLASH_3_0 = 'gemini-3.0-flash',
  PRO_3_0 = 'gemini-3.0-pro',
  FLASH_3_0_THINKING = 'gemini-3.0-pro', // Using 3.0 Pro for thinking
  NANO_BANANA = 'gemini-2.5-flash-image',
  NANO_BANANA_PRO = 'gemini-3-pro-image-preview',
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