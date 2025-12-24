import { GoogleGenAI, Modality } from "@google/genai";
import { GenModel, OutputMode } from "../types";
import { SYSTEM_INSTRUCTIONS } from "../constants";

// Initialize API Client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateContent = async (
  prompt: string,
  modelKey: GenModel,
  mode: OutputMode,
  isThinking: boolean
): Promise<{ code: string | null; imageUrl: string | null; error?: string }> => {

  try {
    // 1. Handle Image Generation Mode specifically
    if (mode === OutputMode.IMAGE) {
      // Nano Banana Pro (Gemini 3 Pro Image)
      if (modelKey === GenModel.NANO_BANANA_PRO) {
        const response = await ai.models.generateImages({
          model: GenModel.NANO_BANANA_PRO,
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
          },
        });
        const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
        if (base64ImageBytes) {
          return { code: null, imageUrl: `data:image/jpeg;base64,${base64ImageBytes}` };
        } else {
          throw new Error("No image data returned from Nano Banana Pro.");
        }
      }
      // Nano Banana (Gemini 2.5 Flash Image)
      else {
        const response = await ai.models.generateImages({
          model: GenModel.NANO_BANANA,
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
          },
        });

        const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
        if (base64ImageBytes) {
          return {
            code: null,
            imageUrl: `data:image/jpeg;base64,${base64ImageBytes}`
          };
        } else {
          throw new Error("No image data returned from Nano Banana.");
        }
      }
    }

    // 2. Handle Text/Code Generation
    let targetModel = modelKey;
    let thinkingBudget = 0;

    // Map our internal Enum to actual model strings and thinking configs
    if (modelKey === GenModel.FLASH_3_0_THINKING) {
      targetModel = GenModel.PRO_3_0;
      thinkingBudget = 32768; // High budget for 3.0 Pro thinking
    } else if (modelKey === GenModel.FLASH_LITE) {
      targetModel = GenModel.FLASH_LITE;
    }

    // If user selected an image model but is in Code mode, fallback to Flash 3.0
    if (modelKey === GenModel.NANO_BANANA || modelKey === GenModel.NANO_BANANA_PRO) {
      targetModel = GenModel.FLASH_3_0;
    }

    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTIONS[mode],
    };

    // Apply thinking if requested (only valid for 2.5/3.0 models)
    if (isThinking || modelKey === GenModel.FLASH_3_0_THINKING) {
      config.thinkingConfig = { thinkingBudget };
    }

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: prompt,
      config: config
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from model");

    return { code: cleanCode(text, mode), imageUrl: null };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { code: null, imageUrl: null, error: error.message || "Generation failed" };
  }
};

export const refineContent = async (
  originalCode: string,
  instruction: string,
  modelKey: GenModel,
  mode: OutputMode
): Promise<{ code: string | null; error?: string }> => {
  try {
    let targetModel = modelKey;

    // Fallback to standard flash if thinking was used, 
    // or keep same model. Refinement usually good with standard flash or pro.
    if (modelKey === GenModel.FLASH_3_0_THINKING) {
      targetModel = GenModel.PRO_3_0;
    } else if (modelKey === GenModel.FLASH_LITE) {
      targetModel = GenModel.FLASH_LITE;
    }

    // Construct a prompt that includes the code context
    const refinementPrompt = `
You are an expert developer.
Current Code (${mode}):
${originalCode}

User Request:
${instruction}

Output the fully updated code only. Do not include markdown or explanations. 
Ensure it remains valid ${mode} syntax.
`;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: refinementPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS[mode],
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from model");

    return { code: cleanCode(text, mode) };

  } catch (error: any) {
    console.error("Gemini Refine Error:", error);
    return { code: null, error: error.message || "Refinement failed" };
  }
};

/**
 * Helper to strip Markdown code blocks from LLM output
 */
const cleanCode = (raw: string, mode: OutputMode): string => {
  // remove markdown code fences
  let cleaned = raw.replace(/```(html|xml|svg|javascript|js|css)?/gi, '').replace(/```/g, '');
  return cleaned.trim();
};