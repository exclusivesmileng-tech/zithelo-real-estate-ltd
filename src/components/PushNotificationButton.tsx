"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PermissionState = "default" | "granted" | "denied" | "unsupported";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

interface Props {
  /** "icon" = minimal bell icon only; "button" = labelled button */
  variant?: "icon" | "button";
  className?: string;
}

export default function PushNotificationButton({ variant = "button", className = "" }: Props) {
  const [permission, setPermission] = useState<PermissionState>("default");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission as PermissionState);

    // Check if already subscribed
    navigator.serviceWorker.ready.then((reg) =>
      reg.pushManager.getSubscription().then((sub) => setSubscribed(!!sub))
    );
  }, []);

  async function subscribe() {
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) return;

    setLoading(true);
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm as PermissionState);
      if (perm !== "granted") return;

      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey).buffer as ArrayBuffer,
      });

      await fetch("/api/push-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });

      setSubscribed(true);
    } catch (err) {
      console.warn("[Push] Subscribe failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribe() {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await sub.unsubscribe();
        await fetch("/api/push-subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
      }
      setSubscribed(false);
      setPermission("default");
    } catch (err) {
      console.warn("[Push] Unsubscribe failed:", err);
    } finally {
      setLoading(false);
    }
  }

  // Don't render if not supported or key not configured
  if (
    permission === "unsupported" ||
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  )
    return null;

  const isGranted = permission === "granted" && subscribed;
  const isDenied = permission === "denied";

  if (variant === "icon") {
    return (
      <button
        onClick={isGranted ? unsubscribe : subscribe}
        disabled={loading || isDenied}
        aria-label={isGranted ? "Disable notifications" : "Enable notifications"}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
          isGranted
            ? "bg-primary/15 text-primary hover:bg-primary/25"
            : "bg-muted text-muted-foreground hover:text-foreground"
        } disabled:opacity-40 ${className}`}
      >
        {isGranted ? <BellRing size={16} /> : isDenied ? <BellOff size={16} /> : <Bell size={16} />}
      </button>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!isDenied && (
        <motion.button
          key={isGranted ? "on" : "off"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={isGranted ? unsubscribe : subscribe}
          disabled={loading}
          className={`inline-flex items-center gap-2 text-sm font-body font-semibold transition-colors disabled:opacity-50 ${
            isGranted
              ? "text-primary hover:text-primary/80"
              : "text-muted-foreground hover:text-foreground"
          } ${className}`}
        >
          {loading ? (
            <Bell size={15} className="animate-pulse" />
          ) : isGranted ? (
            <BellRing size={15} />
          ) : (
            <Bell size={15} />
          )}
          {loading
            ? "Loading…"
            : isGranted
            ? "Notifications On"
            : "Get Project Updates"}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
