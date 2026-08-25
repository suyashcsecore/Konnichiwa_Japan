const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash"
});

async function generateMedicalSummary(extractedText) {
  const prompt = `
You are a medical document summarization assistant.

Read the medical report below and summarize ONLY information explicitly contained in the document.

Your job is to help a patient communicate their previous medical history to a healthcare professional.

IMPORTANT RULES:

1. Do not create a new diagnosis.
2. Do not provide medical advice.
3. Do not recommend treatment.
4. Do not recommend medication.
5. Do not recommend diet, exercise, or lifestyle changes.
6. Do not add information that is not present in the report.
7. If the original doctor documented a diagnosis or recommendation, report it as "According to the report" or "The physician documented".
8. Keep the summary factual and concise.
9. Translate the English summary accurately into Japanese.
10. Do not use markdown headings inside the summaries.

Return EXACTLY this format:

TITLE:
DATE:
HOSPITAL:
DOCTOR:
DIAGNOSIS:
NOTES:

ENGLISH SUMMARY:
<short factual summary>

JAPANESE SUMMARY:
<accurate Japanese translation>

Medical report:
${extractedText}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = {
  generateMedicalSummary
};