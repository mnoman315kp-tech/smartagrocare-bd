import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { message, disease } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro", 
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
    console.error(error);

    res.status(500).json({
      error: "Failed to generate AI response",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
