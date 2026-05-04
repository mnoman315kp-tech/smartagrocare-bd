import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Gemini with your API Key from Railway Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { message, disease } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // UPDATED: Using a stable model name (1.5-flash) to prevent model-not-found errors
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", 
    });

    const prompt = `
You are Smart AgroCare AI Assistant.

Rules:
- Only answer plant/agriculture related questions.
- Keep answers concise and practical.
- If question is unrelated, say:
"I can only assist with plant and agriculture related questions."

Detected Disease: ${disease || "Not specified"}

User Question:
${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message
    });
  }
});

// Root route for easy health checking in the browser
app.get("/", (req, res) => {
  res.send("Smart AgroCare Backend is running!");
});

// UPDATED: Fixed Port Binding and 0.0.0.0 host for Railway deployment
const PORT = process.env.PORT || 3000; 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Smart AgroCare Server running on port ${PORT}`);
});
