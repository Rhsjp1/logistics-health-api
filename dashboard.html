cat > /mnt/user-data/outputs/api/scr.js << 'ENDOFFILE'
const { createClient } = require("@supabase/supabase-js");

const CITY_COORDS = {
  // Northeast
  BOS: { lat: 42.37, lon: -71.02, name: "Boston, MA" },
  JFK: { lat: 40.64, lon: -73.78, name: "New York, NY" },
  PHL: { lat: 39.95, lon: -75.17, name: "Philadelphia, PA" },
  BWI: { lat: 39.17, lon: -76.67, name: "Baltimore, MD" },
  DCA: { lat: 38.85, lon: -77.04, name: "Washington, DC" },
  BDL: { lat: 41.94, lon: -72.68, name: "Hartford, CT" },
  PVD: { lat: 41.72, lon: -71.43, name: "Providence, RI" },
  BUF: { lat: 42.94, lon: -78.73, name: "Buffalo, NY" },
  ALB: { lat: 42.75, lon: -73.80, name: "Albany, NY" },
  PWM: { lat: 43.65, lon: -70.31, name: "Portland, ME" },

  // Southeast
  ATL: { lat: 33.64, lon: -84.43, name: "Atlanta, GA" },
  MIA: { lat: 25.80, lon: -80.28, name: "Miami, FL" },
  TPA: { lat: 27.97, lon: -82.53, name: "Tampa, FL" },
  MCO: { lat: 28.43, lon: -81.31, name: "Orlando, FL" },
  JAX: { lat: 30.49, lon: -81.69, name: "Jacksonville, FL" },
  CLT: { lat: 35.21, lon: -80.94, name: "Charlotte, NC" },
  RDU: { lat: 35.88, lon: -78.79, name: "Raleigh, NC" },
  GSO: { lat: 36.10, lon: -79.94, name: "Greensboro, NC" },
  CHS: { lat: 32.90, lon: -80.04, name: "Charleston, SC" },
  CAE: { lat: 33.94, lon: -81.12, name: "Columbia, SC" },
  SAV: { lat: 32.13, lon: -81.20, name: "Savannah, GA" },
  BHM: { lat: 33.56, lon: -86.75, name: "Birmingham, AL" },
  MSY: { lat: 29.99, lon: -90.26, name: "New Orleans, LA" },
  MEM: { lat: 35.04, lon: -89.98, name: "Memphis, TN" },
  BNA: { lat: 36.12, lon: -86.68, name: "Nashville, TN" },
  TYS: { lat: 35.81, lon: -83.99, name: "Knoxville, TN" },
  RIC: { lat: 37.50, lon: -77.32, name: "Richmond, VA" },
  ORF: { lat: 36.90, lon: -76.01, name: "Norfolk, VA" },

  // Midwest
  ORD: { lat: 41.98, lon: -87.90, name: "Chicago, IL" },
  DTW: { lat: 42.21, lon: -83.35, name: "Detroit, MI" },
  CLE: { lat: 41.41, lon: -81.85, name: "Cleveland, OH" },
  CMH: { lat: 39.99, lon: -82.89, name: "Columbus, OH" },
  CVG: { lat: 39.05, lon: -84.67, name: "Cincinnati, OH" },
  IND: { lat: 39.72, lon: -86.29, name: "Indianapolis, IN" },
  MKE: { lat: 42.95, lon: -87.90, name: "Milwaukee, WI" },
  MSP: { lat: 44.88, lon: -93.22, name: "Minneapolis, MN" },
  STL: { lat: 38.75, lon: -90.37, name: "St. Louis, MO" },
  MCI: { lat: 39.30, lon: -94.71, name: "Kansas City, MO" },
  OMA: { lat: 41.30, lon: -95.89, name: "Omaha, NE" },
  DSM: { lat: 41.53, lon: -93.66, name: "Des Moines, IA" },
  FSD: { lat: 43.58, lon: -96.74, name: "Sioux Falls, SD" },
  FAR: { lat: 46.92, lon: -96.82, name: "Fargo, ND" },
  GRR: { lat: 42.88, lon: -85.52, name: "Grand Rapids, MI" },

  // South Central
  DFW: { lat: 32.90, lon: -97.04, name: "Dallas, TX" },
  HOU: { lat: 29.65, lon: -95.28, name: "Houston, TX" },
  SAT: { lat: 29.53, lon: -98.47, name: "San Antonio, TX" },
  AUS: { lat: 30.20, lon: -97.67, name: "Austin, TX" },
  ELP: { lat: 31.81, lon: -106.38, name: "El Paso, TX" },
  LBB: { lat: 33.66, lon: -101.82, name: "Lubbock, TX" },
  OKC: { lat: 35.39, lon: -97.60, name: "Oklahoma City, OK" },
  TUL: { lat: 36.20, lon: -95.89, name: "Tulsa, OK" },
  LIT: { lat: 34.73, lon: -92.22, name: "Little Rock, AR" },
  JAN: { lat: 32.31, lon: -90.08, name: "Jackson, MS" },

  // Mountain / Southwest
  DEN: { lat: 39.86, lon: -104.67, name: "Denver, CO" },
  PHX: { lat: 33.44, lon: -112.01, name: "Phoenix, AZ" },
  TUS: { lat: 32.12, lon: -110.94, name: "Tucson, AZ" },
  ABQ: { lat: 35.04, lon: -106.61, name: "Albuquerque, NM" },
  SLC: { lat: 40.79, lon: -111.98, name: "Salt Lake City, UT" },
  LAS: { lat: 36.08, lon: -115.15, name: "Las Vegas, NV" },
  RNO: { lat: 39.50, lon: -119.77, name: "Reno, NV" },
  BOI: { lat: 43.56, lon: -116.22, name: "Boise, ID" },
  BIL: { lat: 45.81, lon: -108.54, name: "Billings, MT" },
  COS: { lat: 38.81, lon: -104.71, name: "Colorado Springs, CO" },

  // West Coast
  LAX: { lat: 33.94, lon: -118.40, name: "Los Angeles, CA" },
  SFO: { lat: 37.62, lon: -122.38, name: "San Francisco, CA" },
  SAN: { lat: 32.73, lon: -117.19, name: "San Diego, CA" },
  SJC: { lat: 37.36, lon: -121.93, name: "San Jose, CA" },
  SMF: { lat: 38.70, lon: -121.59, name: "Sacramento, CA" },
  FAT: { lat: 36.78, lon: -119.72, name: "Fresno, CA" },
  SEA: { lat: 47.45, lon: -122.31, name: "Seattle, WA" },
  PDX: { lat: 45.59, lon: -122.60, name: "Portland, OR" },
  GEG: { lat: 47.62, lon: -117.53, name: "Spokane, WA" },
  ANC: { lat: 61.17, lon: -150.02, name: "Anchorage, AK" },
  HNL: { lat: 21.32, lon: -157.92, name: "Honolulu, HI" },
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
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
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
      available_origins: Object.keys(CITY_COORDS),
    });
  }
  const originKey  = origin.toUpperCase();
  const destKey    = dest.toUpperCase();
  const originCity = CITY_COORDS[originKey];
  const destCity   = CITY_COORDS[destKey];
  if (!originCity) return res.status(400).json({ error: `Unknown origin: ${originKey}`, available_codes: Object.keys(CITY_COORDS) });
  if (!destCity)   return res.status(400).json({ error: `Unknown dest: ${destKey}`, available_codes: Object.keys(CITY_COORDS) });
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
ENDOFFILE
Output

exit code 0
