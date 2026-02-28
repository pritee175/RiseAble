# Quick Start Guide - Accessibility Settings Backend

## ✅ What's Been Implemented

✨ **Complete backend infrastructure for Accessibility Settings feature:**

### Database Layer
- ✅ Prisma schema with User & AccessibilitySettings models
- ✅ PostgreSQL database design with proper relationships
- ✅ Auto-generated Prisma client

### API Layer
- ✅ GET `/api/accessibility` - Fetch user settings
- ✅ PUT `/api/accessibility` - Update user settings
- ✅ Zod validation for request/response data
- ✅ Error handling and default settings creation

### Frontend Integration
- ✅ `useAccessibility()` hook - Manage settings state
- ✅ `useApplyAccessibilitySettings()` hook - Apply styles globally
- ✅ Updated DashboardLayout to use hooks
- ✅ Integrated with backend API

### Styling
- ✅ High Contrast mode CSS
- ✅ Large Text mode CSS
- ✅ Keyboard Navigation mode CSS
- ✅ Screen Reader mode support
- ✅ Voice Navigation styling

---

## 🚀 Next Steps (For You)

### Step 1: Install Dependencies
```bash
cd d:\Projects\RiseAble
pnpm install
```

### Step 2: Configure Database (Supabase)

**Follow the complete Supabase setup guide:**

📖 **Read**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

**Quick Summary:**
1. Go to https://app.supabase.com
2. Create new project
3. Copy credentials to `.env.local`:
```bash
DATABASE_URL="postgresql://postgres:PASSWORD@PROJECT-ID.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT-ID.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```

### Step 3: Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Create database tables in Supabase
npx prisma migrate dev --name "accessibility-settings"
```

### Step 4: Test the Setup
```bash
# Start dev server
pnpm dev

# In another terminal, test the API
curl -X GET http://localhost:3000/api/accessibility \
  -H "x-user-id: test-user-123"
```

---

## 📁 File Checklist

Verify these files were created:

```
✅ prisma/schema.prisma                - Database schema
✅ app/api/accessibility/route.ts     - API endpoints
✅ lib/prisma.ts                       - Prisma client
✅ lib/validations/accessibility.ts   - Zod schemas
✅ hooks/use-accessibility.ts          - Main hook
✅ hooks/use-apply-accessibility.ts   - Style application hook
✅ app/globals.css                     - Accessibility styles (updated)
✅ components/dashboard-layout.tsx     - Updated with hooks
✅ .env.example                        - Environment template
✅ backend/SUPABASE_SETUP.md           - Supabase setup guide (START HERE)
✅ backend/QUICK_START.md              - This file
✅ backend/ACCESSIBILITY_BACKEND.md    - Full documentation
✅ backend/API_REFERENCE.md            - API docs
```

---

## 🧪 Quick Test

### 1. Start the App
```bash
pnpm dev
```

### 2. Open Dashboard
Navigate to `http://localhost:3000/dashboard`

### 3. Test Accessibility Settings
Click **"Accessibility Settings"** button and toggle switches

### 4. Verify in Console
Open browser DevTools → Console and check for network requests to `/api/accessibility`

---

## 🎯 Key Architecture Decisions

| Component | Choice | Why |
|-----------|--------|-----|
| Backend | Next.js API Routes | Keep everything in one monorepo |
| Database | PostgreSQL + Prisma | Type-safe, scalable, judges love it |
| Validation | Zod | TypeScript-first, great DX |
| State Management | React Hooks | No extra library, simple & clean |
| Styling | CSS Classes | Easy to apply/remove dynamically |

---

## 🔑 Important Notes

### Current Implementation
- Uses `x-user-id` header for demo/testing
- Settings persist in Supabase PostgreSQL database per user
- Works in development immediately after setup
- Automatically syncs with Supabase cloud

### For Production (Future)
You'll need to:
1. Implement proper authentication (Supabase Auth or NextAuth.js recommended)
2. Replace `x-user-id` with real user sessions
3. Enable Row-Level Security (RLS) on Supabase
4. Add rate limiting & security headers
5. Deploy frontend to Vercel (Supabase handles backend)

---

## 📚 File Locations & Descriptions

### `lib/prisma.ts`
Singleton Prisma client to prevent multiple instances in development

### `lib/validations/accessibility.ts`
Zod schemas for input validation and type safety

### `app/api/accessibility/route.ts`
Core API endpoints - GET (fetch) and PUT (update)

### `hooks/use-accessibility.ts`
React hook that manages settings state, fetches on mount, saves on change

### `hooks/use-apply-accessibility.ts`
React hook that applies CSS classes/attributes based on settings

### `app/globals.css`
Contains all accessibility feature styling (high contrast, large text, etc.)

### `components/dashboard-layout.tsx`
Updated to use hooks instead of useState

---

## ⚡ Performance Tips

1. **Cacheing**: Settings are fetched only once on mount
2. **Optimistic Updates**: UI updates immediately, backend syncs after
3. **Debouncing**: Consider adding debounce to avoid too many API calls
4. **Database Indexing**: Already set up unique index on userId

---

## 🐛 Debugging Tips

### Check Network Requests
1. Open DevTools → Network tab
2. Toggle an accessibility setting
3. Look for `/api/accessibility` PUT request
4. Check response status and data

### Check Database
```bash
npx prisma studio
# Opens http://localhost:5555 with database GUI
```

### Check Logs
```bash
# See Prisma logs
DATABASE_LOGGING=true pnpm dev
```

---

## 🎓 For Your Resume/Viva

**You can now explain:**
1. ✅ Made REST API with proper HTTP methods (GET/PUT)
2. ✅ Database design with relationships (User → AccessibilitySettings)
3. ✅ Input validation with Zod (type-safe)
4. ✅ ORM usage with Prisma (efficient queries)
5. ✅ Frontend-backend integration (hooks calling APIs)
6. ✅ Persistent state across sessions (database storage)
7. ✅ Global accessibility features (CSS + hooks)
8. ✅ Scalable architecture (easy to add features)

---

## 🤔 Frequently Asked Questions

**Q: Do I need to run migrations for other users?**
A: No, migrations run once per project. Each user gets their own settings automatically.

**Q: Can I test without a real database?**
A: Yes! Use SQLite with `DATABASE_URL="file:./dev.db"`

**Q: How do I reset the database?**
A: Delete `dev.db` and run `npx prisma migrate dev` again

**Q: Will settings work offline?**
A: No, but you can add LocalStorage fallback for offline support

**Q: How do I add more accessibility features?**
A: Add fields to `AccessibilitySettings` model in `schema.prisma`, then migrate

---

## 📞 Support

If you hit errors:
1. Check the **[ACCESSIBILITY_BACKEND.md](./ACCESSIBILITY_BACKEND.md)** for detailed docs
2. Look at error messages - they usually explain what's wrong
3. Check `pnpm install` worked correctly
4. Verify `.env.local` has correct database URL

---

**Status**: ✅ Ready to test!
**Next Task**: Install dependencies and set up database

Good luck! 🚀
