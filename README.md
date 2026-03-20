# RiseAble - Accessible Skills & Jobs Platform

An accessibility-first platform designed for specially-abled (disabled) individuals to learn skills, find jobs, and access government schemes. Built with WCAG 2.1+ compliance and real accessibility features.

## Features

### Core Modules
- **Hero Landing Page** — Empowering tagline, animated UI, CTA buttons
- **Courses** — 9+ courses (Tech & Non-Tech) with video, audio, transcripts, captions, and sign language
- **Job Search** — 8+ listings from disability-friendly employers with filters (remote, skill-based, disability-friendly)
- **Government Schemes** — 8 India-focused schemes (education, financial aid, employment)
- **AI Chatbot** — Multilingual (English + Hindi), voice input/output, helps find courses/jobs/schemes
- **User Dashboard** — Course progress tracking, saved jobs, profile settings

### Authentication (Multiple Methods)
- Email + Password
- Google Sign-In (simulated)
- Face Recognition (demo/simulated)
- Voice Authentication (demo/simulated)
- Biometric (demo/simulated)

### Accessibility (WCAG 2.1+ Compliant)
- Screen reader compatible (ARIA labels, semantic HTML, live regions)
- Voice navigation (say "open courses", "find jobs", "go home")
- High contrast mode
- Dark mode
- Adjustable text size (normal, large, extra large)
- Dyslexia-friendly font option
- Keyboard navigation with visible focus indicators
- Skip-to-content link
- Reduced motion support (respects `prefers-reduced-motion`)
- Captions and transcripts for all media
- Sign language support indicators
- Text-to-speech for course content

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Speech:** Web Speech API (Text-to-Speech + Speech-to-Text)
- **State:** React Context API

## Project Structure

```
riseable/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home/landing page
│   │   ├── globals.css         # Global styles, themes, animations
│   │   ├── courses/
│   │   │   ├── page.tsx        # Courses listing
│   │   │   └── [id]/page.tsx   # Course detail page
│   │   ├── jobs/page.tsx       # Job listings
│   │   ├── schemes/page.tsx    # Government schemes
│   │   ├── auth/page.tsx       # Authentication
│   │   └── dashboard/page.tsx  # User dashboard
│   ├── components/
│   │   ├── accessibility/      # Accessibility toolbar, voice nav
│   │   ├── auth/               # Auth page component
│   │   ├── chat/               # AI chatbot
│   │   ├── courses/            # Course card, course detail
│   │   ├── dashboard/          # Dashboard component
│   │   ├── jobs/               # Job card component
│   │   ├── layout/             # Navbar, Footer
│   │   ├── schemes/            # Scheme card component
│   │   └── ui/                 # Hero, Features, Testimonials
│   ├── context/
│   │   ├── AccessibilityContext.tsx  # Theme, text size, font, voice nav
│   │   └── AuthContext.tsx          # Authentication state
│   ├── data/
│   │   ├── courses.ts          # Course data
│   │   ├── jobs.ts             # Job listings data
│   │   └── schemes.ts          # Government schemes data
│   └── hooks/
│       ├── useSpeech.ts        # Text-to-Speech & Speech-to-Text
│       └── useVoiceNavigation.ts  # Voice command navigation
├── public/
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.ts
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd riseable

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Accessibility Testing

- **Screen Reader:** Test with NVDA (Windows), VoiceOver (Mac), or TalkBack (Android)
- **Keyboard:** Tab through all interactive elements — focus indicators should be visible
- **Voice Navigation:** Enable in accessibility toolbar (gear icon, bottom-right), then say commands
- **High Contrast:** Toggle via accessibility toolbar
- **Text Size:** Adjust via accessibility toolbar

## Demo Login

Use any email and password to sign in (demo mode). All auth methods (face, voice, biometric) are simulated for demonstration.

## License

MIT
