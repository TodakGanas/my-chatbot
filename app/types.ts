// Types pour les messages et les sessions de chat
export enum Sender {
    User = 'USER',
    AI = 'AI'
}

// Interface pour les messages
export interface Message {
    id: string;
    text: string;
    sender: Sender;
    timestamp: number;
    tokenCount?: number;
}

// Interface pour les sessions de chat
export interface ChatSession {
    id: string;
    title: string;
    date: string;
}