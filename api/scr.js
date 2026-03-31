// api/scr.js

// 1. City coordinates for all dashboard origins/destinations
const CITY_COORDS = {
  BOS: { name: "Boston, MA", lat: 42.3601, lon: -71.0589 },
  JFK: { name: "New York, NY", lat: 40.6413, lon: -73.7781 },
  PHL: { name: "Philadelphia, PA", lat: 39.9526, lon: -75.1652 },
  BWI: { name: "Baltimore, MD", lat: 39.2904, lon: -76.6122 },
  DCA: { name: "Washington, DC", lat: 38.9072, lon: -77.0369 },
  BDL: { name: "Hartford, CT", lat: 41.7658, lon: -72.6734 },
  PVD: { name: "Providence, RI", lat: 41.8240, lon: -71.4128 },
  BUF: { name: "Buffalo, NY", lat: 42.8864, lon: -78.8784 },
  ALB: { name: "Albany, NY",   lat: 42.6526, lon: -73.7562 },
  PWM: { name: "Portland, ME", lat: 43.6591, lon: -70.2568 },

  ATL: { name: "Atlanta, GA",   lat: 33.7490, lon: -84.3880 },
  MIA: { name: "Miami, FL",     lat: 25.7617, lon: -80.1918 },
  TPA: { name: "Tampa, FL",     lat: 27.9506, lon: -82.4572 },
  MCO: { name: "Orlando, FL",   lat: 28.5383, lon: -81.3792 },
  JAX: { name: "Jacksonville, FL", lat: 30.3322, lon: -81.6557 },
  CLT: { name: "Charlotte, NC", lat: 35.2271, lon: -80.8431 },
  RDU: { name: "Raleigh, NC",   lat: 35.7796, lon: -78.6382 },
  CHS: { name: "Charleston, SC", lat: 32.7765, lon: -79.9311 },
  SAV: { name: "Savannah, GA",  lat: 32.0809, lon: -81.0912 },
  BHM: { name: "Birmingham, AL", lat: 33.5186, lon: -86.8104 },
  MSY: { name: "New Orleans, LA", lat: 29.9511, lon: -90.0715 },
  MEM: { name: "Memphis, TN",   lat: 35.1495, lon: -90.0490 },
  BNA: { name: "Nashville, TN", lat: 36.1627, lon: -86.7816 },
  RIC: { name: "Richmond, VA",  lat: 37.5407, lon: -77.4360 },

  ORD: { name: "Chicago, IL",   lat: 41.8781, lon: -87.6298 },
  DTW: { name: "Detroit, MI",   lat: 42.3314, lon: -83.0458 },
  CLE: { name: "Cleveland, OH", lat: 41.4993, lon: -81.6944 },
  CMH: { name: "Columbus, OH",  lat: 39.9612, lon: -82.9988 },
  CVG: { name: "Cincinnati, OH", lat: 39.1031, lon: -84.5120 },
  IND: { name: "Indianapolis, IN", lat: 39.7684, lon: -86.1581 },
  MKE: { name: "Milwaukee, WI", lat: 43.0389, lon: -87.9065 },
  MSP: { name: "Minneapolis, MN", lat: 44.9778, lon: -93.2650 },
  STL: { name: "St. Louis, MO", lat: 38.6270, lon: -90.1994 },
  MCI: { name: "Kansas City, MO", lat: 39.0997, lon: -94.5786 },
  OMA: { name: "Omaha, NE",     lat: 41.2565, lon: -95.9345 },
  DSM: { name: "Des Moines, IA", lat: 41.5868, lon: -93.6250 },

  DFW: { name: "Dallas, TX",    lat: 32.7767, lon: -96.7970 },
  HOU: { name: "Houston, TX",   lat: 29.7604, lon: -95.3698 },
  SAT: { name: "San Antonio, TX", lat: 29.4241, lon: -98.4936 },
  AUS: { name: "Austin, TX",    lat: 30.2672, lon: -97.7431 },
  ELP: { name: "El Paso, TX",   lat: 31.7619, lon: -106.4850 },
  OKC: { name: "Oklahoma City, OK", lat: 35.4676, lon: -97.5164 },
  TUL: { name: "Tulsa, OK",     lat: 36.1540, lon: -95.9928 },
  LIT: { name: "Little Rock, AR", lat: 34.7465, lon: -92.2896 },

  DEN: { name: "Denver, CO",    lat: 39.7392, lon: -104.9903 },
  PHX: { name: "Phoenix, AZ",   lat: 33.4484, lon: -112.0740 },
  TUS: { name: "Tucson, AZ",    lat: 32.2226, lon: -110.9747 },
  ABQ: { name: "Albuquerque, NM", lat: 35.0844, lon: -106.6504 },
  SLC: { name: "Salt Lake City, UT", lat: 40.7608, lon: -111.8910 },
  LAS: { name: "Las Vegas, NV", lat: 36.1699, lon: -115.1398 },
  BOI: { name: "Boise, ID",     lat: 43.6150, lon: -116.2023 },
  COS: { name: "Colorado Springs, CO", lat: 38.8339, lon: -104.8214 },

  LAX: { name: "Los Angeles, CA", lat: 34.0522, lon: -118.2437 },
  SFO: { name: "San Francisco, CA", lat: 37.7749, lon: -122.4194 },
  SAN: { name: "San Diego, CA", lat: 32.7157, lon: -117.1611 },
  SJC: { name: "San Jose, CA",  lat: 37.3382, lon: -121.8863 },
  SMF: { name: "Sacramento, CA", lat: 38.5816, lon: -121.4944 },
  SEA: { name: "Seattle, WA",   lat: 47.6062, lon: -122.3321 },
  PDX: { name: "Portland, OR",  lat: 45.5152, lon: -122.6784 },
  ANC: { name: "Anchorage, AK", lat: 61.2181, lon: -149.9003 },
  HNL: { name: "Honolulu, HI",  lat: 21.3069, lon: -157.8583 }
};

