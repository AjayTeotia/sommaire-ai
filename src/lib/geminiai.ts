import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function generatePDFSummaryFromGeminiAI(pdfText: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500
            }
        });

        const prompt = {
            contents: [{
                role: "user",
                parts: [
                    { text: SUMMARY_SYSTEM_PROMPT },
                    {
                        text: `Transform this document into an engaging, easy-to-read summary with contextually formatting:\n\n${pdfText}`
                    }
                ]
            }]
        };

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response) {
            throw new Error("Empty response from Gemini AI");
        }

        return response.text();
    } catch (error: any) {
        console.error("Error generating summary:", error);
        throw error;
    }
}
