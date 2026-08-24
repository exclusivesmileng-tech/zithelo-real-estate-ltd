"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowUp, RotateCcw, Check } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "zithelo-assistant-thread";
const CONVERSATION_KEY = "zithelo-assistant-conversation-id";

/**
 * Fires a GA event if analytics loaded. `gtag` only exists once the visitor has
 * accepted cookies, so the optional call is also the consent check.
 */
function track(event: string, params?: Record<string, string | number>) {
  try {
    (
      window as unknown as {
        gtag?: (t: string, e: string, p?: Record<string, unknown>) => void;
      }
    ).gtag?.("event", event, params);
  } catch {
    /* analytics must never break the chat */
  }
}

/** Stable id grouping this visitor's turns in the conversation log. */
function conversationId(): string {
  try {
    const existing = sessionStorage.getItem(CONVERSATION_KEY);
    if (existing) return existing;
    const fresh =
      globalThis.crypto?.randomUUID?.() ??
      `c-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(CONVERSATION_KEY, fresh);
    return fresh;
  } catch {
    return "unknown";
  }
}

const GREETING =
  "Hello — I'm the Zithelo assistant. I can explain our developments, the 25-year lease model, and how investing from abroad works. What would you like to know?";

const STARTERS = [
  "Tell me about Andoyi House",
  "How does the 25-year lease work?",
  "Can I invest from the UK?",
  "What returns can I expect?",
];

/* ── Minimal inline renderer ──────────────────────────────────────────────
   The assistant replies in light markdown — **bold** and [text](/path) links.
   Rendering those as React elements keeps it safe: no HTML is ever injected.  */
function renderInline(text: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));

    const [, linkText, href, boldText] = match;
    if (linkText && href) {
      const internal = href.startsWith("/");
      const safe = internal || /^https?:\/\//i.test(href);
      if (!safe) {
        nodes.push(linkText);
      } else if (internal) {
        nodes.push(
          <Link
            key={`${keyPrefix}-l${i}`}
            href={href}
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            {linkText}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={`${keyPrefix}-l${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            {linkText}
          </a>
        );
      }
    } else if (boldText) {
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-foreground">
          {boldText}
        </strong>
      );
    }

    last = pattern.lastIndex;
    i++;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function MessageBody({ text, id }: { text: string; id: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, bi) => (
        <p key={`${id}-p${bi}`} className={bi > 0 ? "mt-3" : undefined}>
          {block.split("\n").map((line, li) => (
            <span key={`${id}-p${bi}-${li}`}>
              {li > 0 && <br />}
              {renderInline(line, `${id}-${bi}-${li}`)}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

export default function AIAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Restore the thread so navigating between pages doesn't lose the conversation.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      /* private mode or blocked storage — start fresh */
    }
  }, []);

  useEffect(() => {
    try {
      if (messages.length) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
      }
    } catch {
      /* non-fatal */
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Drop any in-flight request if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setError(null);
      setInput("");

      if (messages.length === 0) track("assistant_conversation_start", { page: pathname });
      track("assistant_message_sent", { page: pathname });

      const history = [...messages, { role: "user" as const, content: trimmed }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            page: pathname,
            conversationId: conversationId(),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const payload = await res.json().catch(() => null);
          throw new Error(payload?.error ?? "The assistant is unavailable right now.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let answer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split("\n\n");
          buffer = frames.pop() ?? "";

          for (const frame of frames) {
            const line = frame.split("\n").find((l) => l.startsWith("data: "));
            if (!line) continue;

            let event: { type: string; text?: string; message?: string };
            try {
              event = JSON.parse(line.slice(6));
            } catch {
              continue;
            }

            if (event.type === "text" && event.text) {
              answer += event.text;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: answer };
                return next;
              });
            } else if (event.type === "tool") {
              setLeadCaptured(true);
              track("assistant_lead_captured", { page: pathname });
            } else if (event.type === "error") {
              setError(event.message ?? "Something went wrong.");
            }
          }
        }

        if (!answer.trim()) {
          setMessages((prev) => prev.slice(0, -1));
          setError((e) => e ?? "No reply came back. Please try again.");
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) => prev.slice(0, -1));
        setError((err as Error).message);
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, pathname, streaming]
  );

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setLeadCaptured(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(CONVERSATION_KEY);
    } catch {
      /* non-fatal */
    }
  };

  // Not in the Sanity admin — it's a visitor-facing widget.
  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      {/* ── Launcher — sits directly above the contact FAB ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              setOpen(true);
              track("assistant_opened", { page: pathname });
            }}
            aria-label="Ask the Zithelo assistant"
            className="group fixed bottom-[calc(5rem+64px+env(safe-area-inset-bottom))] lg:bottom-[calc(2rem+64px+env(safe-area-inset-bottom))] right-4 lg:right-6 z-50 w-[52px] h-[52px] rounded-full bg-[hsl(var(--charcoal))] flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
          >
            <Sparkles size={20} className="text-primary" />
            <span className="hidden sm:block absolute right-16 whitespace-nowrap bg-foreground text-background dark:text-foreground dark:bg-card text-xs font-body font-semibold px-3 py-1.5 rounded-sm shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
              Ask Zithelo AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Zithelo AI assistant"
            className="fixed z-50 bg-card border border-border shadow-2xl rounded-sm flex flex-col overflow-hidden
                       inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] top-20
                       sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-[calc(2rem+env(safe-area-inset-bottom))]
                       sm:w-[400px] sm:h-[min(620px,calc(100vh-8rem))]"
          >
            {/* Header */}
            <div className="gold-gradient px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--charcoal))] flex items-center justify-center">
                  <Sparkles size={15} className="text-primary" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-primary-foreground leading-tight">
                    Zithelo Assistant
                  </p>
                  <p className="font-body text-[10px] text-primary-foreground/70 leading-tight">
                    Answers about our developments &amp; investing
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={reset}
                    aria-label="Start a new conversation"
                    className="w-8 h-8 rounded-sm flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground hover:bg-black/10 transition-colors"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close the assistant"
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground hover:bg-black/10 transition-colors"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              aria-live="polite"
              aria-atomic="false"
            >
              <div className="font-body text-sm leading-relaxed text-muted-foreground bg-muted/40 rounded-sm px-3.5 py-3">
                <MessageBody text={GREETING} id="greeting" />
              </div>

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] bg-[hsl(var(--charcoal))] text-white font-body text-sm leading-relaxed rounded-sm px-3.5 py-2.5">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="font-body text-sm leading-relaxed text-foreground/90"
                  >
                    {m.content ? (
                      <MessageBody text={m.content} id={`m${i}`} />
                    ) : (
                      <span className="inline-flex gap-1 items-center py-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: d * 0.2,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                )
              )}

              {leadCaptured && (
                <div className="flex items-center gap-2 text-[11px] font-body text-primary bg-primary/10 rounded-sm px-3 py-2">
                  <Check size={13} />
                  Your details have been sent to the Zithelo investment team.
                </div>
              )}

              {error && (
                <div className="font-body text-xs text-destructive bg-destructive/10 rounded-sm px-3 py-2">
                  {error}
                </div>
              )}

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-[11px] font-body font-semibold px-3 py-1.5 border border-border rounded-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-border px-3 py-3 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2"
              >
                <label htmlFor="zithelo-assistant-input" className="sr-only">
                  Ask the Zithelo assistant a question
                </label>
                <textarea
                  id="zithelo-assistant-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Ask about pricing, yields, buying from abroad…"
                  maxLength={2000}
                  className="flex-1 resize-none max-h-28 bg-background border border-border rounded-sm px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  aria-label="Send message"
                  className="w-10 h-10 shrink-0 rounded-sm gold-gradient flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  <ArrowUp size={17} className="text-primary-foreground" />
                </button>
              </form>
              <p className="mt-2 font-body text-[10px] text-muted-foreground/70 leading-snug">
                AI assistant — may be imperfect. Figures are illustrative, not
                financial advice. Never share bank or passport details here.
              </p>
              <p className="mt-1.5 font-body text-[10px] text-muted-foreground/60 text-center">
                Powered by{" "}
                <a
                  href="https://harzotech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-muted-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  Harzotech
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
