import { supabase } from '@/lib/supabase';
import { Message, Sender, ChatSession } from '@/app/types';

export const createNewChat = async (userId: string, firstMessagePreview: string): Promise<ChatSession | null> => {
    const { data, error } = await supabase
        .from('chats')
        .insert({
            user_id: userId,
            title: firstMessagePreview.substring(0, 30) + (firstMessagePreview.length > 30 ? '...' : ''),
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating chat:', error);
        return null;
    }

    return {
        id: data.id,
        title: data.title,
        date: data.created_at
    };
};

export const getUserChats = async (): Promise<ChatSession[]> => {
    const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching chats:', error);
        return [];
    }

    return data.map((chat: any) => ({
        id: chat.id,
        title: chat.title,
        date: chat.created_at
    }));
};

export const getChatMessages = async (chatId: string): Promise<Message[]> => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }

    return data.map((msg: any) => ({
        id: msg.id,
        text: msg.content,
        sender: msg.sender as Sender,
        timestamp: new Date(msg.created_at).getTime(),
        tokenCount: msg.token_count
    }));
};

export const saveMessage = async (chatId: string, message: Message) => {
    const { error } = await supabase
        .from('messages')
        .insert({
            chat_id: chatId,
            sender: message.sender,
            content: message.text,
            token_count: message.tokenCount
        });

    if (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};
