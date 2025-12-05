import { Sender, Message } from '../types';

export const sendMessageToAi = async (text: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return `I received your message: "${text}". This is a mock AI response.`;
};
