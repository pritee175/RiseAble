"use client";

import React, { useState, useMemo } from "react";
import { courses } from "@/data/courses";
import CourseCard from "@/components/courses/CourseCard";
import { Search, Filter } from "lucide-react";

const categories = ["All", "Tech", "Non-Tech"];
const subcategories = ["All", "Web Development", "Data Entry", "AI Basics", "Craft Skills", "Communication", "Freelancing"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        category === "All" || c.category === category.toLowerCase();

      const matchesSubcategory =
        subcategory === "All" || c.subcategory === subcategory;

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [search, category, subcategory]);

  return (
    <div className="min-h-screen particles grid-pattern" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
            Accessible <span style={{ color: "var(--color-primary)" }}>Courses</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Every course includes video with captions, audio explanations, and text transcripts.
            Learn at your own pace with full accessibility support.
          </p>
        </div>

        {/* Search and filters */}
        <div
          className="p-4 rounded-2xl border mb-8"
          style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses by name, skill, or topic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
                style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                aria-label="Search courses"
              />
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl border text-sm"
                style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                aria-label="Filter by category"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={subcategory}
                onChange={e => setSubcategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl border text-sm"
                style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                aria-label="Filter by subcategory"
              >
                {subcategories.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }} aria-live="polite">
          Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Course grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>
              No courses found
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
