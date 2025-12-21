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
      // Special handling for Imagen 4 (High Quality)
      if (modelKey === GenModel.IMAGEN_4) {
          const response = await ai.models.generateImages({
            model: GenModel.IMAGEN_4,
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
             throw new Error("No image data returned from Imagen.");
          }
      } 
      // Fallback to Flash Image (Fast)
      else {
          const response = await ai.models.generateContent({
            model: GenModel.FLASH_IMAGE,
            contents: {
              parts: [{ text: prompt }],
            },
            config: {
              responseModalities: [Modality.IMAGE],
            },
          });

          const part = response.candidates?.[0]?.content?.parts?.[0];
          if (part && part.inlineData) {
            const base64ImageBytes = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            return { 
              code: null, 
              imageUrl: `data:${mimeType};base64,${base64ImageBytes}` 
            };
          } else {
            throw new Error("No image data returned.");
          }
      }
    }

    // 2. Handle Text/Code Generation
    let targetModel = modelKey;
    let thinkingBudget = 0;

    // Map our internal Enum to actual model strings and thinking configs
    if (modelKey === GenModel.FLASH_2_5_THINKING) {
      targetModel = GenModel.FLASH_2_5;
      thinkingBudget = 2048; // Allocate budget for reasoning about code
    } else if (modelKey === GenModel.FLASH_LITE) {
        targetModel = 'gemini-flash-lite-latest' as GenModel;
    }

    // If user selected an image model but is in Code mode, fallback to Flash 2.5
    if (modelKey === GenModel.FLASH_IMAGE || modelKey === GenModel.IMAGEN_4) {
        targetModel = GenModel.FLASH_2_5;
    }

    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTIONS[mode],
    };

    // Apply thinking if requested (only valid for 2.5 models)
    if (isThinking || modelKey === GenModel.FLASH_2_5_THINKING) {
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
    if (modelKey === GenModel.FLASH_2_5_THINKING) {
      targetModel = GenModel.FLASH_2_5;
    } else if (modelKey === GenModel.FLASH_LITE) {
      targetModel = 'gemini-flash-lite-latest' as GenModel;
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