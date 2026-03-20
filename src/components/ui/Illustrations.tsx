"use client";

import React from "react";

/** Abstract hero illustration — laptop with accessibility nodes */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 400" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* Orbiting rings */}
      <ellipse cx="250" cy="200" rx="180" ry="140" stroke="url(#grad1)" strokeWidth="0.5" opacity="0.2">
        <animateTransform attributeName="transform" type="rotate" from="0 250 200" to="360 250 200" dur="30s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="250" cy="200" rx="140" ry="100" stroke="url(#grad2)" strokeWidth="0.5" opacity="0.15">
        <animateTransform attributeName="transform" type="rotate" from="360 250 200" to="0 250 200" dur="25s" repeatCount="indefinite" />
      </ellipse>

      {/* Central laptop shape */}
      <rect x="155" y="120" width="190" height="130" rx="8" fill="url(#grad1)" opacity="0.15" />
      <rect x="160" y="125" width="180" height="115" rx="6" fill="#151c2c" stroke="url(#grad1)" strokeWidth="1" />

      {/* Screen content lines */}
      <rect x="175" y="145" width="80" height="4" rx="2" fill="#818cf8" opacity="0.6" />
      <rect x="175" y="158" width="120" height="3" rx="1.5" fill="#a5b4cb" opacity="0.3" />
      <rect x="175" y="168" width="100" height="3" rx="1.5" fill="#a5b4cb" opacity="0.2" />
      <rect x="175" y="178" width="60" height="3" rx="1.5" fill="#a5b4cb" opacity="0.2" />

      {/* Play button on screen */}
      <circle cx="305" cy="175" r="15" fill="url(#grad1)" opacity="0.4" />
      <polygon points="300,168 315,175 300,182" fill="#eef2ff" opacity="0.8" />

      {/* Laptop base */}
      <path d="M140 250 L155 250 L160 240 L340 240 L345 250 L360 250 L355 258 L145 258 Z" fill="url(#grad1)" opacity="0.2" />

      {/* Floating accessibility nodes */}
      {/* Node 1 - Eye (vision) */}
      <g opacity="0.9">
        <circle cx="80" cy="130" r="22" fill="#151c2c" stroke="url(#grad1)" strokeWidth="1.5">
          <animate attributeName="cy" values="130;120;130" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="130" r="6" fill="url(#grad1)" opacity="0.8">
          <animate attributeName="cy" values="130;120;130" dur="4s" repeatCount="indefinite" />
        </circle>
        {/* Connection line */}
        <line x1="102" y1="135" x2="155" y2="165" stroke="url(#grad1)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Node 2 - Mic (voice) */}
      <g opacity="0.9">
        <circle cx="420" cy="110" r="22" fill="#151c2c" stroke="url(#grad2)" strokeWidth="1.5">
          <animate attributeName="cy" values="110;100;110" dur="5s" repeatCount="indefinite" />
        </circle>
        <rect x="414" y="100" width="12" height="16" rx="6" fill="url(#grad2)" opacity="0.8">
          <animate attributeName="y" values="100;90;100" dur="5s" repeatCount="indefinite" />
        </rect>
        <line x1="398" y1="120" x2="345" y2="155" stroke="url(#grad2)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Node 3 - Keyboard */}
      <g opacity="0.9">
        <circle cx="100" cy="300" r="22" fill="#151c2c" stroke="url(#grad3)" strokeWidth="1.5">
          <animate attributeName="cy" values="300;290;300" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <rect x="88" y="293" width="24" height="14" rx="2" fill="none" stroke="url(#grad3)" strokeWidth="1.5" opacity="0.8">
          <animate attributeName="y" values="293;283;293" dur="4.5s" repeatCount="indefinite" />
        </rect>
        <line x1="122" y1="290" x2="160" y2="250" stroke="url(#grad3)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Node 4 - Heart / Community */}
      <g opacity="0.9">
        <circle cx="400" cy="310" r="22" fill="#151c2c" stroke="url(#grad1)" strokeWidth="1.5">
          <animate attributeName="cy" values="310;300;310" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <path d="M392 308 C392 304 396 300 400 304 C404 300 408 304 408 308 C408 314 400 320 400 320 C400 320 392 314 392 308Z"
          fill="url(#grad1)" opacity="0.7">
          <animate attributeName="transform" attributeType="XML" type="scale" values="1;1.1;1" dur="1.5s" repeatCount="indefinite" additive="sum" />
        </path>
        <line x1="378" y1="300" x2="340" y2="250" stroke="url(#grad1)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Floating particles */}
      <circle cx="60" cy="200" r="2" fill="#818cf8" opacity="0.4">
        <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="440" cy="220" r="1.5" fill="#a78bfa" opacity="0.3">
        <animate attributeName="cy" values="220;200;220" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="80" r="2" fill="#38bdf8" opacity="0.3">
        <animate attributeName="cx" values="200;210;200" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="350" cy="350" r="1.5" fill="#34d399" opacity="0.3">
        <animate attributeName="cy" values="350;340;350" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/** Abstract section divider with wave */
export function WaveDivider({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
        <path
          d="M0 40 C360 0 720 80 1080 40 C1260 20 1380 50 1440 40 L1440 80 L0 80 Z"
          fill="var(--color-bg-secondary)"
        />
        <path
          d="M0 50 C360 20 720 70 1080 45 C1260 30 1380 55 1440 45 L1440 80 L0 80 Z"
          fill="var(--color-bg-secondary)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/** Abstract pattern for course/job cards */
export function CardPattern({ variant = 0 }: { variant?: number }) {
  const patterns = [
    // Circuit-like
    <svg key="0" viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
      <circle cx="30" cy="30" r="3" fill="#818cf8" opacity="0.3" />
      <circle cx="170" cy="90" r="3" fill="#a78bfa" opacity="0.3" />
      <line x1="30" y1="30" x2="100" y2="60" stroke="#818cf8" strokeWidth="0.5" opacity="0.15" />
      <line x1="100" y1="60" x2="170" y2="90" stroke="#a78bfa" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="60" r="5" fill="none" stroke="#818cf8" strokeWidth="0.5" opacity="0.2" />
      <rect x="60" y="20" width="80" height="80" rx="40" fill="url(#cardGrad)" opacity="0.05" />
      <defs><radialGradient id="cardGrad"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
    </svg>,
    // Hexagon cluster
    <svg key="1" viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
      <polygon points="100,20 130,40 130,70 100,90 70,70 70,40" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.2" />
      <polygon points="140,40 160,50 160,70 140,80 120,70 120,50" fill="none" stroke="#818cf8" strokeWidth="0.5" opacity="0.15" />
      <polygon points="60,50 80,60 80,80 60,90 40,80 40,60" fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="55" r="30" fill="#a78bfa" opacity="0.04" />
    </svg>,
    // Wave lines
    <svg key="2" viewBox="0 0 200 120" fill="none" className="w-full h-full" aria-hidden="true">
      <path d="M0 40 Q50 20 100 40 Q150 60 200 40" stroke="#818cf8" strokeWidth="0.5" opacity="0.2" />
      <path d="M0 60 Q50 40 100 60 Q150 80 200 60" stroke="#a78bfa" strokeWidth="0.5" opacity="0.15" />
      <path d="M0 80 Q50 60 100 80 Q150 100 200 80" stroke="#38bdf8" strokeWidth="0.5" opacity="0.1" />
      <circle cx="100" cy="60" r="25" fill="#818cf8" opacity="0.04" />
    </svg>,
  ];
  return patterns[variant % patterns.length];
}

/** Animated stat number display */
export function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <span className="inline-block animate-fade-in-up font-bold">
      {value}{suffix}
    </span>
  );
}
