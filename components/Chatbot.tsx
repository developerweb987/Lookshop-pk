// components/Chatbot.tsx
'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! Welcome to Lookshop.pk Support. Ask me anything about accessories or look up code "LOOK20" for savings!' }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, connection drop experienced. Please re-send.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating launcher badge, hiding itself if window opens */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105 font-bold text-sm tracking-wide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <span>Chat Assistance</span>
        </button>
      )}

      {/* Main Chat Interface Window */}
      {isOpen && (
        <div className="bg-white border border-gray-100 w-80 md:w-96 h-[450px] rounded-2xl shadow-2xl absolute bottom-0 right-0 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Top Panel Window Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 font-bold text-base flex justify-between items-center shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Lookshop Assistant</span>
            </div>
            
            {/* Dedicated Close Button Inside Window */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors text-xs font-black tracking-widest uppercase"
              title="Close Chat"
            >
              ✕ 
            </button>
          </div>
          
          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs md:text-sm font-medium leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xs' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-xs'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[11px] text-gray-400 font-bold tracking-wide pl-1 animate-pulse">
                Typing response...
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Form input field */}
          <form onSubmit={sendMessage} className="p-3 border-t border-gray-100 flex gap-2 bg-white">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about covers, sales, delivery terms..." 
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-medium text-gray-800"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}