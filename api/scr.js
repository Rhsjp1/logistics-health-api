const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const CITY_COORDS = {
  PHL: { lat: 39.95,  lon: -75.17,  name: "Philadelphia, PA" },
  LAX: { lat: 33.94,  lon: -118.40, name: "Los Angeles, CA"  },
  ORD: { lat: 41.98,  lon: -87.90,  name: "Chicago, IL"      },
  DFW: { lat: 32.90,  lon: -97.04,  name: "Dallas, TX"       },
  ATL: { lat: 33.64,  lon: -84.43,  name: "Atlanta, GA"      },
  MIA: { lat: 25.80,  lon: -80.28,  name: "Miami, FL"        },
  SEA: { lat: 47.45,  lon: -122.31, name: "Seattle, WA"      },
  JFK: { lat: 40.64,  lon: -73.78,  name: "New York, NY"     },
  HOU: { lat: 29.65,  lon: -95.28,  name: "Houston, TX"      },
  PHX: { lat: 33.44,  lon: -112.01, name: "Phoenix, AZ"      },
};

async function getWeatherScore(lat, lon) {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=precipitation,windspeed_10m,weathercode` +
      `&temperature_unit=fahrenheit`;
    const res  = await fetch(url);
    const data = await res.json();
    const curr = data.current;
    const wind   = curr.windspeed_10m || 0;
    const precip = curr.precipitation || 0;
    const wCode  = curr.weathercode   || 0;
    let score = 100;
    if (wind > 40) score -= 30;
    else if (wind > 25) score -= 15;
    else if (wind > 15) score -= 5;
    if (precip > 10) score -= 30;
    else if (precip > 3) score -= 15;
    else if (precip > 0) score -= 5;
    if (wCode >= 95) score -= 25;
    else if (wCode >= 71) score -= 15;
    else if (wCode >= 51) score -= 8;
    return Math.max(0, Math.min(100, score));
  } catch (err) {
    console.error("Weather fetch failed:", err.message);
    return 75;
  }
}

function getModeScore(mode) {
  const modes = { trucking: 80, rail: 85, air: 70, ocean: 65, intermodal: 78 };
  return modes[(mode || "trucking").toLowerCase()] || 80;
}

function calcSCRScore(originWeather, destWeather, modeScore) {
  return Math.round((originWeather + destWeather) / 2 * 0.5 + modeScore * 0.5);
}

function getScoreLabel(score) {
  if (score >= 85) return { label: "Excellent", color: "#22c55e" };
  if (score >= 70) return { label: "Good",      color: "#84cc16" };
  if (score >= 55) return { label: "Fair",      color: "#eab308" };
  if (score >= 40) return { label: "At Risk",   color: "#f97316" };
  return               { label: "Critical",    color: "#ef4444" };
}

async function saveToDatabase(record) {
  try {
    const { error } = await supabase.from("lane_scores").insert([record]);
    if (error) console.error("Supabase insert error:", error.message);
  } catch (err) {
    console.error("Supabase connection error:", err.message);
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }
  const { origin, dest, mode } = req.query;
  if (!origin || !dest) {
    return res.status(400).json({
      error: "Missing required parameters.",
      usage: "/api/scr?origin=PHL&dest=LAX&mode=trucking",
    });
  }
  const originKey  = origin.toUpperCase();
  const destKey    = dest.toUpperCase();
  const originCity = CITY_COORDS[originKey];
  const destCity   = CITY_COORDS[destKey];
  if (!originCity) return res.status(400).json({ error: `Unknown origin: ${originKey}` });
  if (!destCity)   return res.status(400).json({ error: `Unknown dest: ${destKey}` });
  const [originWeather, destWeather] = await Promise.all([
    getWeatherScore(originCity.lat, originCity.lon),
    getWeatherScore(destCity.lat,   destCity.lon),
  ]);
  const modeScore = getModeScore(mode);
  const scrScore  = calcSCRScore(originWeather, destWeather, modeScore);
  const tier      = getScoreLabel(scrScore);
  const result = {
    scr_score:  scrScore,
    tier:       tier.label,
    tier_color: tier.color,
    lane: {
      origin:      originKey,
      origin_name: originCity.name,
      dest:        destKey,
      dest_name:   destCity.name,
      mode:        (mode || "trucking").toLowerCase(),
    },
    breakdown: {
      origin_weather_score: originWeather,
      dest_weather_score:   destWeather,
      mode_baseline_score:  modeScore,
    },
    generated_at: new Date().toISOString(),
    version: "1.0.0",
  };
  await saveToDatabase({ origin: originKey, destination: destKey, mode: result.lane.mode, score: scrScore });
  return res.status(200).json(result);
};