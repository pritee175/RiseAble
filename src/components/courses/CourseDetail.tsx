"use client";

import React, { useState } from "react";
import Link from "next/link";
import { courses, Course } from "@/data/courses";
import { useAuth } from "@/context/AuthContext";
import { useTextToSpeech } from "@/hooks/useSpeech";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Users,
  Star,
  Video,
  Headphones,
  FileText,
  Captions,
  Hand,
  CheckCircle,
  BookOpen,
  Code,
  Palette,
} from "lucide-react";

interface CourseDetailProps {
  courseId: string;
}

// Sample lesson data
const sampleLessons = [
  { id: 1, title: "Introduction & Course Overview", duration: "12 min", completed: true },
  { id: 2, title: "Setting Up Your Environment", duration: "18 min", completed: true },
  { id: 3, title: "Core Concepts & Fundamentals", duration: "25 min", completed: false },
  { id: 4, title: "Hands-On Practice Session", duration: "30 min", completed: false },
  { id: 5, title: "Building Your First Project", duration: "35 min", completed: false },
  { id: 6, title: "Best Practices & Tips", duration: "20 min", completed: false },
  { id: 7, title: "Assessment & Certificate", duration: "15 min", completed: false },
];

const sampleTranscript = `Welcome to this course! In this lesson, we'll cover the fundamentals you need to get started.

Our goal is to make learning accessible and enjoyable for everyone. Each lesson includes:
- Video content with closed captions
- Audio explanations you can listen to on the go
- Full text transcripts like this one
- Sign language interpretation (where available)

Let's begin by understanding the core concepts. Don't worry if things seem complex at first — we'll break everything down step by step.

Remember: you can adjust the text size, enable high contrast mode, or use voice navigation at any time using the accessibility settings (the gear icon at the bottom-right of the screen).

Let's get started!`;

