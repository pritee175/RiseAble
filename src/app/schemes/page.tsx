"use client";

import React, { useState, useMemo } from "react";
import { schemes } from "@/data/schemes";
import SchemeCard from "@/components/schemes/SchemeCard";
import { GraduationCap, IndianRupee, Briefcase } from "lucide-react";

const categories = [
  { id: "all", label: "All Schemes", icon: null },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "financial", label: "Financial Aid", icon: IndianRupee },
  { id: "employment", label: "Employment", icon: Briefcase },
] as const;

export default function SchemesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return schemes;
    return schemes.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            Government <span style={{ color: "var(--color-primary)" }}>Schemes</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Discover government schemes and benefits available for persons with disabilities in India.
            Education, financial aid, and employment opportunities.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Filter schemes by category">
          {categories.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors"
              style={{
                borderColor: activeCategory === cat.id ? "var(--color-primary)" : "var(--color-border)",
                backgroundColor: activeCategory === cat.id ? "var(--color-primary)" : "var(--color-bg-card)",
                color: activeCategory === cat.id ? "#ffffff" : "var(--color-text)",
              }}
            >
              {cat.icon && <cat.icon size={16} aria-hidden="true" />}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }} aria-live="polite">
          Showing {filtered.length} scheme{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="grid md:grid-cols-2 gap-6" role="tabpanel">
          {filtered.map((scheme, i) => (
            <SchemeCard key={scheme.id} scheme={scheme} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
