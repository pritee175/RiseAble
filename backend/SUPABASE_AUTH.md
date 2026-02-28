# Supabase Authentication Integration (Optional)

This guide shows how to integrate Supabase Auth with your RiseAble project for better authentication than the current `x-user-id` header approach.

---

## Why Supabase Auth?

✅ Email & password login  
✅ OAuth (Google, GitHub, etc.)  
✅ Magic links (passwordless)  
✅ SMS authentication  
✅ Row-level security (RLS)  
✅ Built-in session management  

> This replaces the `x-user-id` header with real user sessions.

---

## Step 1: Install Supabase Auth Package

```bash
pnpm add @supabase/supabase-js
pnpm add @supabase/auth-helpers-nextjs @supabase/auth-helpers-react
```

---

## Step 2: Create Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient } from '@supabase/auth-helpers-nextjs/server'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export const createServerClientComponent = (
  cookies: ReturnType<typeof require('next/headers').cookies>
) =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) =>
            cookies.set(name, value, options)
          )
        },
      },
    }
  )
```

---

## Step 3: Update API Route

Instead of `x-user-id` header, get user from session:

`app/api/accessibility/route.ts`:

```typescript
'use server'

import { prisma } from '@/lib/prisma'
import { createServerClientComponent } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/accessibility
 * Fetch accessibility settings for authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClientComponent(cookieStore)

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized: Please log in' },
        { status: 401 }
      )
    }

    // Fetch settings for this user
    let settings = await prisma.accessibilitySettings.findUnique({
      where: { userId: user.id },
    })

    // Create default if doesn't exist
    if (!settings) {
      settings = await prisma.accessibilitySettings.create({
        data: {
          userId: user.id,
          voiceNavigation: false,
          screenReader: false,
          highContrast: false,
          largeText: false,
          keyboardNav: false,
        },
      })
    }

    return NextResponse.json(settings, { status: 200 })
  } catch (error) {
    console.error('Error fetching accessibility settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/accessibility
 * Update accessibility settings for authenticated user
 */
export async function PUT(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClientComponent(cookieStore)

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized: Please log in' },
        { status: 401 }
      )
    }

    const body = await req.json()

    // Update settings
    const updatedSettings = await prisma.accessibilitySettings.upsert({
      where: { userId: user.id },
      update: body,
      create: {
        userId: user.id,
        ...body,
      },
    })

    return NextResponse.json(updatedSettings, { status: 200 })
  } catch (error) {
    console.error('Error updating accessibility settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## Step 4: Update React Hook

`hooks/use-accessibility.ts`:

```typescript
'use client'

import { AccessibilitySettings } from '@/lib/validations/accessibility'
import { useCallback, useEffect, useState } from 'react'

const DEFAULT_SETTINGS: AccessibilitySettings = {
  voiceNavigation: false,
  screenReader: false,
  highContrast: false,
  largeText: false,
  keyboardNav: false,
}

interface UseAccessibilityReturn {
  settings: AccessibilitySettings
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void
  updateSettings: (settings: Partial<AccessibilitySettings>) => void
  isLoading: boolean
  error: string | null
}

export function useAccessibility(): UseAccessibilityReturn {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/accessibility', {
          method: 'GET',
          // No x-user-id header needed (uses session)
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Please log in to access settings')
          }
          throw new Error(`Failed to fetch settings: ${response.statusText}`)
        }

        const data = await response.json()
        setSettings({
          voiceNavigation: data.voiceNavigation,
          screenReader: data.screenReader,
          highContrast: data.highContrast,
          largeText: data.largeText,
          keyboardNav: data.keyboardNav,
                })
        setError(null)
      } catch (err) {
        console.error('Error fetching accessibility settings:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateSetting = useCallback(
    (key: keyof AccessibilitySettings, value: boolean) => {
      const newSettings = { ...settings, [key]: value }
      setSettings(newSettings)
      persistSettings(newSettings)
    },
    [settings]
  )

  const updateSettings = useCallback(
    (newSettings: Partial<AccessibilitySettings>) => {
      const merged = { ...settings, ...newSettings }
      setSettings(merged)
      persistSettings(merged)
    },
    [settings]
  )

  const persistSettings = async (data: AccessibilitySettings) => {
    try {
      const response = await fetch('/api/accessibility', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Failed to save settings: ${response.statusText}`)
      }

      setError(null)
    } catch (err) {
      console.error('Error saving accessibility settings:', err)
      setError(err instanceof Error ? err.message : 'Failed to save settings')
    }
  }

  return {
    settings,
    updateSetting,
    updateSettings,
    isLoading,
    error,
  }
}
```

---

## Step 5: Row-Level Security (RLS)

Enable RLS in Supabase to prevent users from accessing others' settings:

### 5.1 Enable RLS on Table

1. Go to Supabase Console
2. Table Editor → `AccessibilitySettings`
3. Click ⚙️ (RLS) → Enable

### 5.2 Create Security Policies

```sql
-- Allow authenticated users to view their own settings
CREATE POLICY "Users can view their own settings"
ON AccessibilitySettings
FOR SELECT
TO authenticated
USING (auth.uid()::text = userId);

-- Allow authenticated users to update their own settings
CREATE POLICY "Users can update their own settings"
ON AccessibilitySettings
FOR UPDATE
TO authenticated
USING (auth.uid()::text = userId);

-- Allow authenticated users to insert their own settings
CREATE POLICY "Users can insert their own settings"
ON AccessibilitySettings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = userId);

-- Allow authenticated users to delete their own settings
CREATE POLICY "Users can delete their own settings"
ON AccessibilitySettings
FOR DELETE
TO authenticated
USING (auth.uid()::text = userId);
```

---

## Step 6: Create Login/Sign Up Pages

Create `app/auth/login/page.tsx`:

```typescript
'use client'

import { createClient } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">RiseAble Login</h1>

        {error && <div className="text-destructive">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
```

---

## Step 7: Test Everything

```bash
# 1. Start dev server
pnpm dev

# 2. Go to login
# http://localhost:3000/auth/login

# 3. Sign up for new account

# 4. Access dashboard
# Settings should now use authenticated user
```

---

## Migration Path

**Current** → **With Auth**:
- ❌ `x-user-id` header
- ✅ Supabase Auth session
- ✅ Real user authentication
- ✅ Row-level security
- ✅ Better security

---

## Resources

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Auth Helpers**: https://supabase.com/docs/guides/auth/auth-helpers/nextjs
- **NextAuth.js Alternative**: https://next-auth.js.org/

---

**Status**: Optional auth integration ready! 🔐
