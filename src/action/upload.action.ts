"use server"

import { generatePDFSummaryFromGeminiAI } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePDFSummaryFromOpenAI } from "@/lib/openai";

export async function generatePDFSummary(
    uploadResponse: [
        {
            serverData: {
                userId: string,
                file: {
                    url: string,
                    name: string
                };
            };
        }
    ]
) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "File upload failed",
            data: null,
        }
    }

    const {
        serverData: {
            userId,
            file: {
                url: pdfUrl,
                name: fileName
            },
        }
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: "File upload failed",
            data: null,
        }
    }


    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log(pdfText)

        let summary;
        try {
            summary = await generatePDFSummaryFromOpenAI(pdfText);
            console.log(summary)
        } catch (error) {
            console.log(error)

            //  call the gemini ai 
            if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
                try {
                    summary = await generatePDFSummaryFromGeminiAI(pdfText);

                    console.log(summary)
                } catch (err) {
                    console.error("Gemini API failed after OpenAI quote exceeded", err)
                    throw new Error("Failed to generate summary with available AI providers")
                }
            }
        }

        if (!summary) {
            return {
                success: false,
                message: "Failed to generate summary",
                data: null,
            }
        }

        return {
            success: true,
            message: "Summary generated successfully",
            data: {
                summary
            }
        }
    } catch (e) {
        return {
            success: false,
            message: "File upload failed",
            data: null,
        }
    }
}