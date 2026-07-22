# RiseAble - Accessible Jobs & Schemes Platform

An accessibility-first platform that helps persons with disabilities in India find inclusive jobs, understand government welfare schemes, and get help from a multilingual AI assistant with a 3D Indian Sign Language avatar. Built with WCAG-conscious UI throughout.

## Features

### Core Modules
- **Hero Landing Page** — Empowering tagline, animated UI, CTA buttons
- **Job Search** — 8 curated listings from disability-friendly employers with filters (remote, category, disability-friendly)
- **Government Schemes** — 8 India-focused schemes (education, financial aid, employment)
- **AI Chatbot** — Calls OpenAI (`gpt-3.5-turbo`) when `OPENAI_API_KEY` is set, with a rule-based fallback so the chatbot still answers without a key. Supports 9 languages via live translation.
- **3D Sign Language Avatar** — A real Three.js + GLTF avatar (`public/models/xbot.glb`) that interprets chatbot replies into Indian Sign Language, driven by hand-authored word/alphabet animation data.
- **User Dashboard** — Saved jobs and accessibility preferences, backed by real signed-in user state.

### Authentication
- **Email + Password** — Real: backed by `/api/auth/login` and `/api/auth/signup`, validated server-side (duplicate email, password length, wrong-password rejection all enforced). User data is stored in a shared in-memory store (see Known Limitations).
- **Google / Face / Voice / Biometric** — Explicitly labeled **(Demo)** in the UI. These are simulated for demonstration and do not perform real OAuth or biometric verification.

### Accessibility
- Screen reader compatible (ARIA labels, semantic HTML, live regions)
- Voice navigation (say "find jobs", "open schemes", "go home")
- High contrast mode, dark mode, adjustable text size, dyslexia-friendly font
- Keyboard navigation with visible focus indicators, skip-to-content link
- Reduced motion support (respects `prefers-reduced-motion`)
- Text-to-speech and speech-to-text (Web Speech API)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **3D:** Three.js + GLTFLoader
- **AI:** OpenAI Chat Completions API (with rule-based fallback)
- **Translation:** MyMemory Translation API (free, no key required)
- **Speech:** Web Speech API (Text-to-Speech + Speech-to-Text)
- **State:** React Context API

## Project Structure

```
riseable/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/{login,signup,profile}/route.ts   # Real auth endpoints, shared in-memory store
│   │   │   ├── chat/route.ts                          # OpenAI + rule-based fallback
│   │   │   └── translate/route.ts                     # MyMemory translation proxy
│   │   ├── jobs/page.tsx
│   │   ├── schemes/page.tsx
│   │   ├── auth/page.tsx
│   │   ├── chat/page.tsx
│   │   └── dashboard/page.tsx
│   ├── components/
│   │   ├── accessibility/      # Accessibility toolbar, voice nav
│   │   ├── auth/                # Auth page component
│   │   ├── chat/                # AI chatbot UI
│   │   ├── sign-language/       # 3D ISL avatar + animation data
│   │   ├── jobs/, schemes/      # Job/scheme cards
│   │   ├── dashboard/, profile/
│   │   └── layout/, ui/
│   ├── context/
│   │   ├── AccessibilityContext.tsx
│   │   └── AuthContext.tsx      # Calls real /api/auth routes for email/password
│   ├── lib/
│   │   └── userStore.ts         # Shared in-memory user store used by all auth routes
│   ├── data/
│   │   ├── jobs.ts
│   │   └── schemes.ts
│   └── hooks/
│       ├── useSpeech.ts
│       └── useVoiceNavigation.ts
├── public/models/xbot.glb       # 3D avatar model
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
git clone <repo-url>
cd riseable
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables (optional)

```
OPENAI_API_KEY=sk-...   # Optional — chatbot falls back to rule-based responses if unset
```

### Demo Login

```
Email: demo@riseable.com
Password: demo123
```

Or sign up with a new email/password — it's validated and stored for real (in-memory).

## Known Limitations / Roadmap

- **In-memory user store** — accounts and saved jobs reset when the server restarts. A real database (e.g. Firebase or Postgres) would be the next step for persistence.
- **No session persistence across page reloads** — auth state lives in React state only; a full page reload logs the user out. Next step: cookies/JWT session.
- **Face / Voice / Biometric / Google login are simulated** — clearly labeled "(Demo)" in the UI. Real biometric auth would use WebAuthn.
- **"Apply Now" is a demo action** — no real application pipeline exists yet.
- **Profile edits (bio/phone/location) are client-side only** — the `/api/auth/profile` PUT endpoint exists but isn't yet wired up from the Profile page.

## License

MIT
