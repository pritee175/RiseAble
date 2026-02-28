# Accessibility Settings Backend - Implementation Guide

## 📋 Overview

This document outlines the backend architecture for the **Accessibility Settings** feature in RiseAble. The implementation follows a clean, scalable, feature-by-feature approach using Next.js API Routes, Prisma ORM, and PostgreSQL.

---

## 🏗️ Architecture Overview

```
Frontend (React Components)
    ↓
Custom Hooks (useAccessibility, useApplyAccessibilitySettings)
    ↓
API Routes (/api/accessibility)
    ↓
Prisma ORM → PostgreSQL Database
```

### Key Components:

1. **Database Layer**: PostgreSQL with Prisma ORM
2. **API Layer**: Next.js API Routes (REST endpoints)
3. **Validation Layer**: Zod schemas
4. **Frontend Integration**: Custom React hooks

---

## 🗄️ Database Schema

### AccessibilitySettings Table

```sql
CREATE TABLE AccessibilitySettings (
  id              VARCHAR(255) PRIMARY KEY,
  userId          VARCHAR(255) UNIQUE NOT NULL,
  voiceNavigation BOOLEAN DEFAULT false,
  screenReader    BOOLEAN DEFAULT false,
  highContrast    BOOLEAN DEFAULT false,
  largeText       BOOLEAN DEFAULT false,
  keyboardNav     BOOLEAN DEFAULT false,
  createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE
);
```

> ⚠️ **Note:** sign-language support was removed in a later revision. If you are migrating an existing database, run:
>
> ```bash
> npx prisma migrate dev --name remove_sign_language
> ```
> 
> This will drop the `signLanguage` column and update the Prisma client.

**Prisma Schema** (in `prisma/schema.prisma`):

```prisma
model AccessibilitySettings {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  voiceNavigation Boolean  @default(false)
  screenReader    Boolean  @default(false)
  highContrast    Boolean  @default(false)
  largeText       Boolean  @default(false)
  keyboardNav     Boolean  @default(false)  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## 🔌 API Endpoints

### 1. GET `/api/accessibility`

**Purpose**: Fetch accessibility settings for the current user

**Request Headers**:
```
GET /api/accessibility
x-user-id: user-id-123
```

**Response (Success - 200)**:
```json
{
  "id": "abc123",
  "userId": "user-id-123",
  "voiceNavigation": false,
  "screenReader": true,
  "highContrast": false,
  "largeText": true,
  "keyboardNav": false,
  "signLanguage": false,
  "createdAt": "2024-02-10T10:00:00Z",
  "updatedAt": "2024-02-10T10:00:00Z"
}
```

**Response (Error - 401)**:
```json
{
  "error": "Unauthorized: No user ID provided"
}
```

**Behavior**:
- ✅ Fetches existing settings for the user
- ✅ Auto-creates default settings if none exist
- ✅ Returns immediately with cached data

---

### 2. PUT `/api/accessibility`

**Purpose**: Update accessibility settings for the current user

**Request Headers**:
```
PUT /api/accessibility
x-user-id: user-id-123
Content-Type: application/json
```

**Request Body**:
```json
{
  "voiceNavigation": true,
  "screenReader": false,
  "highContrast": true,
  "largeText": false,
  "keyboardNav": true,
  "signLanguage": false
}
```

**Response (Success - 200)**:
```json
{
  "id": "abc123",
  "userId": "user-id-123",
  "voiceNavigation": true,
  "screenReader": false,
  "highContrast": true,
  "largeText": false,
  "keyboardNav": true,
  "signLanguage": false,
  "createdAt": "2024-02-10T10:00:00Z",
  "updatedAt": "2024-02-10T10:30:00Z"
}
```

**Response (Error - 400)**:
```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "boolean",
      "received": "string",
      "path": ["voiceNavigation"],
      "message": "Expected boolean, received string"
    }
  ]
}
```

**Behavior**:
- ✅ Validates all input using Zod
- ✅ Uses upsert pattern (creates if not exists, updates if exists)
- ✅ Persists changes to database
- ✅ Returns updated settings

---

## 🎣 React Custom Hooks

### `useAccessibility(userId?: string)`

**Purpose**: Manage accessibility settings state and operations

**Returns**:
```typescript
{
  settings: AccessibilitySettings     // Current settings
  updateSetting: (key, value) => void // Update single setting
  updateSettings: (partial) => void   // Update multiple settings
  isLoading: boolean                  // Fetch in progress
  error: string | null                // Error message
}
```

**Usage**:
```typescript
const { settings, updateSetting, isLoading, error } = useAccessibility('user-123')

