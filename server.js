import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";

dotenv.config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ================================
   CHAT BOT API
================================ */

app.post("/chat", async (req, res) => {
  try {
    const { message, disease } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
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

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.log("CHAT ERROR:", error);

    res.status(500).json({
      error: "Failed to generate AI response",
    });
  }
});

/* ================================
   IMAGE QUALITY CHECK API
================================ */

app.post(
  "/check-quality",
  upload.single("image"),
  async (req, res) => {
    try {
      // ❌ No image uploaded
      if (!req.file) {
        return res.status(400).json({
          quality: "bad",
          reason: "No image uploaded",
        });
      }

      // ✅ Simple fake logic for now
      // Later you can connect OpenCV / AI model

      const imageSize = req.file.size;

      // Too small image
      if (imageSize < 50000) {
        return res.json({
          quality: "bad",
          reason:
            "Image is blurry or low quality. Please upload a clearer image.",
        });
      }

      // Good image
      return res.json({
        quality: "good",
      });

    } catch (error) {
      console.log("QUALITY CHECK ERROR:", error);

      res.status(500).json({
        quality: "bad",
        reason: "Server error while checking image",
      });
    }
  }
);

/* ================================
   ROOT ROUTE
================================ */

app.get("/", (req, res) => {
  res.send("Smart AgroCare Backend Running");
});

/* ================================
   SERVER
================================ */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
