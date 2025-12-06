"use client";
import React from 'react';
import { PlusIcon, SparklesIcon } from './Icon';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

import { ChatSession } from '../types';

interface SidebarProps {
    isOpen: boolean;
    onNewChat: () => void;
    sessions: ChatSession[];
    onSelectSession: (id: string) => void;
    currentSessionId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNewChat, sessions, onSelectSession, currentSessionId }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const [name, setName] = React.useState<string | null>(null);

    React.useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.full_name) {
                setName(user.user_metadata.full_name);
            } else if (user?.email) {
                setName(user.email.split('@')[0]);
            } else {
                setName("User");
            }
        };
        getUser();
    }, []);

    return (
        <div
            className={`
        fixed inset-y-0 left-0 z-30 w-[260px] bg-white border-r border-orange-100 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        flex flex-col
      `}
        >
            <div className="p-4">
                <button
                    onClick={onNewChat}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors shadow-sm"
                >
                    <PlusIcon className="w-4 h-4 text-orange-500" />
                    New chat
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2">
                <div className="text-xs font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">
                    Recent
                </div>

                {/* Mock history items */}
                <div className="space-y-1">
                    {sessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => onSelectSession(session.id)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors truncate
                                ${currentSessionId === session.id
                                    ? 'bg-orange-100 text-orange-800 font-medium'
                                    : 'text-gray-600 hover:bg-orange-50'
                                }
                            `}
                        >
                            {session.title || "New Chat"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-orange-100">
                <p className="text-center font-medium text-gray-700 mb-2">{name}</p>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                        <span className="text-xs font-bold text-orange-600 group-hover:text-red-600">EO</span>
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-medium">Sign Out</span>
                        <span className="text-xs text-gray-400 group-hover:text-red-400">End session</span>
                    </div>
                </button>
            </div>
        </div>
    );
};