const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const router = express.Router();

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("CRITICAL ERROR: GEMINI_API_KEY is missing from .env");
}
const ai = new GoogleGenAI({ apiKey });

router.post("/", async (req, res) => {
  const { prompt } = req.body || {};

  // Basic validation
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Generate content using gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Empty response from AI");
    }

    console.log("✓ Gemini response generated");
    res.json({ text });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    // Handle specific status codes
    const statusCode = error.message?.includes("API key not valid") ? 401 : 500;

    res.status(statusCode).json({
      error: "Gemini Service Error",
      details: error.message,
    });
  }
});

module.exports = router;
