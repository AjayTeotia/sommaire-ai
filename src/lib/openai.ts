import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const openai = new OpenAI();

export async function generatePDFSummaryFromOpenAI(pdfText: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "developer",
                    content: SUMMARY_SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: `Transform this document into an engaging, easy-to-read summary with contextually formatting:\n\n${pdfText}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        return completion.choices[0].message.content;
    } catch (error: any) {
        if (error.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
        }

        throw Error;
    }
}
