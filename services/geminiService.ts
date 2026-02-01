
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartProductSuggestions = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest 3 pharmacy products related to the following query: "${query}". Return the names only as a comma separated list.`,
      config: {
        systemInstruction: "You are a senior pharmacist assistant. Provide only the product names found in a typical pharmacy stock.",
      }
    });
    return response.text?.split(',').map(s => s.trim()) || [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const checkDrugInteraction = async (products: string[]) => {
  if (products.length < 2) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Check for potential interactions between these drugs: ${products.join(', ')}. Provide a brief professional warning if any major risks exist. If no risks, say "No significant interactions found".`,
    });
    return response.text;
  } catch (error) {
    return "Error checking interactions.";
  }
};
