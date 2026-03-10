
import { GoogleGenAI, Type } from "@google/genai";

// The API key is obtained from environment variables as per instructions.
// Always use the process.env.API_KEY directly without fallbacks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Actúa como un asistente veterinario experto para la app KANINA.
Tu objetivo es orientar, calmar, hacer triaje y detectar señales de alarma.
REGLA DE ORO: No puedes recetar medicamentos, dosis ni tratamientos específicos.
Debes incluir siempre un disclaimer indicando que esta consulta no sustituye a una visita presencial.
Si detectas una emergencia, indica claramente que el usuario debe acudir a URGENCIAS veterinarias de inmediato.
`;

export const getAIVetResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    // Ensure accessing .text property as per SDK requirements.
    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Lo siento, ha habido un problema conectando con el asistente. Por favor, consulta con tu veterinario de confianza.";
  }
};
