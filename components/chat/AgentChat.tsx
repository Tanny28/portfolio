"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { X, Send, Bot, Trash2, MessageSquareCode } from "lucide-react";

const CHIPS = [
  "What's your strongest project?",
  "Tell me about the drone agent",
  "What internships are you looking for?",
];

export default function AgentChat() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append } =
    useChat({ api: "/api/chat" });

  // Load persisted messages once on mount
  useEffect(() => {
    if (loaded) return;
    try {
      const saved = sessionStorage.getItem("portfolio_chat");
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, [loaded, setMessages]);

  // Persist messages
  useEffect(() => {
    if (!loaded || messages.length === 0) return;
    sessionStorage.setItem("portfolio_chat", JSON.stringify(messages));
  }, [messages, loaded]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  function clearChat() {
    setMessages([]);
    sessionStorage.removeItem("portfolio_chat");
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask my AI"
        title="Ask my AI"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-center justify-center size-14 rounded-full bg-accent shadow-[0_0_24px_rgba(0,212,255,0.5)] hover:shadow-[0_0_36px_rgba(0,212,255,0.7)] transition-all"
      >
        <MessageSquareCode className="size-5 text-background" />
        <span className="font-mono text-[9px] text-background leading-none mt-0.5">AI</span>
      </button>

      {/* Panel */}
      <div
        className={`fixed z-50 transition-transform duration-300 ease-out
          sm:bottom-24 sm:right-6 sm:top-auto sm:left-auto sm:w-[400px] sm:h-[calc(100vh-7rem)] sm:rounded-xl
          bottom-0 left-0 right-0 h-[85vh] rounded-t-xl
          ${open ? "translate-y-0 sm:translate-y-0 opacity-100" : "translate-y-full sm:translate-x-full opacity-0 pointer-events-none"}
          border border-accent/30 bg-card/95 backdrop-blur-md shadow-[0_0_60px_rgba(0,212,255,0.12)] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-border shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-accent" />
              <span className="font-mono text-sm font-medium">Chat with Tanmay&apos;s AI</span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
              Ask about projects, skills, or experience
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={clearChat}
              title="Clear chat"
              className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <Trash2 className="size-3.5" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <Bot className="size-8 text-accent/40 mx-auto" />
                <p className="font-mono text-xs text-muted-foreground">
                  Ask me anything about Tanmay.
                </p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="size-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="size-1.5 rounded-full bg-accent" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent text-background font-medium"
                    : "bg-muted/60 text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-2 items-center">
              <div className="size-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                <span className="size-1.5 rounded-full bg-accent" />
              </div>
              <div className="flex items-center gap-1 px-3 py-2 bg-muted/60 rounded-lg">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 rounded-full bg-accent animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Chips — only when no messages yet */}
        {messages.length === 0 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
            {CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => append({ role: "user", content: c })}
                className="text-left px-2.5 py-1 rounded-full border border-border bg-background/60 font-mono text-[10px] text-foreground/80 hover:border-accent/60 hover:text-accent transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-border shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask anything..."
              className="flex-1 resize-none rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/60 min-h-[38px] max-h-24"
              style={{ height: "38px" }}
              onInput={(e) => {
                const t = e.currentTarget;
                t.style.height = "38px";
                t.style.height = Math.min(t.scrollHeight, 96) + "px";
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="size-[38px] shrink-0 flex items-center justify-center rounded-md bg-accent text-background disabled:opacity-40 hover:shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all"
            >
              <Send className="size-4" />
            </button>
          </form>
          <p className="font-mono text-[9px] text-muted-foreground mt-1.5 text-center">
            Powered by Llama 3.3 via Groq · Responses may be inaccurate
          </p>
        </div>
      </div>
    </>
  );
}
