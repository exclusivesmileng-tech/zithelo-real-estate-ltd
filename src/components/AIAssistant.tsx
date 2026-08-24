"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  X,
  ArrowUp,
  ArrowRight,
  RotateCcw,
  Check,
  Mic,
  Maximize2,
  Minimize2,
  PhoneCall,
} from "lucide-react";
import BookCallbackModal from "@/components/BookCallbackModal";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Mirrors the server's LeadFormContext (src/lib/assistant/tools.ts) — kept as
 *  a local duplicate rather than a shared import so this client component
 *  never pulls in server-only modules (mailer, Airtable). */
interface LeadFormContext {
  enquiry_type: string;
  project_interest?: string;
  budget?: string;
  timeline?: string;
  summary: string;
}

/** Mirrors the server's ProjectCard (src/lib/assistant/live-knowledge.ts). */
interface ProjectCardData {
  title: string;
  slug: string;
  image: string | null;
  badge?: string;
  type?: string;
  location?: string;
  shortDesc?: string;
  stats: { label: string; value: string }[];
}

const STORAGE_KEY = "zithelo-assistant-thread";
const CONVERSATION_KEY = "zithelo-assistant-conversation-id";
const SEEN_KEY = "zithelo-assistant-seen";

/* ── Voice input ───────────────────────────────────────────────────────────
   The Web Speech API has no official TypeScript lib types and ships under a
   vendor-prefixed name in most browsers, so it's typed locally to the shape
   this component actually uses rather than pulled in as `any`.             */
interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

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

/** Plain-text transcript sent alongside a submitted lead form, for the team to read. */
function buildTranscript(messages: ChatMessage[]): string {
  return messages
    .filter((m) => m.content.trim())
    .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
    .join("\n\n");
}

const GREETING =
  "Hi, I'm Linda 👋 — I'm online now and happy to help. Ask me anything about our developments, the 25-year lease model, or investing from abroad.";

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
            className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-2 hover:text-primary transition-colors duration-150"
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
            className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-2 hover:text-primary transition-colors duration-150"
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

interface LeadCaptureFormProps {
  context: LeadFormContext;
  page?: string;
  transcript: string;
  onDone: (success: boolean) => void;
  onDismiss: () => void;
}

/**
 * Inline contact form the assistant surfaces via its `request_lead_form` tool.
 * A real form beats asking for name/email/phone in chat prose — nothing to
 * mishear over voice input, nothing for the model to mis-transcribe, and the
 * visitor can see exactly what's being sent. Submits straight to
 * /api/assistant/lead, bypassing the model entirely.
 */
function LeadCaptureForm({ context, page, transcript, onDone, onDismiss }: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const canSubmit = name.trim().length > 0 && (email.trim().length > 0 || phone.trim().length > 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          country: country.trim() || undefined,
          ...context,
          page,
          transcript,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setFormError(data?.message ?? "Something went wrong — please try again.");
        setSubmitting(false);
        return;
      }
      onDone(true);
    } catch {
      setFormError("Something went wrong — please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="border border-primary/25 bg-primary/5 rounded-sm p-3.5 space-y-2.5"
    >
      <p className="font-body text-xs font-semibold text-foreground">
        Share your details and the investment team will reach out.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <label className="col-span-2 sr-only" htmlFor="lead-name">
          Name
        </label>
        <input
          id="lead-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          maxLength={200}
          className="col-span-2 bg-background border border-border rounded-sm px-2.5 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <label className="sr-only" htmlFor="lead-email">
          Email
        </label>
        <input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          maxLength={200}
          className="bg-background border border-border rounded-sm px-2.5 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <label className="sr-only" htmlFor="lead-phone">
          Phone or WhatsApp
        </label>
        <input
          id="lead-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone / WhatsApp"
          maxLength={60}
          className="bg-background border border-border rounded-sm px-2.5 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <label className="col-span-2 sr-only" htmlFor="lead-country">
          Country
        </label>
        <input
          id="lead-country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country (optional)"
          maxLength={100}
          className="col-span-2 bg-background border border-border rounded-sm px-2.5 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <p className="font-body text-[10px] text-muted-foreground/70">
        Email or phone — whichever&apos;s easiest to reach you on.
      </p>

      {formError && <p className="font-body text-[11px] text-destructive">{formError}</p>}

      <div className="flex items-center gap-3 pt-0.5">
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="flex-1 h-9 rounded-sm gold-gradient font-body text-xs font-bold text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {submitting ? "Sending…" : "Send my details"}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          disabled={submitting}
          className="font-body text-[11px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
        >
          Not now
        </button>
      </div>
    </form>
  );
}

