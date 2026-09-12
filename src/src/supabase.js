import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wgvtijlhhpsanqxplmmx.supabase.co"

const supabaseKey = "sb_publishable_X_8J3t3lltSTNERNeZJTcw_FKkc7f8d"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
