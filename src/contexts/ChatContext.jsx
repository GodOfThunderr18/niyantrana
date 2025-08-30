import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createChatModel, systemPrompt } from '../services/geminiClient.jsx';

const ChatContext = createContext();

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};

const STORAGE_KEY = 'niyantrana_chat_history_v1';

export const ChatProvider = ({ children, modelName = 'gemini-1.5-flash' }) => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const model = useMemo(() => createChatModel(modelName), [modelName]);
  const abortRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const reset = () => {
    setMessages([]);
    setError(null);
  };

  const sendMessage = async (userText, context = {}) => {
    if (!userText?.trim()) return;
    setError(null);

    const newUserMsg = { role: 'user', content: userText, ts: Date.now() };
    setMessages(prev => [...prev, newUserMsg]);

    setIsStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const historyParts = messages.map(m => ({ role: m.role, content: m.content }));
      const inputParts = [
        { text: systemPrompt },
        { text: JSON.stringify({ userContext: context }) },
        ...historyParts.map(h => ({ text: `${h.role.toUpperCase()}: ${h.content}` })),
        { text: `USER: ${userText}` },
      ];

      // Use generateContentStream for streaming
      const stream = await model.generateContentStream({
        contents: [{ role: 'user', parts: inputParts }],
        signal: controller.signal,
      });

      let fullText = '';
      // Handle both real Gemini API stream and FallbackStream
      const streamIterator = typeof stream.stream === 'function' ? stream.stream() : stream.stream;
      for await (const chunk of streamIterator) {
        const c = chunk?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (c) {
          fullText += c;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === 'assistant' && last.streaming) {
              const copy = [...prev];
              copy[copy.length - 1] = { ...last, content: fullText, ts: Date.now() };
              return copy;
            }
            return [...prev, { role: 'assistant', content: c, streaming: true, ts: Date.now() }];
          });
        }
      }

      setMessages(prev => prev.map(m => (m.streaming ? { ...m, streaming: false } : m)));
    } catch (err) {
      if (err?.name === 'AbortError' || err?.message === 'AbortError') return;
      console.error(err);
      setError('Chat service temporarily unavailable. Please try again.');
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const stop = () => {
    abortRef.current?.abort();
  };

  const value = {
    messages,
    isStreaming,
    error,
    sendMessage,
    reset,
    stop,
  };

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};


