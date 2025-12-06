import React from 'react';
import { Message, Sender } from '../types';
import { SparklesIcon, UserIcon } from './Icon';

interface ChatBubbleProps {
    message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
    const isAi = message.sender === Sender.AI;

    return (
        <div className={`group w-full text-gray-800 border-b border-black/5 ${isAi ? 'bg-orange-50/50' : 'bg-white'}`}>
            <div className="max-w-3xl mx-auto px-4 py-8 flex gap-4 md:gap-6">
                <div className="flex-shrink-0 flex flex-col relative items-end">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${isAi ? 'bg-orange-500' : 'bg-gray-500'}`}>
                        {isAi ? (
                            <SparklesIcon className="w-5 h-5 text-white" />
                        ) : (
                            <UserIcon className="w-5 h-5 text-white" />
                        )}
                    </div>
                </div>

                <div className="relative flex-1 overflow-hidden">
                    <div className="prose prose-orange max-w-none leading-7 text-[0.95rem] md:text-[1rem]">
                        {/* Simple whitespace preservation for the text */}
                        <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                </div>

                {isAi && message.tokenCount !== undefined && (
                    <div className="flex-shrink-0 flex flex-col justify-end">
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                            {message.tokenCount} tokens
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};