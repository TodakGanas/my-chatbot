export enum Sender {
    User = 'USER',
    AI = 'AI'
}

export interface Message {
    id: string;
    text: string;
    sender: Sender;
    timestamp: number;
}

export interface ChatSession {
    id: string;
    title: string;
    date: string;
}