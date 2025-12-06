'use server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: "AIzaSyCFETVIKww94QcU-yLW9DpaH3n4uQ57ats",
});

export const getMessage = async (text: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
    });

    return response.text ?? "";
}

export const sendMessageToAi = async (text: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return `I received your message: "${text}". This is a mock AI response.`;
};
