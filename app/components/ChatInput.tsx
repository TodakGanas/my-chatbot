"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './Icon';

interface ChatInputProps {
    onSend: (text: string) => void;
    isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // redimensionner automatiquement la zone de texte
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [text]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!text.trim() || isLoading) return;
        onSend(text);
        setText('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 w-full pt-2">
            <div className="relative flex items-end w-full p-3 bg-white border border-orange-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-300 transition-all">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message OrangeAI..."
                    rows={1}
                    className="w-full py-2 pr-10 pl-2 bg-transparent border-0 focus:ring-0 resize-none max-h-[200px] overflow-y-auto text-gray-800 placeholder-gray-400 outline-none"
                    disabled={isLoading}
                />
                <button
                    onClick={() => handleSubmit()}
                    disabled={!text.trim() || isLoading}
                    className={`absolute bottom-3 right-3 p-1.5 rounded-lg transition-colors ${text.trim() && !isLoading
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-orange-100 text-orange-300 cursor-not-allowed'
                        }`}
                >
                    <SendIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="text-center py-2">
                <p className="text-xs text-gray-400">
                    OrangeAI v1.0.0 used gemini-2.5-flash and created by Ahmad Mirza
                </p>
            </div>
        </div>
    );
};