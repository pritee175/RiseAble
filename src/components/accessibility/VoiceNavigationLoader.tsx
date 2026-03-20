"use client";

import { useVoiceNavigation } from "@/hooks/useVoiceNavigation";

/** Invisible component that activates voice navigation when enabled */
export default function VoiceNavigationLoader() {
  useVoiceNavigation();
  return null;
}
