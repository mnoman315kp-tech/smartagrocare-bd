import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import express from "express";
import multer from "multer";

const app = express();
const upload = multer();

/* =================================
   MIDDLEWARE
================================= */
app.use(cors());
app.use(express.json());

/* =================================
   GEMINI INIT
================================= */
console.log(
  "✅ GEMINI API KEY EXISTS:",
  !!process.env.GEMINI_API_KEY
);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

/* =================================
   WEATHER API
================================= */
app.get("/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: "Latitude and longitude required",
      });
    }

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );

    const data = await weatherRes.json();
    const current = data.current_weather;

    res.json({
      city: data.timezone || "Unknown",
      temperature: current.temperature,
      windspeed: current.windspeed,
      weathercode: current.weathercode,
      humidity: 65,
      forecast: data.daily.time.map((date, index) => ({
        date,
        max: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index]
      }))
    });
  } catch (error) {
    console.log("❌ WEATHER ERROR", error);
    res.status(500).json({
      error: "Weather failed"
    });
  }
});

/* =================================
   CHAT API
================================= */
app.post("/chat", async (req, res) => {
  try {
    const { message, disease } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message required"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are Smart AgroCare AI.

Rules:
- Only answer agriculture questions
- Keep concise
- Give practical advice

Disease:
${disease}

Question:
${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({
      reply
    });
  } catch (error) {
    console.log("❌ CHAT ERROR", error);
    res.status(500).json({
      error: "AI failed"
    });
  }
});

/* =================================
   TRANSLATE API (Google Public Endpoint)
================================= */
app.post("/translate", async (req, res) => {
  try {
    console.log("🌐 TRANSLATE HIT (Google Endpoint)");

    const { q, source, target } = req.body;

    if (!q || !target) {
      return res.status(400).json({
        error: "Text and target required"
      });
    }

    const sourceLang = source || "en";
    const GOOGLE_TRANSLATE_URL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${target}&dt=t&q=${encodeURIComponent(q)}`;

    const response = await fetch(GOOGLE_TRANSLATE_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data = await response.json();

    let translatedText = q;
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      translatedText = data[0][0][0];
    }

    console.log("✅ TRANSLATED SUCCESSFULLY VIA GOOGLE");

    res.json({
      translatedText: translatedText
    });
  } catch (error) {
    console.log("❌ TRANSLATE ERROR", error);
    res.status(500).json({
      translatedText: req.body.q
    });
  }
});

/* =================================
   IMAGE QUALITY
================================= */
app.post("/check-quality", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        quality: "bad",
        reason: "No image"
      });
    }

    if (req.file.size < 50000) {
      return res.json({
        quality: "bad",
        reason: "Image blurry"
      });
    }

    res.json({
      quality: "good"
    });
  } catch {
    res.status(500).json({
      quality: "bad",
      reason: "Server error"
    });
  }
});

/* =================================
   ROOT
================================= */
app.get("/", (req, res) => {
  res.send("✅ Smart AgroCare Backend Running");
});

/* =================================
   SERVER
================================= */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}`);
});
