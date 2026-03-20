"use client";

import React from "react";
import { Job } from "@/data/jobs";
import { useAuth } from "@/context/AuthContext";
import {
  MapPin, Clock, IndianRupee, Home, Shield,
  Bookmark, BookmarkCheck, ExternalLink, ArrowRight,
} from "lucide-react";

interface JobCardProps {
  job: Job;
  index?: number;
}

export default function JobCard({ job, index = 0 }: JobCardProps) {
  const { user, isAuthenticated, saveJob, unsaveJob } = useAuth();
  const isSaved = user?.savedJobs.includes(job.id) ?? false;

  const handleToggleSave = () => {
    if (!isAuthenticated) return;
    if (isSaved) unsaveJob(job.id);
    else saveJob(job.id);
  };

  return (
    <article
      className="group p-6 rounded-2xl border card-hover gradient-border animate-fade-in-up"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Company avatar with gradient and animation */}
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
            {job.company[0]}
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ boxShadow: "0 0 30px rgba(129, 140, 248, 0.5)" }} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1 transition-colors group-hover:text-[var(--color-primary)]" style={{ color: "var(--color-text)" }}>
              {job.title}
            </h3>
            <p className="text-base font-semibold" style={{ color: "var(--color-primary)" }}>{job.company}</p>
          </div>
        </div>

        {isAuthenticated && (
          <button onClick={handleToggleSave}
            className="p-2.5 rounded-xl transition-all hover:scale-110 shadow-md"
            style={{ backgroundColor: "var(--color-bg-secondary)" }}
            aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
            aria-pressed={isSaved}>
            {isSaved
              ? <BookmarkCheck size={20} style={{ color: "var(--color-primary)" }} />
              : <Bookmark size={20} style={{ color: "var(--color-text-muted)" }} />}
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
        <span className="flex items-center gap-1"><MapPin size={13} aria-hidden="true" />{job.location}</span>
        <span className="flex items-center gap-1"><Clock size={13} aria-hidden="true" />{job.type}</span>
        <span className="flex items-center gap-1"><IndianRupee size={13} aria-hidden="true" />{job.salary}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.remote && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: "rgba(52, 211, 153, 0.1)", color: "var(--color-success)" }}>
            <Home size={11} aria-hidden="true" /> Remote
          </span>
        )}
        {job.disabilityFriendly && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", color: "var(--color-primary)" }}>
            <Shield size={11} aria-hidden="true" /> Disability Friendly
          </span>
        )}
      </div>

      <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>{job.description}</p>

      {/* Accessibility features */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>Accessibility</p>
        <div className="flex flex-wrap gap-1.5">
          {job.accessibilityFeatures.map(f => (
            <span key={f} className="px-2 py-0.5 rounded text-[11px]"
              style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-secondary)" }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {job.skills.map(skill => (
          <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
            {skill}
          </span>
        ))}
      </div>

      <button
        className="btn-glow w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
        aria-label={`Apply for ${job.title} at ${job.company}`}
        onClick={() => alert(`Application for "${job.title}" at ${job.company} submitted! (Demo)`)}>
        Apply Now
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </article>
  );
}
