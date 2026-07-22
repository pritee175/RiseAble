"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { jobs } from "@/data/jobs";
import { schemes } from "@/data/schemes";
import JobCard from "@/components/jobs/JobCard";
import {
  Briefcase, Bookmark, Landmark, ChevronRight, User,
  ArrowRight, CheckCircle2, Mic, Volume2, Keyboard, MessageCircle,
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 particles grid-pattern">
        <div className="text-center max-w-sm animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center animate-glow"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>Sign in to continue</h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>Access your saved jobs and preferences.</p>
          <Link href="/auth" className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
            Sign In <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const savedJobData = jobs.filter(j => user.savedJobs.includes(j.id));

  const stats = [
    { label: "Saved Jobs", value: user.savedJobs.length, icon: Bookmark, gradient: "linear-gradient(135deg, #818cf8, #6366f1)" },
    { label: "Jobs Available", value: jobs.length, icon: Briefcase, gradient: "linear-gradient(135deg, #a78bfa, #7c3aed)" },
    { label: "Govt. Schemes", value: schemes.length, icon: Landmark, gradient: "linear-gradient(135deg, #34d399, #059669)" },
  ];

  const prefs = user.accessibilityPreferences;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 particles grid-pattern pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
              {user.name?.[0] || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                Welcome back, {user.name}!
              </h1>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Here&apos;s what&apos;s waiting for you today.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={stat.label}
              className="group relative overflow-hidden rounded-2xl border card-hover animate-fade-in-up"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
                animationDelay: `${i * 0.1}s`,
              }}>
              <div className="absolute inset-0" style={{ background: stat.gradient, opacity: 0.05 }} />
              <div className="relative p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                    style={{ background: stat.gradient }}>
                    <stat.icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                  <span className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>{stat.value}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: Saved Jobs (2 cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-2xl border p-6 glass-card animate-fade-in-up delay-100"
              style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
                    <Bookmark size={16} className="text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--color-text)" }}>Saved Jobs</h2>
                </div>
                <Link href="/jobs" className="flex items-center gap-1 text-xs font-medium transition-colors hover:underline" style={{ color: "var(--color-primary)" }}>
                  Browse All <ArrowRight size={12} />
                </Link>
              </div>

              {savedJobData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm mb-1" style={{ color: "var(--color-text-secondary)" }}>No jobs saved yet.</p>
                  <Link href="/jobs" className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>Explore Jobs</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {savedJobData.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <section className="rounded-2xl border p-5 glass-card animate-fade-in-up delay-200"
              style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight size={16} style={{ color: "var(--color-primary)" }} aria-hidden="true" />
                <h2 className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Quick Actions</h2>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Find Jobs", href: "/jobs", icon: Briefcase, color: "#818cf8" },
                  { label: "Gov. Schemes", href: "/schemes", icon: Landmark, color: "#34d399" },
                  { label: "AI Assistant", href: "/chat", icon: MessageCircle, color: "#a78bfa" },
                ].map(a => (
                  <Link key={a.href} href={a.href}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:translate-x-1"
                    style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${a.color}15` }}>
                      <a.icon size={14} style={{ color: a.color }} aria-hidden="true" />
                    </div>
                    {a.label}
                    <ChevronRight size={14} className="ml-auto transition-transform group-hover:translate-x-1" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Accessibility Preferences */}
            <section className="rounded-2xl border p-5 glass-card animate-fade-in-up delay-300"
              style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                <h2 className="text-sm font-bold" style={{ color: "var(--color-text)" }}>Your Preferences</h2>
              </div>
              <div className="space-y-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <div className="flex items-center gap-2">
                  <Keyboard size={14} style={{ color: "var(--color-text-muted)" }} />
                  Preferred input: <strong style={{ color: "var(--color-text)" }}>{prefs.preferredInputMethod}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Mic size={14} style={{ color: "var(--color-text-muted)" }} />
                  Sign language: <strong style={{ color: "var(--color-text)" }}>{prefs.needsSignLanguage ? "Enabled" : "Off"}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 size={14} style={{ color: "var(--color-text-muted)" }} />
                  Audio description: <strong style={{ color: "var(--color-text)" }}>{prefs.needsAudioDescription ? "Enabled" : "Off"}</strong>
                </div>
                <Link href="/profile" className="inline-flex items-center gap-1 text-xs font-semibold pt-1" style={{ color: "var(--color-primary)" }}>
                  Edit in Profile <ArrowRight size={12} />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
