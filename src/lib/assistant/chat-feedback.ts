/**
 * Lightweight sensory feedback for the chat — a soft synthesized tone plus a
 * short haptic pulse on send/receive, the small touches that make a chat feel
 * alive rather than a form posting to a server. No audio files: both tones are
 * synthesized with the Web Audio API so there's nothing to load or host.
 *
 * Respects a per-visitor mute preference (localStorage) and never throws — a
 * missing AudioContext, a blocked autoplay policy, or an unsupported
 * Vibration API all degrade to silence, never break the chat. This module is
 * client-only; every function is a no-op during SSR (`window` is undefined).
 */

const SOUND_KEY = "zithelo-assistant-sound";

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    // Browsers create contexts "suspended" until a user gesture resumes
    // them; resume() is a harmless no-op once already running.
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function soundEnabled(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
  } catch {
    /* non-fatal */
  }
}

/** One short, soft tone — sine wave with a quick fade in/out to avoid clicks. */
function tone(frequency: number, duration: number, when = 0): void {
  const audio = getContext();
  if (!audio) return;

  try {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;

    const start = audio.currentTime + when;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.09, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  } catch {
    /* non-fatal */
  }
}

function vibrate(pattern: number | number[]): void {
  try {
    // Unsupported on iOS Safari and some browsers — that's fine, silent no-op.
    navigator.vibrate?.(pattern);
  } catch {
    /* non-fatal */
  }
}

/** The visitor's own message going out — one quick, rising tone. */
export function playSent(): void {
  if (!soundEnabled()) return;
  tone(680, 0.09);
  vibrate(12);
}

/** Linda's reply arriving — a softer two-note pop. */
export function playReceived(): void {
  if (!soundEnabled()) return;
  tone(520, 0.1);
  tone(720, 0.11, 0.07);
  vibrate([10, 30, 10]);
}