interface ProjectCardViewProps {
  card: ProjectCardData;
}

/**
 * Inline visual card for a development, surfaced by the assistant's
 * `show_project_card` tool. Reserves its full aspect-ratio box before the
 * image loads (no layout jump as it streams in) and fades the image in on
 * load rather than popping it in, so it reads as a deliberate reveal even on
 * a slow connection.
 */
function ProjectCardView({ card }: ProjectCardViewProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${card.slug}`}
        className="group block border border-border rounded-sm overflow-hidden bg-background hover:border-primary/40 transition-colors duration-200"
      >
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {!card.image && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
              <Sparkles size={22} />
            </div>
          )}
          {card.image && !loaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          {card.image && (
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {card.badge && (
            <span className="absolute top-2 left-2 gold-gradient text-primary-foreground font-body text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-sm">
              {card.badge}
            </span>
          )}
        </div>

        <div className="p-3">
          <p className="font-display text-sm font-bold text-foreground">{card.title}</p>
          {(card.type || card.location) && (
            <p className="font-body text-[11px] text-muted-foreground mt-0.5">
              {[card.type, card.location].filter(Boolean).join(" · ")}
            </p>
          )}

          {card.stats.length > 0 && (
            <div className="flex gap-4 mt-2.5 pt-2.5 border-t border-border">
              {card.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xs font-bold text-foreground">{s.value}</p>
                  <p className="font-body text-[9px] uppercase tracking-wide text-muted-foreground/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <span className="inline-flex items-center gap-1 mt-3 font-body text-[11px] font-semibold text-primary group-hover:gap-1.5 transition-all duration-200">
            View {card.title}
            <ArrowRight size={12} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AIAssistant() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  // The old floating contact menu's "Book a Call" had no other trigger
  // site-wide, so it moved here rather than being dropped in the FAB merge.
  const [showCallback, setShowCallback] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormContext | null>(null);
  const [quickReplies, setQuickReplies] = useState<string[] | null>(null);
  // Project cards, anchored to the assistant-message index they arrived
  // during — so a card stays put beside the turn that mentioned it as the
  // conversation grows, rather than floating at the bottom of the transcript.
  const [cardsByTurn, setCardsByTurn] = useState<Record<number, ProjectCardData[]>>({});
  const [error, setError] = useState<string | null>(null);
  // Draws the eye to the launcher until the visitor notices it once — then
  // stops for the rest of the session so it doesn't nag returning browsers.
  const [wantsAttention, setWantsAttention] = useState(false);
  // A proactive speech-bubble greeting from Linda, shown once per session to
  // first-time visitors — same "haven't opened it yet" signal as the pulse.
  const [showGreeting, setShowGreeting] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [listening, setListening] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  // Text already in the box when voice input started — new speech is appended
  // after it rather than overwriting whatever the visitor had already typed.
  const voiceBaseRef = useRef("");

  // Restore the thread so navigating between pages doesn't lose the conversation.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
      setWantsAttention(sessionStorage.getItem(SEEN_KEY) !== "1");
    } catch {
      /* private mode or blocked storage — start fresh, skip the animation */
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
  }, [messages, streaming, cardsByTurn]);

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

  // Proactively greet a first-time visitor a few seconds in — after the cookie
  // banner has had its moment — then let it fade if they don't engage. Never
  // reappears once they open the chat (wantsAttention flips off) or dismiss it.
  useEffect(() => {
    if (!wantsAttention || open) return;
    const showAt = setTimeout(() => setShowGreeting(true), 3200);
    return () => clearTimeout(showAt);
  }, [wantsAttention, open]);

  useEffect(() => {
    if (!showGreeting) return;
    const hideAt = setTimeout(() => setShowGreeting(false), 11000);
    return () => clearTimeout(hideAt);
  }, [showGreeting]);

  useEffect(() => {
    setVoiceSupported(getSpeechRecognitionCtor() !== null);
  }, []);

  // Voice input has no business staying hot once the chat is closed.
  useEffect(() => {
    if (!open) recognitionRef.current?.stop();
  }, [open]);

  // Drop any in-flight request or listening mic if the widget unmounts.
  useEffect(
    () => () => {
      abortRef.current?.abort();
      recognitionRef.current?.stop();
    },
    []
  );

  const toggleVoice = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang =
      typeof navigator !== "undefined" && navigator.language ? navigator.language : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    voiceBaseRef.current = input ? `${input.trim()} ` : "";

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interimText += result[0].transcript;
      }
      if (finalText) voiceBaseRef.current += `${finalText} `;
      setInput((voiceBaseRef.current + interimText).trimStart());
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setError("Microphone access is blocked — check your browser's site permissions.");
      }
      // "no-speech" / "aborted" are routine (visitor tapped it off, or stayed
      // quiet) and don't need surfacing as an error.
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }, [input, listening]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      recognitionRef.current?.stop();
      setError(null);
      setInput("");
      // The old offer was for the last question — a new message supersedes it.
      setQuickReplies(null);

      if (messages.length === 0) track("assistant_conversation_start", { page: pathname });
      track("assistant_message_sent", { page: pathname });

      const history = [...messages, { role: "user" as const, content: trimmed }];
      // Where the new assistant reply will land — any card this turn produces
      // gets anchored here so it stays with the message that introduced it.
      const turnIndex = history.length;
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

            let event: {
              type: string;
              text?: string;
              message?: string;
              context?: LeadFormContext;
              options?: unknown;
              card?: ProjectCardData;
            };
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
            } else if (event.type === "lead_form" && event.context) {
              setLeadForm(event.context);
              setQuickReplies(null);
              track("assistant_lead_form_shown", { page: pathname });
            } else if (event.type === "project_card" && event.card) {
              const card = event.card;
              setCardsByTurn((prev) => ({
                ...prev,
                [turnIndex]: [...(prev[turnIndex] ?? []), card],
              }));
              track("assistant_project_card_shown", { page: pathname, project: card.slug });
            } else if (event.type === "quick_replies" && Array.isArray(event.options)) {
              const options = event.options.filter(
                (o): o is string => typeof o === "string" && o.trim().length > 0
              );
              if (options.length >= 2) setQuickReplies(options);
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
    setLeadForm(null);
    setQuickReplies(null);
    setCardsByTurn({});
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
      {/* ── Proactive greeting bubble from Linda — first-time visitors only ── */}
      <AnimatePresence>
        {showGreeting && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 bottom-[calc(5rem+68px+env(safe-area-inset-bottom))] lg:bottom-[calc(2rem+68px+env(safe-area-inset-bottom))] right-4 lg:right-6 w-64 max-w-[calc(100vw-6rem)]"
          >
            <div className="relative bg-card border border-border rounded-xl shadow-2xl p-3.5">
              <button
                onClick={() => setShowGreeting(false)}
                aria-label="Dismiss"
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[hsl(var(--charcoal))] flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={11} />
              </button>

              <button
                onClick={() => {
                  setShowGreeting(false);
                  setOpen(true);
                  setWantsAttention(false);
                  try {
                    sessionStorage.setItem(SEEN_KEY, "1");
                  } catch {
                    /* non-fatal */
                  }
                  track("assistant_opened", { page: pathname });
                }}
                className="flex items-start gap-2.5 text-left w-full"
              >
                <div className="relative w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-primary-foreground" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-foreground">Linda · online now</p>
                  <p className="font-body text-[11px] text-muted-foreground leading-snug mt-0.5">
                    Hi! Ask me anything about Zithelo — I&apos;m happy to help. 👋
                  </p>
                </div>
              </button>

              {/* Pointer tail toward the launcher */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Launcher — the single floating button for chat AND quick contact ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              setOpen(true);
              setWantsAttention(false);
              try {
                sessionStorage.setItem(SEEN_KEY, "1");
              } catch {
                /* non-fatal */
              }
              track("assistant_opened", { page: pathname });
            }}
            aria-label="Chat with Linda, the Zithelo AI assistant"
            className="group fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] lg:bottom-[calc(2rem+env(safe-area-inset-bottom))] right-4 lg:right-6 z-50 w-[52px] h-[52px] rounded-full gold-gradient flex items-center justify-center shadow-xl shadow-primary/30 hover:opacity-90 hover:scale-110 transition-all duration-200"
          >
            {/* A gentle, permanent "online" breathing ring — always on, low-key,
                the tawk.to-style signal that someone's there. Independent of the
                stronger one-time attention burst below. */}
            {!reducedMotion && (
              <motion.span
                className="absolute inset-0 rounded-full bg-primary/40"
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* Stronger attention ring — fades out for good once the visitor
                opens the chat once this session. */}
            {wantsAttention && !reducedMotion && (
              <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
            )}

            <motion.span
              className="relative"
              animate={
                wantsAttention && !reducedMotion
                  ? { rotate: [0, -12, 12, -8, 8, 0] }
                  : undefined
              }
              transition={{
                duration: 0.7,
                repeat: Infinity,
                repeatDelay: 3.3,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={20} className="text-primary-foreground" />
            </motion.span>

            {/* Permanent online dot — visible even after the attention burst ends */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background" />

            <span className="hidden sm:block absolute right-16 whitespace-nowrap bg-foreground text-background dark:text-foreground dark:bg-card text-xs font-body font-semibold px-3 py-1.5 rounded-sm shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
              Chat with Linda · online now
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
            className={
              maximized
                ? // Sized via inset (top/right/bottom/left), not a transform —
                  // that keeps it conflict-free with this element's own
                  // framer-motion animate/exit transforms, which write directly
                  // to the transform style and would silently clobber a
                  // translate-based centering approach on the same node.
                  "fixed z-50 bg-card border border-border shadow-2xl rounded-sm flex flex-col overflow-hidden inset-x-1 top-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:inset-8 sm:max-w-3xl sm:max-h-[880px] sm:mx-auto sm:my-auto"
                : "fixed z-50 bg-card border border-border shadow-2xl rounded-sm flex flex-col overflow-hidden inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] top-20 sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-[calc(2rem+env(safe-area-inset-bottom))] sm:w-[400px] sm:h-[min(620px,calc(100vh-8rem))]"
            }
          >
            {/* Header */}
            <div className="gold-gradient px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-[hsl(var(--charcoal))] flex items-center justify-center shrink-0">
                  <Sparkles size={15} className="text-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[hsl(var(--gold))]" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-primary-foreground leading-tight">
                    Linda
                  </p>
                  <p className="font-body text-[10px] text-primary-foreground/70 leading-tight">
                    Zithelo AI Assistant · online now
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
                  onClick={() => setMaximized((v) => !v)}
                  aria-label={maximized ? "Shrink the assistant" : "Maximize the assistant"}
                  className="hidden sm:flex w-8 h-8 rounded-sm items-center justify-center text-primary-foreground/80 hover:text-primary-foreground hover:bg-black/10 transition-colors"
                >
                  {maximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
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
                  <div key={i}>
                    <div className="font-body text-sm leading-relaxed text-foreground/90">
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

                    {cardsByTurn[i]?.map((card) => (
                      <div key={card.slug} className="mt-3 max-w-[260px]">
                        <ProjectCardView card={card} />
                      </div>
                    ))}
                  </div>
                )
              )}

              {leadForm && (
                <LeadCaptureForm
                  context={leadForm}
                  page={pathname}
                  transcript={buildTranscript(messages)}
                  onDone={(success) => {
                    setLeadForm(null);
                    if (success) {
                      setLeadCaptured(true);
                      track("assistant_lead_captured", { page: pathname });
                    }
                  }}
                  onDismiss={() => setLeadForm(null)}
                />
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

              {/* Tappable quick replies — offered by the assistant when the next
                  answer is really a short choice, so visitors don't have to type. */}
              {quickReplies && quickReplies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickReplies.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setQuickReplies(null);
                        send(opt);
                      }}
                      disabled={streaming}
                      className="text-[11px] font-body font-semibold px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-foreground hover:border-primary/50 hover:bg-primary/10 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {opt}
                    </button>
                  ))}
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
                  <button
                    onClick={() => setShowCallback(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-body font-semibold px-3 py-1.5 border border-primary/30 bg-primary/5 rounded-sm text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors duration-200"
                  >
                    <PhoneCall size={11} />
                    Book a callback
                  </button>
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
                  placeholder={
                    listening
                      ? "Listening…"
                      : "Ask about pricing, yields, buying from abroad…"
                  }
                  maxLength={2000}
                  className="flex-1 resize-none max-h-28 bg-background border border-border rounded-sm px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 transition-colors"
                />
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={toggleVoice}
                    disabled={streaming}
                    aria-label={listening ? "Stop voice input" : "Ask by voice"}
                    aria-pressed={listening}
                    className={`relative w-10 h-10 shrink-0 rounded-sm border flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 ${
                      listening
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {listening && (
                      <span className="absolute inset-0 rounded-sm bg-destructive/20 animate-pulse" />
                    )}
                    <Mic size={16} className="relative" />
                  </button>
                )}
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

      <BookCallbackModal open={showCallback} onClose={() => setShowCallback(false)} />
    </>
  );
}
