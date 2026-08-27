require("dotenv").config();

async function testModels() {
  try {
    const key = process.env.GEMINI_API_KEY;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    if (data.error) {
      console.error("API Error:", data.error);
    } else {
      console.log("Available models:");
      data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testModels();
