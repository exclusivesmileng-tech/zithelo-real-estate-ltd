"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const STORAGE_KEY = "zithelo-cookie-consent";

export default function GoogleAnalyticsLoader() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Already accepted in a previous session
    if (localStorage.getItem(STORAGE_KEY) === "accepted") {
      setConsented(true);
      return;
    }

    // Listen for acceptance in this session
    function onAccept() {
      setConsented(true);
    }
    window.addEventListener("zithelo:cookie-accepted", onAccept);
    return () => window.removeEventListener("zithelo:cookie-accepted", onAccept);
  }, []);

  if (!gaId || gaId === "G-XXXXXXXXXX" || !consented) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
