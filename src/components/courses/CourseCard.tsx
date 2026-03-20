"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/data/courses";
import { Clock, Users, Star, Video, Headphones, FileText, Captions, Hand, Code, Palette, ArrowRight } from "lucide-react";
import { CardPattern } from "@/components/ui/Illustrations";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const isTech = course.category === "tech";
  const gradient = isTech
    ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
    : "linear-gradient(135deg, #7c3aed, #0ea5e9)";

  return (
    <article
      className="group rounded-2xl border overflow-hidden card-hover gradient-border animate-fade-in-up"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Thumbnail with real image */}
      <div className="relative h-48 overflow-hidden"
        role="img" aria-label={`${course.title} course thumbnail`}>
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
        
        {/* Category badge overlay */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md"
            style={{ background: gradient }}>
            {course.subcategory}
          </span>
        </div>
        
        {/* Level badge */}
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white backdrop-blur-md"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            {course.level}
          </span>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-500" aria-hidden="true" />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-base mb-1.5 line-clamp-2 transition-colors group-hover:text-[var(--color-primary)]" style={{ color: "var(--color-text)" }}>
          {course.title}
        </h3>

        <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
          {course.description}
        </p>

        <div className="flex flex-wrap gap-3 text-[11px] mb-4" style={{ color: "var(--color-text-muted)" }}>
          <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" />{course.duration}</span>
          <span className="flex items-center gap-1"><Users size={12} aria-hidden="true" />{course.enrolled.toLocaleString()}</span>
          <span className="flex items-center gap-1">
            <Star size={12} fill="var(--color-warning)" style={{ color: "var(--color-warning)" }} aria-hidden="true" />{course.rating}
          </span>
        </div>

        {/* Accessibility icons */}
        <div className="flex gap-1.5 mb-4" aria-label="Accessibility features available">
          {[
            { show: course.hasVideo, icon: Video, label: "Video" },
            { show: course.hasAudio, icon: Headphones, label: "Audio" },
            { show: course.hasTranscript, icon: FileText, label: "Transcript" },
            { show: course.hasCaptions, icon: Captions, label: "Captions" },
            { show: course.hasSignLanguage, icon: Hand, label: "Sign language" },
          ]
            .filter(a => a.show)
            .map(a => (
              <span key={a.label} className="p-1.5 rounded-md transition-colors group-hover:bg-[rgba(129,140,248,0.1)]"
                style={{ backgroundColor: "var(--color-bg-secondary)" }} title={a.label}>
                <a.icon size={12} style={{ color: "var(--color-primary)" }} aria-label={`Has ${a.label}`} />
              </span>
            ))}
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="btn-glow flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          aria-label={`Start learning ${course.title}`}
        >
          Start Learning
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
