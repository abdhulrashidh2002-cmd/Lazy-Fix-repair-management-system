require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY.trim()
);

async function run() {
    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent("Say hello");

        console.log(result.response.text());

    } catch (error) {
        console.error(error);
    }
}

run();