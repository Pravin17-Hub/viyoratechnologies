"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const quickReplies = [
  { text: "What services do you offer?", value: "services" },
  { text: "Are you hiring?", value: "careers" },
  { text: "I want to start a project", value: "project" },
  { text: "Who founded the company?", value: "founders" }
];

export function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on mount
  useEffect(() => {
    setMessages([
      {
        id: "greeting",
        sender: "bot",
        text: "Hi there! I am the Viyora AI assistant. How can I help you learn about our student studio or check how to join us today?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking response
    setTimeout(() => {
      let replyText = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes("services") || lower.includes("offer") || lower.includes("what do you do")) {
        replyText = "We build premium Next.js websites, custom AI agent integrations, and Figma UI/UX designs. Check our /services page for details!";
      } else if (lower.includes("hire") || lower.includes("hiring") || lower.includes("job") || lower.includes("career")) {
        replyText = "We are always looking for college students with skills in coding, design, or writing to join our studio! Navigate to /careers to apply.";
      } else if (lower.includes("project") || lower.includes("start") || lower.includes("consultation") || lower.includes("hire you")) {
        replyText = "We'd love to help build your digital project! Please fill out the simple request form on our /contact page and we will get back to you.";
      } else if (lower.includes("founder") || lower.includes("ceo") || lower.includes("who are you") || lower.includes("team")) {
        replyText = "Viyora Technologies was founded in a university dorm room in 2025 by a group of passionate students. Head over to /about to read our story!";
      } else {
        replyText = "That's interesting! I'd love to help answer your questions. Feel free to submit a detailed request on our /contact form, or apply on our /careers page.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: replyText,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-55 flex flex-col items-end">
      {/* Chat drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl border border-slate-200/60 dark:border-slate-800/40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden mb-4 mr-0"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-650 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Viyora AI</h4>
                  <span className="text-[10px] text-white/80">Online & Ready</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[85%] ${
                    msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === "user"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`px-4 py-2.5 text-sm rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-purple-650 text-white rounded-tr-none"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/20"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 self-start max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0 text-blue-750">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200/20 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/20">
                {quickReplies.map((q) => (
                  <button
                    key={q.value}
                    onClick={() => handleSend(q.text)}
                    className="text-xs px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-755 dark:text-indigo-300 transition-all font-semibold"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 border-t border-slate-200/60 dark:border-slate-800/40 flex gap-2 items-center bg-white dark:bg-slate-950"
            >
              <input
                type="text"
                placeholder="Ask about careers, services..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-100 dark:bg-slate-900 border border-transparent rounded-full py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/15"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-650 via-indigo-650 to-purple-650 text-white flex items-center justify-center shadow-xl shadow-indigo-500/35 relative group cursor-pointer focus:outline-none"
      >
        <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-25 group-hover:scale-110 transition-transform duration-500 blur-sm" />
        <AnimatePresence mode="wait" initial={false}>
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
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