// 2. Helpers
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function avg(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// 3. Weather score using Open‑Meteo
async function getWeatherScore(lat, lon) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("current", "temperature_2m,precipitation,wind_speed_10m,cloud_cover");
  url.searchParams.set("hourly", "precipitation_probability,wind_speed_10m,visibility");
  url.searchParams.set("forecast_days", "1");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo error ${res.status}`);
  const data = await res.json();

  const current = data.current || {};
  const hourly = data.hourly || {};

  const precip = current.precipitation ?? 0;
  const wind = current.wind_speed_10m ?? 0;
  const cloud = current.cloud_cover ?? 0;

  const visArr = (hourly.visibility || []).slice(0, 6);
  const precipProbArr = (hourly.precipitation_probability || []).slice(0, 6);
  const avgVisibility = visArr.length ? avg(visArr) : 24000;
  const avgPrecipProb = precipProbArr.length ? avg(precipProbArr) : 0;

  let score = 100;
  score -= clamp(precip * 8, 0, 30);
  score -= clamp((wind - 15) * 1.2, 0, 30);
  score -= clamp((cloud - 70) * 0.3, 0, 10);
  score -= clamp((60 - avgPrecipProb) < 0 ? avgPrecipProb - 60 : 0, 0, 20) * 0.5;
  score -= clamp((10000 - avgVisibility) / 400, 0, 20);

  return {
    score: Math.round(clamp(score, 0, 100)),
    raw: {
      precipitation: precip,
      wind_speed_10m: wind,
      cloud_cover: cloud,
      avg_visibility: Math.round(avgVisibility),
      avg_precip_probability: Math.round(avgPrecipProb)
    }
  };
}

// 4. Route-based score using openrouteservice
async function getTrafficScore(origin, dest, mode) {
  const key = process.env.ORS_API_KEY;

  if (!key) {
    return {
      score: 70,
      raw: { provider: "fallback", reason: "Missing ORS_API_KEY" }
    };
  }

  const profile =
    mode === "air" ? "driving-car" :
    mode === "ocean" ? "driving-car" :
    mode === "rail" ? "driving-hgv" :
    mode === "intermodal" ? "driving-hgv" :
    "driving-hgv";

  const res = await fetch(`https://api.openrouteservice.org/v2/directions/${profile}`, {
    method: "POST",
    headers: {
      "Authorization": key,
      "Content-Type": "application/json",
      "Accept": "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8"
    },
    body: JSON.stringify({
      coordinates: [
        [origin.lon, origin.lat],
        [dest.lon, dest.lat]
      ]
    })
  });

  if (!res.ok) {
    return {
      score: 65,
      raw: { provider: "fallback", reason: `ORS error ${res.status}` }
    };
  }

  const data = await res.json();
  const segment = data.routes?.[0]?.summary;

  if (!segment?.duration || !segment?.distance) {
    return {
      score: 65,
      raw: { provider: "fallback", reason: "Missing ORS route summary" }
    };
  }

  const durationMin = Math.round(segment.duration / 60);
  const distanceMiles = segment.distance * 0.000621371;
  const mph = distanceMiles / (segment.duration / 3600);

  let score = 100;
  score -= clamp((durationMin / 60) * 2, 0, 25);
  score -= clamp((55 - mph) * 1.4, 0, 35);

  return {
    score: Math.round(clamp(score, 0, 100)),
    raw: {
      provider: "openrouteservice",
      duration_min: durationMin,
      distance_miles: Math.round(distanceMiles),
      avg_speed_mph: Math.round(mph)
    }
  };
}

