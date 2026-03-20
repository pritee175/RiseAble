"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: string[];
  savedJobs: string[];
  courseProgress: Record<string, number>;
  accessibilityPreferences: {
    preferredLanguage: string;
    needsSignLanguage: boolean;
    needsAudioDescription: boolean;
    preferredInputMethod: "keyboard" | "voice" | "switch";
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFace: () => Promise<boolean>;
  loginWithVoice: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  updateProgress: (courseId: string, progress: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo user for simulation
const demoUser: User = {
  id: "user-1",
  name: "Pritee Karpe",
  email: "pritee@example.com",
  enrolledCourses: ["web-dev-101", "communication-skills"],
  savedJobs: ["j1", "j5"],
  courseProgress: { "web-dev-101": 45, "communication-skills": 72 },
  accessibilityPreferences: {
    preferredLanguage: "en",
    needsSignLanguage: false,
    needsAudioDescription: true,
    preferredInputMethod: "keyboard",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulated login — in production, call your auth API
    await new Promise(r => setTimeout(r, 800));
    if (email) {
      setUser({ ...demoUser, email });
      return true;
    }
    return false;
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1000));
    setUser({ ...demoUser, name: "Google User" });
    return true;
  }, []);

  const loginWithFace = useCallback(async (): Promise<boolean> => {
    // Simulate face recognition
    await new Promise(r => setTimeout(r, 2000));
    setUser({ ...demoUser, name: "Face Auth User" });
    return true;
  }, []);

  const loginWithVoice = useCallback(async (): Promise<boolean> => {
    // Simulate voice authentication
    await new Promise(r => setTimeout(r, 2000));
    setUser({ ...demoUser, name: "Voice Auth User" });
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    setUser({
      ...demoUser,
      name,
      email,
      enrolledCourses: [],
      savedJobs: [],
      courseProgress: {},
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const enrollCourse = useCallback((courseId: string) => {
    setUser(prev =>
      prev
        ? {
            ...prev,
            enrolledCourses: prev.enrolledCourses.includes(courseId)
              ? prev.enrolledCourses
              : [...prev.enrolledCourses, courseId],
            courseProgress: { ...prev.courseProgress, [courseId]: prev.courseProgress[courseId] ?? 0 },
          }
        : prev
    );
  }, []);

  const unenrollCourse = useCallback((courseId: string) => {
    setUser(prev =>
      prev
        ? {
            ...prev,
            enrolledCourses: prev.enrolledCourses.filter(c => c !== courseId),
          }
        : prev
    );
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

  const updateProgress = useCallback((courseId: string, progress: number) => {
    setUser(prev =>
      prev
        ? { ...prev, courseProgress: { ...prev.courseProgress, [courseId]: Math.min(100, progress) } }
        : prev
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
        signup,
        logout,
        enrollCourse,
        unenrollCourse,
        saveJob,
        unsaveJob,
        updateProgress,
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
