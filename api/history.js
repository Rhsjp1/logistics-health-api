import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  try {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return res.status(500).json({
        error: "Missing Supabase environment variables."
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data, error } = await supabase
      .from("route_history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(25);

    if (error) {
      return res.status(500).json({
        error: "Supabase query failed.",
        details: error.message
      });
    }

    const rows = Array.isArray(data) ? data : [];
    const totalRoutes = rows.length;
    const avgHealthScore = rows.length
      ? Math.round(rows.reduce((sum, row) => sum + Number(row.scr_score ?? row.score ?? 0), 0) / rows.length)
      : 0;

    return res.status(200).json({
      total_routes: totalRoutes,
      avg_health_score: avgHealthScore,
      recent_records: rows.length,
      rows
    });
  } catch (err) {
    return res.status(500).json({
      error: "Unexpected server error.",
      details: err.message
    });
  }
}
