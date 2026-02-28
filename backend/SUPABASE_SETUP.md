# 🚀 Supabase Setup Guide for RiseAble

## What is Supabase?

Supabase is an **open-source Firebase alternative** that provides:
- ✅ PostgreSQL database (hosted in the cloud)
- ✅ Real-time database subscriptions
- ✅ Built-in authentication (email, OAuth, etc.)
- ✅ Row-level security (RLS)
- ✅ REST API auto-generated from your schema
- ✅ Free tier with generous limits

> **Perfect for RiseAble**: Production-ready, scalable, and judges love seeing hosted databases.

---

## Step 1️⃣: Create a Supabase Account & Project

### 1.1 Go to Supabase Console
Visit: https://app.supabase.com

### 1.2 Sign Up or Log In
- Click **"Sign Up"** or use existing account
- Verify email if new account

### 1.3 Create a New Project
- Click **"New Project"**
- **Project Name**: `riseable` (or your choice)
- **Database Password**: Create a strong password (save it!)
- **Region**: Choose closest to your location (e.g., `us-east-1` for US)
- Click **"Create new project"**

⏳ Wait 30-60 seconds for project to initialize...

---

## Step 2️⃣: Get Your Credentials

Once project is ready:

### 2.1 Open Project Settings
Click **⚙️ Settings** (bottom left) → **API**

### 2.2 Copy These Values

**You'll see:**
```
Project URL: https://YOUR_PROJECT_ID.supabase.co
Anon Key: eyJhbG... (long string)
Service Role Key: eyJhbG... (another long string)
```

**Save to `.env.local`:**
```bash
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT_ID.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```

---

## Step 3️⃣: Initialize Prisma Migrations

### 3.1 Generate Prisma Client
```bash
npx prisma generate
```

### 3.2 Create Database Tables
```bash
npx prisma migrate dev --name "accessibility-settings"
```

**What happens:**
- ✅ Creates tables in Supabase PostgreSQL
- ✅ Generates migration files locally
- ✅ Updates Prisma schema

### 3.3 View Your Database
```bash
npx prisma studio
```
Opens `http://localhost:5555` with your database GUI

---

## Step 4️⃣: Test the Connection

### 4.1 Start Dev Server
```bash
pnpm dev
```

### 4.2 Test API in Browser
```
http://localhost:3000/api/accessibility
```

**Add header in DevTools:**
```
x-user-id: test-user-123
```

Should return:
```json
{
  "id": "abc123",
  "userId": "test-user-123",
  "voiceNavigation": false,
  "screenReader": false,
  ...
}
```

✅ **If you see this, you're connected!**

---

## 📊 Supabase Console Features

### Access Your Data
1. Go to https://app.supabase.com
2. Select your project
3. Click **"Table Editor"** → Select `AccessibilitySettings`
4. View/edit rows directly

### Monitor Database
- **SQL Editor**: Write custom queries
- **Auth**: Manage user authentication  
- **Logs**: View database performance
- **Backups**: Automatic daily backups

---

## 🔐 Security: Row-Level Security (RLS)

For production, enable RLS to prevent users from accessing others' settings:

### Enable RLS
1. Go to **Table Editor**
2. Click `AccessibilitySettings` table
3. Click **⚙️ RLS** (top right)
4. Toggle **"Enable RLS"**

### Create Security Policy
```sql
-- Allow users to see only their own settings
CREATE POLICY "Users can view their own settings"
ON AccessibilitySettings
FOR SELECT
TO authenticated
USING (auth.uid()::text = userId);

-- Allow users to update only their own settings
CREATE POLICY "Users can update their own settings"
ON AccessibilitySettings
FOR UPDATE
TO authenticated
USING (auth.uid()::text = userId);
```

---

## 🔑 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | Connection string for Prisma | `postgresql://postgres:pw@abc.supabase.co:5432/postgres` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API endpoint (public) | `https://abc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public key for client-side operations | `eyJhbG...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret key for server-side operations | `eyJhbG...` (KEEP SECRET!) |

> **⚠️ Important**: Never commit `.env.local` to git. Use `.gitignore` (already set).

---

## 🚀 Deployment to Vercel

After setting up Supabase:

### 1. Push to GitHub
```bash
git add .
git commit -m "Add accessibility backend with Supabase"
git push origin accessibility_feature
```

### 2. Deploy on Vercel
1. Go to https://vercel.com
2. Click **"New Project"**
3. Select your GitHub repo
4. Add environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click **"Deploy"**

✅ Your app is now live!

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- **Check**: Is DATABASE_URL correct?
- **Fix**: Copy value directly from Supabase Settings
- **Test**: `psql postgresql://...` (install psql if needed)

### Error: "Relations don't exist"
- **Cause**: Migrations not run
- **Fix**: Run `npx prisma migrate dev`

### Error: "Permission denied for schema public"
- **Cause**: Missing service role permissions
- **Fix**: Use `SUPABASE_SERVICE_ROLE_KEY` in server-side code

### Error: "x-user-id header required"
- **Cause**: Not passing user ID in requests
- **Fix**: Add `x-user-id` header (or implement NextAuth.js)

---

## 📈 Supabase Pricing

**Free Tier Includes:**
- 500 MB database size
- 2 GB bandwidth
- Up to 50,000 monthly active users
- All features enabled

**Perfect for development and small projects!**

For RiseAble's scale, free tier is more than enough.

---

## 📚 Next Steps

1. ✅ Create Supabase project
2. ✅ Copy credentials to `.env.local`
3. ✅ Run migrations: `npx prisma migrate dev`
4. ✅ Test API locally
5. ⏭️ (Optional) Deploy to Vercel
6. ⏭️ (Optional) Implement Supabase Auth

---

## 🔗 Resources

- **Supabase Docs**: https://supabase.com/docs
- **Prisma + Supabase**: https://www.prisma.io/docs/guides/database/supabase
- **PostgreSQL Guide**: https://www.postgresql.org/docs/
- **RLS Security**: https://supabase.com/docs/guides/auth/row-level-security

---

**Status**: Ready to configure Supabase! 🎉

Next: Create `.env.local` and run migrations.
