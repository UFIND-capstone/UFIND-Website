
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tqvgagdffmjtxswldtgm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxdmdhZ2RmZm1qdHhzd2xkdGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTExMTgsImV4cCI6MjA0ODI4NzExOH0.nf0tUCRt36slpg5H-f7FUQEdrU3FUe5KNtQoX56xHXY'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase