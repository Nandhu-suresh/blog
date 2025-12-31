// Proxy to server-side Gemini endpoint to keep API key secret
export const getGeminiResponse = async (prompt) => {
  try {
    const BASE = import.meta.env.VITE_SERVER_URL || "";
    const res = await fetch(`${BASE}/api/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      console.error("Gemini proxy returned error", res.statusText);
      return "Sorry, I couldn't fetch a response at the moment.";
    }

    const data = await res.json();
    return data.text || "Sorry, I couldn't fetch a response at the moment.";
  } catch (error) {
    console.error("Error calling Gemini proxy:", error);
    return "Sorry, I couldn't fetch a response at the moment.";
  }
};
