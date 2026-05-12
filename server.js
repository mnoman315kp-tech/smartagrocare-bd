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
   ENV DEBUG
================================= */

console.log(
  "✅ GEMINI API KEY EXISTS:",
  !!process.env.GEMINI_API_KEY
);

console.log(
  "🔑 GEMINI KEY START:",
  process.env.GEMINI_API_KEY?.slice(0, 10)
);

/* =================================
   GEMINI INIT
================================= */

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

/* =================================
   WEATHER API
================================= */

app.get("/weather", async (req, res) => {

  try {

    console.log("🌤 WEATHER API HIT");

    // ✅ GET GPS COORDINATES
    const {
      lat,
      lon,
    } = req.query;

    // ✅ VALIDATION
    if (!lat || !lon) {

      return res.status(400).json({
        error:
          "Latitude and longitude are required",
      });
    }

    console.log(
      "📍 LATITUDE:",
      lat
    );

    console.log(
      "📍 LONGITUDE:",
      lon
    );

    // ✅ OPEN-METEO API
    const weatherRes = await fetch(

      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`

    );

    const data =
      await weatherRes.json();

    console.log(
      "✅ WEATHER DATA RECEIVED"
    );

    // ✅ CURRENT WEATHER
    const current =
      data.current_weather;

    // ✅ RESPONSE
    res.json({

      city:
        data.timezone || "Unknown",

      temperature:
        current.temperature,

      windspeed:
        current.windspeed,

      weathercode:
        current.weathercode,

      humidity: 65,

      forecast:
        data.daily.time.map(
          (date, index) => ({

            date,

            max:
              data.daily
                .temperature_2m_max[
                index
              ],

            min:
              data.daily
                .temperature_2m_min[
                index
              ],

          })
        ),

    });

  } catch (error) {

    console.log(
      "❌ WEATHER ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to fetch weather",

    });
  }
});

/* =================================
   CHAT BOT API
================================= */

app.post("/chat", async (req, res) => {

  try {

    console.log(
      "💬 CHAT ROUTE HIT"
    );

    const {
      message,
      disease,
    } = req.body;

    // ✅ VALIDATION
    if (!message) {

      return res.status(400).json({

        error:
          "Message is required",

      });
    }

    // ✅ GEMINI MODEL
    const model =
      genAI.getGenerativeModel({

        model:
          "gemini-1.5-flash",

      });

    const prompt = `
You are Smart AgroCare AI Assistant.

Rules:
- Only answer plant/agriculture related questions.
- Keep answers concise and practical.
- If question is unrelated, say:
"I can only assist with plant and agriculture related questions."

Detected Disease: ${disease}

User Question:
${message}
`;

    console.log(
      "🚀 Sending Prompt to Gemini..."
    );

    const result =
      await model.generateContent(
        prompt
      );

    const reply =
      result.response.text();

    console.log(
      "✅ Gemini Response Generated"
    );

    res.json({
      reply,
    });

  } catch (error) {

    console.log(
      "❌ CHAT ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to generate AI response",

    });
  }
});

/* =================================
   IMAGE QUALITY CHECK API
================================= */

app.post(

  "/check-quality",

  upload.single("image"),

  async (req, res) => {

    try {

      console.log(
        "🖼 QUALITY CHECK HIT"
      );

      // ❌ NO IMAGE
      if (!req.file) {

        return res.status(400).json({

          quality: "bad",

          reason:
            "No image uploaded",

        });
      }

      // ✅ IMAGE SIZE
      const imageSize =
        req.file.size;

      console.log(
        "📦 IMAGE SIZE:",
        imageSize
      );

      // ❌ TOO SMALL
      if (imageSize < 50000) {

        return res.json({

          quality: "bad",

          reason:
            "Image is blurry or low quality. Please upload a clearer image.",

        });
      }

      // ✅ GOOD IMAGE
      return res.json({

        quality: "good",

      });

    } catch (error) {

      console.log(
        "❌ QUALITY CHECK ERROR:",
        error
      );

      res.status(500).json({

        quality: "bad",

        reason:
          "Server error while checking image",

      });
    }
  }
);

/* =================================
   ROOT ROUTE
================================= */

app.get("/", (req, res) => {

  res.send(
    "✅ Smart AgroCare Backend Running"
  );

});

/* =================================
   SERVER
================================= */

const PORT =
  process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});
