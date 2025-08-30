import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bot, Sparkles, Brain, Send, StopCircle, Zap, RefreshCw } from 'lucide-react';
import { ChatProvider, useChat } from '../contexts/ChatContext.jsx';

const ChatUI = () => {
  const { messages, sendMessage, isStreaming, error, stop, reset } = useChat();
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const context = { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone };
    await sendMessage(input, context);
    setInput('');
  };

  return (
    <div className="min-h-[70vh] glassmorphism-login flex flex-col relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-primary-400 rounded-full flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gradient bg-gradient-to-r from-accent-600 to-primary-500">Niyantrana Coach</h2>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            onClick={reset} 
            className="btn-secondary flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" /> New chat
          </motion.button>
          {isStreaming && (
            <motion.button 
              onClick={stop} 
              className="btn-secondary flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StopCircle className="w-4 h-4" /> Stop
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 relative z-10 mb-4">
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/30 shadow-sm"
          >
            <div className="text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-500" /> Try asking:
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 bg-white/50 p-2 rounded-lg shadow-inner">
                "Log 2 chapatis and dal for lunch"
              </div>
              <div className="text-sm text-gray-600 bg-white/50 p-2 rounded-lg shadow-inner">
                "What should I eat post workout?"
              </div>
              <div className="text-sm text-gray-600 bg-white/50 p-2 rounded-lg shadow-inner">
                "How can I improve my metabolic health?"
              </div>
            </div>
          </motion.div>
        )}
        {messages.map((m, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-md ${m.role === 'user' 
              ? 'ml-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white' 
              : 'bg-white/70 backdrop-blur-md border border-white/30 text-gray-800'}`}
          >
            <div className="flex items-start gap-2">
              {m.role === 'user' ? (
                <div className="mt-1 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="mt-1 w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-accent-600" />
                </div>
              )}
              <div>{m.content}</div>
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-200"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSend} className="mt-2 flex items-center gap-2 relative z-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask or log naturally..."
          className="flex-1 px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/40 backdrop-blur-md shadow-inner"
        />
        <motion.button 
          type="submit" 
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isStreaming}
        >
          <Send className="w-4 h-4" /> Send
        </motion.button>
      </form>
    </div>
  );
};

const ChatbotPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl pt-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Wellness Companion</h1>
        <p className="text-gray-600">Ask questions, get tips, or log by typing naturally.</p>
      </motion.div>

      <ChatProvider>
        <ChatUI />
      </ChatProvider>
      </div>
    </div>
  );
};

export default ChatbotPage;
