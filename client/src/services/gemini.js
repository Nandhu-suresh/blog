import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt) => {
    if (!API_KEY) {
        console.error("Gemini API Key is missing! Please check your .env file.");
        return "Error: API Key is missing.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        return "Sorry, I couldn't fetch a response at the moment.";
    }
};
