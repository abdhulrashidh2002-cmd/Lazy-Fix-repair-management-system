const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const analyzeRepairImage = async (imageUrl) => {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const prompt = `
You are a repair expert AI.

Analyze this device image URL:
${imageUrl}

Return ONLY valid JSON:

{
  "problemDescription": "",
  "suggestedFix": ""
}

Be precise and technical.
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
};

module.exports = {
    analyzeRepairImage,
};