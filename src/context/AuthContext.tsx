"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  savedJobs: string[];
  accessibilityPreferences: {
    preferredLanguage: string;
    needsSignLanguage: boolean;
    needsAudioDescription: boolean;
    preferredInputMethod: "keyboard" | "voice" | "switch";
  };
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  loginWithFace: () => Promise<AuthResult>;
  loginWithVoice: () => Promise<AuthResult>;
  loginWithBiometric: () => Promise<AuthResult>;
  signup: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const defaultAccessibilityPreferences = {
  preferredLanguage: "en",
  needsSignLanguage: false,
  needsAudioDescription: false,
  preferredInputMethod: "keyboard" as const,
};

// Demo user for the simulated auth methods (Google/Face/Voice) — these are
// explicitly demo-only; real credentials go through /api/auth/login|signup.
const demoUser: User = {
  id: "demo-1",
  name: "Demo User",
  email: "demo@riseable.com",
  savedJobs: ["j1", "j5"],
  accessibilityPreferences: defaultAccessibilityPreferences,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Invalid email or password" };
      }
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        savedJobs: [],
        accessibilityPreferences: defaultAccessibilityPreferences,
      });
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<AuthResult> => {
    await new Promise(r => setTimeout(r, 1000));
    setUser({ ...demoUser, name: "Google User (Demo)" });
    return { success: true };
  }, []);

  const loginWithFace = useCallback(async (): Promise<AuthResult> => {
    // Demo only — no real face recognition is implemented.
    await new Promise(r => setTimeout(r, 2000));
    setUser({ ...demoUser, name: "Face Auth User (Demo)" });
    return { success: true };
  }, []);

  const loginWithVoice = useCallback(async (): Promise<AuthResult> => {
    // Demo only — no real voice biometric auth is implemented.
    await new Promise(r => setTimeout(r, 2000));
    setUser({ ...demoUser, name: "Voice Auth User (Demo)" });
    return { success: true };
  }, []);

  const loginWithBiometric = useCallback(async (): Promise<AuthResult> => {
    // Demo only — no real fingerprint/WebAuthn integration is implemented.
    await new Promise(r => setTimeout(r, 1500));
    setUser({ ...demoUser, name: "Biometric User (Demo)" });
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Could not create account" };
      }
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        savedJobs: [],
        accessibilityPreferences: defaultAccessibilityPreferences,
      });
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const saveJob = useCallback((jobId: string) => {
    setUser(prev =>
      prev
        ? {
            ...prev,
            savedJobs: prev.savedJobs.includes(jobId) ? prev.savedJobs : [...prev.savedJobs, jobId],
          }
        : prev
    );
  }, []);

  const unsaveJob = useCallback((jobId: string) => {
    setUser(prev =>
      prev ? { ...prev, savedJobs: prev.savedJobs.filter(j => j !== jobId) } : prev
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        loginWithFace,
        loginWithVoice,
        loginWithBiometric,
        signup,
        logout,
        saveJob,
        unsaveJob,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
