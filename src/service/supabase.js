import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mzuylvipnvnyleplijvq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dXlsdmlwbnZueWxlcGxpanZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NjI2NjYsImV4cCI6MjAxNjMzODY2Nn0.6DYHpm19K1_qcl_nNSgvYGGaeDFiy2ijRzXDA9j2XeM";

export const supabase = createClient(supabaseUrl, supabaseKey);
