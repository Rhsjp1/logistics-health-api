export default async function handler(req, res) {
  try {
    const { origin, dest, mode } = req.query;

    if (!origin || !dest || !mode) {
      return res.status(400).json({
        error: true,
        message: "Missing origin, dest, or mode"
      });
    }

    return res.status(200).json({
      ok: true,
      origin,
      dest,
      mode,
      scr_score: 74,
      weather_score: 84,
      traffic_score: 68,
      port_score: 64,
      risk_band: "Moderate Stress"
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
}