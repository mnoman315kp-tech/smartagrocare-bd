import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import express from "express";
import multer from "multer";



const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

/* ================================
   DEBUG ENV VARIABLES
================================ */

console.log(
  "GEMINI API KEY EXISTS:",
  !!process.env.GEMINI_API_KEY
);

console.log(
  "GEMINI API KEY START:",
  process.env.GEMINI_API_KEY?.slice(0, 10)
);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

/* ================================
   CHAT BOT API
================================ */

app.post("/chat", async (req, res) => {

  try {

    console.log("CHAT ROUTE HIT");

    console.log(
      "API KEY EXISTS:",
      !!process.env.GEMINI_API_KEY
    );

    console.log(
      "API KEY VALUE:",
      process.env.GEMINI_API_KEY?.slice(0, 10)
    );

    console.log(
      "REQUEST BODY:",
      req.body
    );

    const {
      message,
      disease,
    } = req.body;

    // ✅ VALIDATION
    if (!message) {

      console.log(
        "❌ MESSAGE MISSING"
      );

      return res.status(400).json({
        error: "Message is required",
      });
    }

    console.log(
      "Creating Gemini model..."
    );

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
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
      "Sending prompt to Gemini..."
    );

    const result =
      await model.generateContent(
        prompt
      );

    console.log(
      "Gemini response success"
    );

    const reply =
      result.response.text();

    console.log(
      "AI REPLY:",
      reply
    );

    res.json({
      reply,
    });

  } catch (error) {

    console.log(
      "CHAT ERROR:",
      error
    );

    res.status(500).json({
      error:
        "Failed to generate AI response",
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

      // ❌ NO IMAGE
      if (!req.file) {

        return res.status(400).json({
          quality: "bad",
          reason:
            "No image uploaded",
        });
      }

      // ✅ SIMPLE TEST LOGIC
      const imageSize =
        req.file.size;

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
        "QUALITY CHECK ERROR:",
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

/* ================================
   ROOT ROUTE
================================ */

app.get("/", (req, res) => {

  res.send(
    "Smart AgroCare Backend Running"
  );

});

/* ================================
   SERVER
================================ */

const PORT =
  process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
