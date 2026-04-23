import { createClient } from '@supabase/supabase-js'

// No auth in this project — plain anon client is sufficient for public reads
// and works in both request-time Server Components and build-time generateStaticParams.
export function createServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
