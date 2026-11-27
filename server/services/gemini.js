import { GoogleGenAI } from '@google/genai';

let ai;

export async function generateText(prompt) {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');
  ai ??= new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { timeout: Number(process.env.GEMINI_TIMEOUT_MS) || 30000 },
  });

  const models = [...new Set([process.env.MODEL, process.env.FALLBACK_MODEL].filter(Boolean))];
  if (models.length === 0) throw new Error('MODEL is not set');

  let lastError;
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({ model, contents: prompt });
      return response.text ?? '';
    } catch (error) {
      console.error(`Gemini model ${model} failed:`, error.message);
      lastError = error;
    }
  }
  throw lastError;
}