// 5. Port and mode helpers (simple heuristics for now)
function getPortScore(mode, originCode, destCode) {
  if (mode !== "ocean" && mode !== "intermodal") {
    return {
      score: 85,
      raw: { provider: "baseline", reason: "Port congestion has lower relevance for this mode" }
    };
  }

  const majorPortBias = ["LAX", "SAV", "CHS", "MIA", "HOU", "SEA", "PDX", "PHL", "JAX", "MSY", "SFO"];
  const hits = [originCode, destCode].filter(c => majorPortBias.includes(c)).length;

  const score = hits === 2 ? 62 : hits === 1 ? 74 : 81;

  return {
    score,
    raw: {
      provider: "mode-heuristic",
      note: "Temporary proxy until BTS port metrics are mapped directly by port",
      mode,
      port_bias_hits: hits
    }
  };
}

function getModeBaseline(mode) {
  switch (mode) {
    case "air":        return 82;
    case "rail":       return 72;
    case "ocean":      return 58;
    case "intermodal": return 66;
    case "trucking":
    default:           return 76;
  }
}

function riskBand(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 55) return "Fair";
  if (score >= 40) return "At Risk";
  return "Critical";
}

// 6. Main handler
export default async function handler(req, res) {
  try {
    const { origin, dest, mode = "trucking" } = req.query;

    if (!origin || !dest) {
      return res.status(400).json({
        error: true,
        message: "Missing origin or dest"
      });
    }

    if (origin === dest) {
      return res.status(400).json({
        error: true,
        message: "Origin and destination must be different"
      });
    }

    const originLoc = CITY_COORDS[origin];
    const destLoc = CITY_COORDS[dest];

    if (!originLoc || !destLoc) {
      return res.status(400).json({
        error: true,
        message: "Unsupported origin or destination code"
      });
    }

    const [originWeather, destWeather, traffic] = await Promise.all([
      getWeatherScore(originLoc.lat, originLoc.lon),
      getWeatherScore(destLoc.lat, destLoc.lon),
      getTrafficScore(originLoc, destLoc, mode)
    ]);

    const port = getPortScore(mode, origin, dest);
    const modeBaseline = getModeBaseline(mode);

    let scr =
      originWeather.score * 0.20 +
      destWeather.score * 0.20 +
      traffic.score      * 0.30 +
      port.score         * 0.15 +
      modeBaseline       * 0.15;

    scr = Math.round(clamp(scr, 0, 100));

    return res.status(200).json({
      ok: true,
      origin,
      dest,
      mode,
      risk_band: riskBand(scr),
      scr_score: scr,
      breakdown: {
        origin_weather_score: originWeather.score,
        dest_weather_score:   destWeather.score,
        mode_baseline_score:  modeBaseline
      },
      components: {
        origin_weather: originWeather,
        dest_weather:   destWeather,
        traffic,
        port
      },
      meta: {
        origin_name: originLoc.name,
        dest_name:   destLoc.name,
        scoring_version: "v1-live-ors",
        data_sources: {
          weather: "Open-Meteo",
          traffic: traffic.raw.provider === "openrouteservice" ? "openrouteservice" : "Fallback",
          ports:   "Heuristic proxy (upgrade to BTS direct mapping next)"
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
}