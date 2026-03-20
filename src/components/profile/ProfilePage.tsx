"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Globe, Edit2, Save, X,
  Camera, Award, BookOpen, Briefcase, Calendar, Shield,
  CheckCircle2, Settings, LogOut,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: "Passionate learner exploring new skills and opportunities",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    website: "https://example.com",
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center animate-glow"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>Sign in to view profile</h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>Access your profile and settings.</p>
          <Link href="/auth" className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      bio: "Passionate learner exploring new skills and opportunities",
      phone: "+91 98765 43210",
      location: "Mumbai, India",
      website: "https://example.com",
    });
    setIsEditing(false);
  };

  const stats = [
    { label: "Courses Completed", value: "3", icon: BookOpen, color: "#818cf8" },
    { label: "Jobs Applied", value: "12", icon: Briefcase, color: "#a78bfa" },
    { label: "Certificates", value: "3", icon: Award, color: "#fbbf24" },
    { label: "Days Active", value: "45", icon: Calendar, color: "#34d399" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80" 
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 particles grid-pattern pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>My Profile</h1>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Manage your account and preferences</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}>
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-error)" }}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border p-6 glass-card animate-fade-in-up delay-100"
              style={{ borderColor: "var(--color-border)" }}>
              
              {/* Profile Picture */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-[var(--color-bg-card)]"
                  style={{ ["--tw-ring-color" as string]: "var(--color-primary)" } as React.CSSProperties}>
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80" 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
                  <Camera size={18} />
                </button>
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--color-success), #059669)" }}>
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-text)" }}>{user.name}</h2>
                <p className="text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>{user.email}</p>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", color: "var(--color-primary)" }}>
                  <Shield size={12} />
                  Verified Account
                </span>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}15` }}>
                        <stat.icon size={18} style={{ color: stat.color }} />
                      </div>
                      <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{stat.label}</span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: "var(--color-text)" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div className="rounded-2xl border p-6 glass-card animate-fade-in-up delay-200"
              style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Settings size={20} style={{ color: "var(--color-primary)" }} />
                  <h3 className="text-lg font-bold" style={{ color: "var(--color-text)" }}>Personal Information</h3>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "white" }}>
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-muted)" }}>
                      <X size={16} />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, var(--color-success), #059669)" }}>
                      <Save size={16} />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                    <User size={16} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-base"
                      style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-xl text-base" style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}>
                      {formData.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                    <Mail size={16} />
                    Email Address
                  </label>
                  <p className="px-4 py-3 rounded-xl text-base" style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-muted)" }}>
                    {user.email}
                    <span className="ml-2 text-xs" style={{ color: "var(--color-success)" }}>✓ Verified</span>
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                    <Edit2 size={16} />
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border text-base resize-none"
                      style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-xl text-base" style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}>
                      {formData.bio}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                    <Phone size={16} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-base"
                      style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-xl text-base" style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}>
                      {formData.phone}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                    <MapPin size={16} />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-base"
                      style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    />
                  ) : (
                    <p className="px-4 py-3 rounded-xl text-base" style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text)" }}>
                      {formData.location}
                    </p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                    <Globe size={16} />
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-base"
                      style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    />
                  ) : (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-xl text-base hover:underline"
                      style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-primary)" }}>
                      {formData.website}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="rounded-2xl border p-6 glass-card animate-fade-in-up delay-300"
              style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors hover:bg-opacity-80"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                  <span style={{ color: "var(--color-text)" }}>Change Password</span>
                  <span style={{ color: "var(--color-text-muted)" }}>→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors hover:bg-opacity-80"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                  <span style={{ color: "var(--color-text)" }}>Privacy Settings</span>
                  <span style={{ color: "var(--color-text-muted)" }}>→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors hover:bg-opacity-80"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                  <span style={{ color: "var(--color-text)" }}>Notification Preferences</span>
                  <span style={{ color: "var(--color-text-muted)" }}>→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors hover:bg-opacity-80"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "var(--color-error)" }}>
                  <span>Delete Account</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
