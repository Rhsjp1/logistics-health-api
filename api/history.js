const { createClient } = require("@supabase/supabase-js");

async function validateApiKey(key) {
  if (!key) return { valid: false, reason: "No API key provided." };
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { data, error } = await supabase
      .from("api_keys")
      .select("id, client_name, active")
      .eq("key", key)
      .single();

    if (error || !data) return { valid: false, reason: "Invalid API key." };
    if (!data.active) return { valid: false, reason: "API key is inactive." };

    return { valid: true, client: data.client_name };
  } catch (err) {
    console.error("Key validation error:", err.message);
    return { valid: false, reason: "Key validation failed." };
  }
}

function getTier(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 55) return "Fair";
  if (score >= 40) return "At Risk";
  return "Critical";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "x-api-key");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const apiKey = req.headers["x-api-key"] || req.query.key;
  const auth = await validateApiKey(apiKey);

  if (!auth.valid) {
    return res.status(401).json({
      error: auth.reason,
      hint: "Pass your API key as ?key=YOUR_KEY or as the x-api-key header.",
    });
  }

  const origin = (req.query.origin || "PHL").toUpperCase();
  const destination = (req.query.dest || req.query.destination || "LAX").toUpperCase();
  const mode = (req.query.mode || "trucking").toLowerCase();
  const limit = Math.min(parseInt(req.query.limit || "10", 10), 50);

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { data, error } = await supabase
      .from("lane_scores")
      .select("origin, destination, mode, score, created_at")
      .eq("origin", origin)
      .eq("destination", destination)
      .eq("mode", mode)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("History query error:", error.message);
      return res.status(500).json({ error: "Failed to load history." });
    }

    const rows = (data || []).map((row) => ({
      timestamp: row.created_at,
      origin: row.origin,
      destination: row.destination,
      mode: row.mode,
      score: row.score,
      tier: getTier(row.score),
    }));

    return res.status(200).json({
      client: auth.client,
      lane: { origin, destination, mode },
      count: rows.length,
      rows,
    });
  } catch (err) {
    console.error("History endpoint error:", err.message);
    return res.status(500).json({ error: "History endpoint failed." });
  }
};
