# MyCollege - Ready Project Skeleton

This is a ready-to-extract Next.js TypeScript skeleton with Tailwind and placeholder Supabase integration.

How to use:
1. Unzip and open the folder.
2. Run `npm install`
3. Create a `.env.local` with your Supabase keys:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (if needed)
4. Run `npm run dev`

Notes:
- API routes and auth functions are placeholders. Replace with real Supabase calls in `lib/auth.ts`, `lib/supabase.ts`, and `app/api/upload/route.ts`.
