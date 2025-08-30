import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, Send, X, RefreshCw, StopCircle, Zap } from 'lucide-react';
import { ChatProvider, useChat } from '../contexts/ChatContext.jsx';

const ChatWindow = ({ onClose }) => {
  const { messages, sendMessage, isStreaming, error, stop, reset } = useChat();
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const context = { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone };
    await sendMessage(input, context);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20 bg-gradient-to-r from-accent-500/10 to-primary-500/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-primary-400 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800">Niyantrana Coach</h3>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            onClick={reset}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </motion.button>
          {isStreaming && (
            <motion.button
              onClick={stop}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StopCircle className="w-4 h-4 text-gray-600" />
            </motion.button>
          )}
          <motion.button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8">
            <Bot className="w-8 h-8 mx-auto mb-2 text-accent-400" />
            <p>Hi! I'm your wellness companion.</p>
            <p className="text-xs mt-1">Ask me anything about metabolic health!</p>
          </div>
        )}
        {messages.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              m.role === 'user'
                ? 'ml-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                : 'bg-white/70 border border-white/30 text-gray-800'
            }`}
          >
            <div className="flex items-start gap-2">
              {m.role === 'user' ? (
                <MessageCircle className="w-3 h-3 mt-0.5 text-white/80" />
              ) : (
                <Zap className="w-3 h-3 mt-0.5 text-accent-600" />
              )}
              <div className="flex-1">{m.content}</div>
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/20">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask or log naturally..."
            className="flex-1 px-3 py-2 text-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/40 backdrop-blur-sm"
            disabled={isStreaming}
          />
          <motion.button
            type="submit"
            className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isStreaming || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

const ChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="hidden md:flex fixed bottom-6 right-6 z-40 w-14 h-14 bg-secondary-600 hover:bg-secondary-700 rounded-full shadow-card transition-colors duration-200 items-center justify-center text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <ChatProvider>
            <ChatWindow onClose={() => setIsOpen(false)} />
          </ChatProvider>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatLauncher;


