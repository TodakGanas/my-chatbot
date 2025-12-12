'use server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.MY_GEMINI_KEY,
});

// Fonction pour obtenir une réponse de l'IA
export const getMessage = async (text: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
    });

    return response.text ?? "";
}

// Fonction pour compter le nombre de tokens
export const countToken = async (text: string): Promise<number> => {
    const response = await ai.models.countTokens({
        model: "gemini-2.5-flash",
        contents: text,
    });

    return response.totalTokens ?? 0;
};

// Fonction pour envoyer un message à l'IA (simulée pour l'instant)
export const sendMessageToAi = async (text: string): Promise<string> => {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    return `I received your message: "${text}". This is a mock AI response.`;
};



