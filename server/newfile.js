// verifyGemini.js
import fetch from "node-fetch"; // If Node < 18, install: npm install node-fetch

async function verifyGeminiApiKey(apiKey) {
  const API_VERSION = "v1";
  const apiUrl = `https://generativelanguage.googleapis.com/${API_VERSION}/models?key=${apiKey}`;
  
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return true;
}


console.log(process.env.GEMINI_API_KEY);

// Run test
(async () => {
  try {
    const result = await verifyGeminiApiKey(process.env.GEMINI_API_KEY);
    console.log("API Key is valid:", result);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
