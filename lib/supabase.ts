
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dmqqqebuqqvjbfegxhhl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcXFxZWJ1cXF2amJmZWd4aGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDM4NTMsImV4cCI6MjA4MDU3OTg1M30.FnDR4f_82A7mKPK53EDCvC3syjpIIVoqihUBSTKduQ8";

export const supabase = createClient(supabaseUrl, supabaseKey);
