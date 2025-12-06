"use client";
import { useState, useRef, useEffect } from 'react';
import { Sender, Message, ChatSession } from './types';
import { sendMessageToAi, getMessage } from './api/aiService';
import { createNewChat, getUserChats, getChatMessages, saveMessage } from '@/lib/chatService';
import { Sidebar } from './components/Sidebar';
import { ChatBubble } from './components/ChatBubble';
import { ChatInput } from './components/ChatInput';
import { MenuIcon, SparklesIcon } from './components/Icon';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
        setUser(session.user);
        loadChats();
      }
      setIsAuthChecking(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
        setIsAuthenticated(false);
        setUser(null);
        setSessions([]);
      } else {
        setIsAuthenticated(true);
        setUser(session.user);
        loadChats();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const loadChats = async () => {
    const chats = await getUserChats();
    setSessions(chats);
  };

  const scrollToBottom = () => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.User,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    let chatId = currentSessionId;

    try {
      // 1. If no current chat, create one
      if (!chatId && user) {
        const newChat = await createNewChat(user.id, text);
        if (newChat) {
          chatId = newChat.id;
          setCurrentSessionId(chatId);
          setSessions(prev => [newChat, ...prev]);
        }
      }

      // 2. Save user message if we have a chat ID
      if (chatId) {
        await saveMessage(chatId, userMessage);
      }

      // 3. Get AI Response
      const responseText = await fetch('/api/getMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }).then(res => res.json()).then(data => data.message);

      const token = await fetch('/api/getToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }).then(res => res.json()).then(data => data.message);
      console.log("token :", token);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.AI,
        timestamp: Date.now(),
        tokenCount: token
      };

      setMessages(prev => [...prev, aiMessage]);

      // 4. Save AI message
      if (chatId) {
        await saveMessage(chatId, aiMessage);
      }

    } catch (error) {
      console.error("Failed to get response or save message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    setIsSidebarOpen(false);
  };

  const handleSelectSession = async (id: string) => {
    setCurrentSessionId(id);
    setIsSidebarOpen(false);
    setIsLoading(true);
    try {
      const msgs = await getChatMessages(id);
      setMessages(msgs);
    } catch (error) {
      console.error("Failed to load chat messages", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center animate-pulse">
            <SparklesIcon className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600/50 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onNewChat={handleNewChat}
        sessions={sessions}
        onSelectSession={handleSelectSession}
        currentSessionId={currentSessionId}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 md:hidden border-b border-orange-100 bg-white z-10 sticky top-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-orange-50 rounded-lg"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <span className="font-semibold text-gray-700">OrangeAI</span>
          <div className="w-8" /> {/* Spacer for centering */}
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-800">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <SparklesIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
            </div>
          ) : (
            <div className="pb-32">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="w-full bg-orange-50/50 border-b border-black/5">
                  <div className="max-w-3xl mx-auto px-4 py-8 flex gap-4 md:gap-6">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-orange-500">
                      <SparklesIcon className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollEndRef} />
            </div>
          )}
        </div>

        {/* Input Area (Sticky Bottom) */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-4">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;