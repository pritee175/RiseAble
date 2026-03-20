"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Globe } from "lucide-react";
import { useTextToSpeech, useSpeechToText } from "@/hooks/useSpeech";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Get bot response from ChatGPT API (with server-side fallback)
async function getChatResponse(
  message: string,
  language: string,
  history: { text: string; sender: string }[]
): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language, history }),
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.response || "I'm sorry, please try again.";
  } catch {
    return "I'm sorry, I'm having trouble connecting. Please try again.";
  }
}

// Translate text using MyMemory API
async function translateText(text: string, src: string, tgt: string): Promise<string> {
  if (src === tgt || !text.trim()) return text;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sourceLang: src, targetLang: tgt }),
    });
    if (!res.ok) return text;
    const data = await res.json();
    return data.translatedText || text;
  } catch {
    return text;
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm the RiseAble AI Assistant. I can help you find courses, search for jobs, or understand government schemes. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { speak, stop, isSpeaking } = useTextToSpeech();
  const { startListening, isListening } = useSpeechToText();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Translate to English if needed
      let msgForAI = text.trim();
      if (language !== "en") {
        msgForAI = await translateText(text.trim(), language, "en");
      }

      const history = messages.map(m => ({ text: m.text, sender: m.sender }));
      let response = await getChatResponse(msgForAI, language, history);

      // Translate response back if needed
      if (language !== "en") {
        response = await translateText(response, "en", language);
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);

      if (ttsEnabled) {
        speak(response, language === "hi" ? "hi-IN" : "en-US");
      }
    } catch {
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    startListening(language === "hi" ? "hi-IN" : "en-US", (text) => {
      setInput(text);
      sendMessage(text);
    });
  };

  return (
    <>
      {/* Chat toggle button — positioned above accessibility toolbar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Assistant Chat"
          aria-modal="false"
          className="fixed bottom-42 right-6 z-50 w-[360px] max-h-[500px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-fade-in-up"
          style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between text-white"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={20} aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm">RiseAble AI Assistant</p>
                <p className="text-xs opacity-80">Ask me anything!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={() => setLanguage(l => (l === "en" ? "hi" : "en"))}
                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={`Switch to ${language === "en" ? "Hindi" : "English"}`}
                title={`Language: ${language === "en" ? "English" : "Hindi"}`}
              >
                <Globe size={16} />
              </button>
              {/* TTS toggle */}
              <button
                onClick={() => {
                  setTtsEnabled(!ttsEnabled);
                  if (isSpeaking) stop();
                }}
                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={ttsEnabled ? "Disable voice output" : "Enable voice output"}
                aria-pressed={ttsEnabled}
              >
                {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>

          {/* Language indicator */}
          <div
            className="px-4 py-1.5 text-xs text-center"
            style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-muted)" }}
          >
            {language === "en" ? "EN — English" : "HI — Hindi"} / {ttsEnabled ? "Voice ON" : "Voice OFF"}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-label="Chat messages" aria-live="polite" style={{ maxHeight: "320px" }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                role="article"
                aria-label={`${msg.sender === "user" ? "You" : "AI Assistant"}: ${msg.text}`}
              >
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line"
                  style={{
                    backgroundColor: msg.sender === "user" ? "var(--color-primary)" : "var(--color-bg-secondary)",
                    color: msg.sender === "user" ? "#ffffff" : "var(--color-text)",
                    borderBottomRightRadius: msg.sender === "user" ? "4px" : undefined,
                    borderBottomLeftRadius: msg.sender === "bot" ? "4px" : undefined,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start" role="status" aria-label="AI is typing">
                <div className="px-4 py-2.5 rounded-2xl text-sm" style={{ backgroundColor: "var(--color-bg-secondary)", borderBottomLeftRadius: "4px" }}>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--color-primary)", animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--color-primary)", animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--color-primary)", animationDelay: "300ms" }} />
                    <span className="sr-only">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 p-3 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: isListening ? "var(--color-error)" : "var(--color-bg-secondary)",
                color: isListening ? "#fff" : "var(--color-text-muted)",
              }}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={language === "en" ? "Type your question..." : "अपना सवाल लिखें..."}
              className="flex-1 px-4 py-2 rounded-xl text-sm border-none outline-none"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text)",
              }}
              aria-label="Chat message input"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-lg text-white transition-transform hover:scale-110 disabled:opacity-50"
              style={{ backgroundColor: "var(--color-primary)" }}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
