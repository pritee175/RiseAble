"use client";

import { useEffect, useCallback, useRef } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";

/** Voice navigation hook — listens for commands like "open courses", "go to jobs" etc. */
export function useVoiceNavigation() {
  const { voiceNavigationEnabled, announceToScreenReader } = useAccessibility();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const processCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim();
    announceToScreenReader(`Voice command received: ${cmd}`);

    // Navigation commands
    if (cmd.includes("open courses") || cmd.includes("go to courses") || cmd.includes("courses")) {
      window.location.href = "/courses";
      announceToScreenReader("Navigating to courses page");
    } else if (cmd.includes("open jobs") || cmd.includes("find jobs") || cmd.includes("jobs")) {
      window.location.href = "/jobs";
      announceToScreenReader("Navigating to jobs page");
    } else if (cmd.includes("schemes") || cmd.includes("government")) {
      window.location.href = "/schemes";
      announceToScreenReader("Navigating to government schemes page");
    } else if (cmd.includes("home") || cmd.includes("go home")) {
      window.location.href = "/";
      announceToScreenReader("Navigating to home page");
    } else if (cmd.includes("dashboard") || cmd.includes("my dashboard")) {
      window.location.href = "/dashboard";
      announceToScreenReader("Navigating to dashboard");
    } else if (cmd.includes("login") || cmd.includes("sign in")) {
      window.location.href = "/auth";
      announceToScreenReader("Navigating to login page");
    } else if (cmd.includes("scroll down")) {
      window.scrollBy({ top: 400, behavior: "smooth" });
    } else if (cmd.includes("scroll up")) {
      window.scrollBy({ top: -400, behavior: "smooth" });
    } else if (cmd.includes("go back") || cmd.includes("back")) {
      window.history.back();
    } else {
      announceToScreenReader(`Command not recognized: ${cmd}. Try saying: open courses, find jobs, or go home.`);
    }
  }, [announceToScreenReader]);

  useEffect(() => {
    if (!voiceNavigationEnabled || typeof window === "undefined") return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const last = event.results[event.results.length - 1];
      if (last.isFinal) {
        processCommand(last[0].transcript);
      }
    };

    recognition.onerror = () => {
      // Restart on error
      setTimeout(() => {
        try { recognition.start(); } catch { /* ignore */ }
      }, 1000);
    };

    recognition.onend = () => {
      // Keep listening if voice nav is enabled
      if (voiceNavigationEnabled) {
        try { recognition.start(); } catch { /* ignore */ }
      }
    };

    recognitionRef.current = recognition;
    try { recognition.start(); } catch { /* ignore */ }

    return () => {
      try { recognition.stop(); } catch { /* ignore */ }
    };
  }, [voiceNavigationEnabled, processCommand]);
}