export default function CourseDetail({ courseId }: CourseDetailProps) {
  const course = courses.find(c => c.id === courseId);
  const { user, isAuthenticated, enrollCourse, updateProgress } = useAuth();
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const [activeTab, setActiveTab] = useState<"video" | "audio" | "transcript">("video");
  const [isPlaying, setIsPlaying] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>Course not found</h1>
          <Link href="/courses" className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourses.includes(course.id) ?? false;
  const progress = user?.courseProgress[course.id] ?? 0;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      alert("Please sign in to enroll in courses.");
      return;
    }
    enrollCourse(course.id);
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(sampleTranscript);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Courses
        </Link>

        {/* Course header */}
        <div
          className="rounded-2xl border overflow-hidden mb-8"
          style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
        >
          {/* Banner */}
          <div
            className="h-48 flex items-center justify-center"
            style={{
              background: course.category === "tech"
                ? "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                : "linear-gradient(135deg, var(--color-secondary), var(--color-accent))",
            }}
          >
            {course.category === "tech"
              ? <Code size={56} className="text-white/70" aria-hidden="true" />
              : <Palette size={56} className="text-white/70" aria-hidden="true" />}
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                {course.subcategory}
              </span>
              <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-muted)" }}>
                {course.level}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
              {course.title}
            </h1>
            <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
              {course.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
              <span className="flex items-center gap-1"><Clock size={14} aria-hidden="true" />{course.duration}</span>
              <span className="flex items-center gap-1"><BookOpen size={14} aria-hidden="true" />{course.lessons} lessons</span>
              <span className="flex items-center gap-1"><Users size={14} aria-hidden="true" />{course.enrolled.toLocaleString()} enrolled</span>
              <span className="flex items-center gap-1"><Star size={14} fill="var(--color-warning)" style={{ color: "var(--color-warning)" }} aria-hidden="true" />{course.rating}</span>
            </div>

            {/* Accessibility features */}
            <div className="flex gap-3 mb-6" aria-label="Available accessibility features">
              {course.hasVideo && <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-secondary)" }}><Video size={14} aria-hidden="true" />Video</span>}
              {course.hasAudio && <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-secondary)" }}><Headphones size={14} aria-hidden="true" />Audio</span>}
              {course.hasTranscript && <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-secondary)" }}><FileText size={14} aria-hidden="true" />Transcript</span>}
              {course.hasCaptions && <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-secondary)" }}><Captions size={14} aria-hidden="true" />Captions</span>}
              {course.hasSignLanguage && <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-secondary)" }}><Hand size={14} aria-hidden="true" />Sign Language</span>}
            </div>

            {/* Enroll / Progress */}
            {isEnrolled ? (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                    <div
                      className="h-3 rounded-full"
                      style={{ width: `${progress}%`, backgroundColor: "var(--color-success)" }}
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{progress}%</span>
                </div>
                <p className="text-xs" style={{ color: "var(--color-success)" }}>✓ You are enrolled in this course</p>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="px-8 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Enroll Now — Free
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content area */}
          <div className="lg:col-span-2">
            {/* Content tabs */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
            >
              <div className="flex border-b" role="tablist" style={{ borderColor: "var(--color-border)" }}>
                {[
                  { id: "video" as const, label: "Video", icon: Video },
                  { id: "audio" as const, label: "Audio", icon: Headphones },
                  { id: "transcript" as const, label: "Transcript", icon: FileText },
                ].map(tab => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors"
                    style={{
                      borderColor: activeTab === tab.id ? "var(--color-primary)" : "transparent",
                      color: activeTab === tab.id ? "var(--color-primary)" : "var(--color-text-muted)",
                    }}
                  >
                    <tab.icon size={16} aria-hidden="true" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6" role="tabpanel">
                {activeTab === "video" && (
                  <div>
                    <div
                      className="aspect-video rounded-xl flex items-center justify-center cursor-pointer"
                      style={{ backgroundColor: "var(--color-bg-secondary)" }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      role="button"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
                      Video player with captions enabled • Sign language interpreter (picture-in-picture)
                    </p>
                  </div>
                )}

                {activeTab === "audio" && (
                  <div className="text-center py-8">
                    <Headphones size={48} className="mx-auto mb-4" style={{ color: "var(--color-primary)" }} />
                    <p className="font-semibold mb-3" style={{ color: "var(--color-text)" }}>Audio Lesson</p>
                    <button
                      onClick={handleReadAloud}
                      className="px-6 py-2.5 rounded-xl font-semibold text-white transition-transform hover:scale-105"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      {isSpeaking ? (
                        <span className="flex items-center gap-2"><VolumeX size={18} />Stop Audio</span>
                      ) : (
                        <span className="flex items-center gap-2"><Volume2 size={18} />Play Audio</span>
                      )}
                    </button>
                    <p className="mt-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                      Uses your browser&apos;s text-to-speech engine
                    </p>
                  </div>
                )}

                {activeTab === "transcript" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>Lesson Transcript</h3>
                      <button
                        onClick={handleReadAloud}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                        aria-label={isSpeaking ? "Stop reading" : "Read transcript aloud"}
                      >
                        {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        {isSpeaking ? "Stop" : "Read Aloud"}
                      </button>
                    </div>
                    <div
                      className="prose text-sm leading-relaxed whitespace-pre-line"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {sampleTranscript}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lesson list sidebar */}
          <div>
            <div
              className="rounded-2xl border p-5 sticky top-20"
              style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
            >
              <h3 className="font-bold mb-4" style={{ color: "var(--color-text)" }}>
                Course Content
              </h3>
              <ul className="space-y-2">
                {sampleLessons.map(lesson => (
                  <li key={lesson.id}>
                    <button
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm transition-colors"
                      style={{ backgroundColor: "var(--color-bg-secondary)" }}
                      onClick={() => {
                        if (isEnrolled) updateProgress(course.id, Math.min(100, (lesson.id / sampleLessons.length) * 100));
                      }}
                      aria-label={`Lesson ${lesson.id}: ${lesson.title}${lesson.completed ? " (completed)" : ""}`}
                    >
                      {lesson.completed ? (
                        <CheckCircle size={18} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                      ) : (
                        <Play size={18} style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-medium truncate"
                          style={{ color: lesson.completed ? "var(--color-success)" : "var(--color-text)" }}
                        >
                          {lesson.title}
                        </p>
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{lesson.duration}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
