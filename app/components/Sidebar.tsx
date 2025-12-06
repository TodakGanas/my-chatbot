"use client";
import React from 'react';
import { PlusIcon, SparklesIcon } from './Icon';

interface SidebarProps {
    isOpen: boolean;
    onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNewChat }) => {
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
                    {['Project Idea Brainstorm', 'React vs Vue', 'Orange Color Palette', 'Weekend Plans'].map((item, i) => (
                        <button
                            key={i}
                            className="w-full text-left px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-orange-50 transition-colors truncate"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-orange-100">
                <a href="/login" className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">U</span>
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-medium">Sign In</span>
                        <span className="text-xs text-gray-500">To save history</span>
                    </div>
                </a>
            </div>
        </div>
    );
};