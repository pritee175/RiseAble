"use client";

import React, { useState } from "react";
import { Scheme } from "@/data/schemes";
import { GraduationCap, IndianRupee, Briefcase, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const categoryIcons = {
  education: GraduationCap,
  financial: IndianRupee,
  employment: Briefcase,
};

const categoryColors = {
  education: "var(--color-primary)",
  financial: "var(--color-success)",
  employment: "var(--color-secondary)",
};

interface SchemeCardProps {
  scheme: Scheme;
  index?: number;
}

export default function SchemeCard({ scheme, index = 0 }: SchemeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = categoryIcons[scheme.category];
  const color = categoryColors[scheme.category];

  return (
    <article
      className="group rounded-2xl border overflow-hidden card-hover gradient-border animate-fade-in-up"
      style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)", animationDelay: `${index * 0.08}s` }}
    >
      <div className="p-6 relative">
        {/* Background gradient effect */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
          style={{ background: color }} aria-hidden="true" />
        
        {/* Category badge */}
        <div className="relative flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
            style={{ backgroundColor: `${color}25` }}
          >
            <Icon size={24} style={{ color }} aria-hidden="true" />
          </div>
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold capitalize shadow-sm"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {scheme.category}
          </span>
        </div>

        <h3 className="relative font-bold text-xl mb-3 transition-colors group-hover:text-[var(--color-primary)]" style={{ color: "var(--color-text)" }}>
          {scheme.title}
        </h3>

        <p className="relative text-base mb-4" style={{ color: "var(--color-text-secondary)" }}>
          {scheme.description}
        </p>

        <p className="relative text-sm mb-5 px-3 py-2 rounded-lg" style={{ color: "var(--color-text-muted)", backgroundColor: "var(--color-bg-secondary)" }}>
          <strong>Ministry:</strong> {scheme.ministry}
        </p>

        {/* Expand/Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="relative flex items-center gap-2 text-base font-bold transition-all hover:gap-3"
          style={{ color: "var(--color-primary)" }}
          aria-expanded={expanded}
          aria-controls={`scheme-details-${scheme.id}`}
        >
          {expanded ? "Show Less" : "View Details"}
          {expanded ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
        </button>

        {expanded && (
          <div id={`scheme-details-${scheme.id}`} className="mt-4 space-y-4 animate-fade-in">
            {/* Eligibility */}
            <div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                Eligibility
              </h4>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {scheme.eligibility}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                Benefits
              </h4>
              <ul className="space-y-1">
                {scheme.benefits.map(b => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <span style={{ color: "var(--color-success)" }} aria-hidden="true">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to apply */}
            <div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                How to Apply
              </h4>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {scheme.howToApply}
              </p>
            </div>

            <a
              href={scheme.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
              aria-label={`Visit official website for ${scheme.title}`}
            >
              Visit Official Website
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
