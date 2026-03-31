export default async function handler(req, res) {
  try {
    const { origin, dest, mode } = req.query;

    if (!origin || !dest || !mode) {
      return res.status(400).json({
        error: true,
        message: "Missing origin, dest, or mode"
      });
    }

    // Temporary static values; later you’ll compute these
    const scr_score = 74;
    const origin_weather_score = 84;
    const dest_weather_score = 78;
    const mode_baseline_score = 68;

    return res.status(200).json({
      ok: true,
      origin,
      dest,
      mode,
      scr_score,
      breakdown: {
        origin_weather_score,
        dest_weather_score,
        mode_baseline_score
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
}