if (isLoading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>
```

---

## 🛠 Troubleshooting

If you see `Internal Server Error` when the frontend tries to fetch or update settings, the backend is catching an exception. Common causes:

1. **Database not initialized** – make sure you've run the Prisma migration to create the tables:

   ```bash
   npx prisma migrate dev --name init
   ```

2. **Missing `DATABASE_URL`** – ensure `.env.local` (or your environment) contains a valid connection string pointing at your Postgres/Supabase database. Copy from `.env.example` and fill in values.

3. **Connection issues** – the database may be offline or credentials invalid. Check the error message printed in the server console; in development the API returns the actual error text in JSON, which will be surfaced by the client hook.

4. **Prisma client out of sync** – if you've changed `schema.prisma` run `npx prisma generate` again.

Inspect the server logs for details and fix accordingly, then reload the frontend.

return (
  <button onClick={() => updateSetting('highContrast', true)}>
    Enable High Contrast
  </button>
)
```

**Features**:
- 🔄 Auto-fetches settings on mount
- 💾 Auto-saves to backend on changes
- ⚡ Optimistic updates (updates UI immediately)
- 🛡️ Error handling with user feedback

---

### `useApplyAccessibilitySettings(settings: AccessibilitySettings)`

**Purpose**: Apply accessibility settings globally to the document

**Behavior**:
- 🎨 Adds/removes CSS classes based on settings
- 📋 Sets data attributes on `<html>` element
- ♿ Handles keyboard navigation, screen reader mode, etc.

**Example**:
```typescript
useApplyAccessibilitySettings({ highContrast: true, largeText: false, ... })
// Adds 'high-contrast' class to <html>
// Applies high contrast CSS globally
```

---

## 📁 File Structure

```
backend/
├── app/
│   ├── api/
│   │   └── accessibility/
│   │       └── route.ts          # GET & PUT endpoints
│   └── globals.css               # Accessibility CSS styles
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   └── validations/
│       └── accessibility.ts      # Zod schemas
├── hooks/
│   ├── use-accessibility.ts      # Main hook for settings
│   └── use-apply-accessibility.ts # Hook to apply styles
├── prisma/
│   └── schema.prisma             # Database schema
├── .env.example                  # Environment variables template
└── package.json                  # Dependencies
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

This installs Prisma and other dependencies added to `package.json`.

---

### 2. Configure Database

Create `.env.local` with database connection:

```bash
# Option A: PostgreSQL (Production)
DATABASE_URL="postgresql://user:password@localhost:5432/riseable_db"

# Option B: SQLite (Local Development)
DATABASE_URL="file:./dev.db"

# Option C: Supabase (Hosted PostgreSQL)
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres"
```

---

### 3. Run Database Migration

```bash
# Generate Prisma client
pnpm dlx prisma generate

# Create tables in database
npx prisma migrate dev --name accessibility-settings

# (Optional) Seed sample data
npx prisma db seed
```

---

### 4. Start Development Server

```bash
pnpm dev
```

Server runs on `http://localhost:3000`

---

## 📊 Database Population & Testing

### Quick Test with cURL

```bash
# Get settings for user
curl -X GET http://localhost:3000/api/accessibility \
  -H "x-user-id: test-user-123"

# Update settings
curl -X PUT http://localhost:3000/api/accessibility \
  -H "x-user-id: test-user-123" \
  -H "Content-Type: application/json" \
  -d '{
    "voiceNavigation": true,
    "screenReader": false,
    "highContrast": true,
    "largeText": false,
    "keyboardNav": true,
    "signLanguage": false
  }'
```

---

## 🔐 Security Considerations

### Current Implementation (Development)
- Uses `x-user-id` header for authentication
- **⚠️ NOT PRODUCTION READY**

### For Production:
1. Implement proper authentication (NextAuth.js, JWT, OAuth)
2. Validate user token in API routes
3. Use database-level row security
4. Add rate limiting to prevent abuse
5. Encrypt sensitive data in transit (HTTPS only)

**Example Production Authentication**:
```typescript
import { getServerSession } from 'next-auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Use session.user.id for database queries
}
```

---

## 🎨 CSS Classes Applied

### High Contrast (`.high-contrast`)
- 100% black/white contrast
- Bold borders
- Text shadows for readability

### Large Text (`.large-text`)
- Base font size: 115%
- Scaled headings and buttons
- Improved touch targets

### Keyboard Navigation (`.keyboard-nav`)
- Visible focus indicators (3px dashed outlines)
- Enhanced focus visibility
- Keyboard-only navigation support

### Screen Reader Mode (`[data-screen-reader="true"]`)
- Enhanced semantic HTML
- ARIA labels and regions
- Focus management

### Voice Navigation (`[data-voice-nav="true"]`)
- Highlighted interactive elements
- Enhanced button visibility

### Sign Language (`[data-sign-language="true"]`)
- Reserved space for interpreter video
- Reserved at top of page

---

## 🧪 Testing Checklist

- [ ] Database migrations run successfully
- [ ] GET `/api/accessibility` returns default settings
- [ ] PUT `/api/accessibility` saves settings
- [ ] Settings persist after page reload
- [ ] High contrast CSS applies correctly
- [ ] Large text mode works
- [ ] Keyboard navigation highlights elements
- [ ] Multiple users have separate settings
- [ ] Error handling works (invalid input, etc.)

---

## 📈 Scalability Plan (Future Features)

### Phase 2: Advanced Features
- [ ] Speech recognition (Web Speech API)
- [ ] Text-to-speech
- [ ] Color blindness filters
- [ ] Dyslexia-friendly fonts
- [ ] Animation preferences

### Phase 3: Backend Enhancements
- [ ] User preference history/versioning
- [ ] Accessibility preset templates
- [ ] Organization-wide accessibility policies
- [ ] Analytics on accessibility usage

### Phase 4: Integration
- [ ] Backend session storage (persist across logins)
- [ ] Accessibility audit logging
- [ ] Compliance reporting (WCAG, ADA)
- [ ] Admin dashboard for accessibility stats

---

## 🐛 Troubleshooting

### "Module not found: prisma"
```bash
pnpm install
npx prisma generate
```

### Database connection errors
- Check `DATABASE_URL` in `.env.local`
- Verify database server is running
- Test connection: `npx prisma db execute --stdin`

### Settings not persisting
- Check browser console for errors
- Verify API endpoint is responding
- Check database for saved settings: `npx prisma studio`

### Styles not applying
- Ensure `useApplyAccessibilitySettings` hook is called
- Check CSS classes in browser DevTools
- Verify `globals.css` is imported

---

## 📚 Resources

- **Prisma Docs**: https://www.prisma.io/docs/
- **Next.js API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Zod Validation**: https://zod.dev/
- **Web Accessibility (WCAG 2.1)**: https://www.w3.org/WAI/WCAG21/quickref/

---

## 📝 License

Part of the RiseAble project.

---

**Last Updated**: February 10, 2026
**Version**: 1.0.0
