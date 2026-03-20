"use client";

import React, { useState, useMemo } from "react";
import { jobs } from "@/data/jobs";
import JobCard from "@/components/jobs/JobCard";
import { Search, Filter, Home, Shield } from "lucide-react";

const jobTypes = ["All", "Full-time", "Part-time", "Freelance", "Internship"];
const skillCategories = [
  "All",
  "Web Development",
  "Data Entry",
  "Communication",
  "Graphic Design",
  "Writing",
  "AI",
  "Administration",
  "Crafts",
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All");
  const [skill, setSkill] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [disabilityFriendlyOnly, setDisabilityFriendlyOnly] = useState(false);

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      const matchesSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));

      const matchesType = jobType === "All" || j.type === jobType;

      const matchesSkill =
        skill === "All" || j.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()));

      const matchesRemote = !remoteOnly || j.remote;
      const matchesFriendly = !disabilityFriendlyOnly || j.disabilityFriendly;

      return matchesSearch && matchesType && matchesSkill && matchesRemote && matchesFriendly;
    });
  }, [search, jobType, skill, remoteOnly, disabilityFriendlyOnly]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            Find <span style={{ color: "var(--color-primary)" }}>Accessible Jobs</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Job listings from disability-friendly employers. Filter by remote work,
            skills, and accessibility features.
          </p>
        </div>

        {/* Filters */}
        <div
          className="p-4 rounded-2xl border mb-8"
          style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col gap-4">
            {/* Search row */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by job title, company, or skill..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
                style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                aria-label="Search jobs"
              />
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap items-center gap-3">
              <Filter size={16} style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />

              <select
                value={jobType}
                onChange={e => setJobType(e.target.value)}
                className="px-3 py-2 rounded-xl border text-sm"
                style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                aria-label="Filter by job type"
              >
                {jobTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={skill}
                onChange={e => setSkill(e.target.value)}
                className="px-3 py-2 rounded-xl border text-sm"
                style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                aria-label="Filter by skill"
              >
                {skillCategories.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {/* Toggle filters */}
              <button
                onClick={() => setRemoteOnly(!remoteOnly)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-colors"
                style={{
                  backgroundColor: remoteOnly ? "rgba(16,185,129,0.1)" : "var(--color-bg-secondary)",
                  borderColor: remoteOnly ? "var(--color-success)" : "var(--color-border)",
                  color: remoteOnly ? "var(--color-success)" : "var(--color-text-muted)",
                }}
                aria-pressed={remoteOnly}
              >
                <Home size={14} aria-hidden="true" />
                Work from Home
              </button>

              <button
                onClick={() => setDisabilityFriendlyOnly(!disabilityFriendlyOnly)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-colors"
                style={{
                  backgroundColor: disabilityFriendlyOnly ? "rgba(37,99,235,0.1)" : "var(--color-bg-secondary)",
                  borderColor: disabilityFriendlyOnly ? "var(--color-primary)" : "var(--color-border)",
                  color: disabilityFriendlyOnly ? "var(--color-primary)" : "var(--color-text-muted)",
                }}
                aria-pressed={disabilityFriendlyOnly}
              >
                <Shield size={14} aria-hidden="true" />
                Disability Friendly
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }} aria-live="polite">
          Showing {filtered.length} job{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Job grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
              No jobs found
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
