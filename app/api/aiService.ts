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

export const countToken = async (text: string): Promise<number> => {
    const response = await ai.models.countTokens({
        model: "gemini-2.5-flash",
        contents: text,
    });

    return response.totalTokens ?? 0;
};

export const sendMessageToAi = async (text: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return `I received your message: "${text}". This is a mock AI response.`;
};



