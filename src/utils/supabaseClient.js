import { createClient } from '@supabase/supabase-js'

const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
