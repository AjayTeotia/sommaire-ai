"use server"

import { getDBConnection } from "@/lib/db";
import { generatePDFSummaryFromGeminiAI } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePDFSummaryFromOpenAI } from "@/lib/openai";
import { formateFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface pdfSummaryType {
    userId?: string,
    fileName: string,
    fileUrl: string,
    summary: string,
    title: string
}

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
        console.log("PDF Text Extracted:", pdfText);

        let summary;
        try {
            summary = await generatePDFSummaryFromOpenAI(pdfText);
            console.log("Summary generated by OpenAI:", summary);
        } catch (error) {
            console.log("Error with OpenAI API:", error);

            //  Call the Gemini AI if OpenAI rate limit is exceeded
            if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
                try {
                    summary = await generatePDFSummaryFromGeminiAI(pdfText);
                    console.log("Summary generated by Gemini AI:", summary);
                } catch (err) {
                    console.error("Gemini API failed after OpenAI rate limit exceeded", err);
                    throw new Error("Failed to generate summary with available AI providers");
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

        const formateFileName = await formateFileNameAsTitle(fileName);

        return {
            success: true,
            message: "Summary generated successfully",
            data: {
                title: formateFileName,
                summary
            }
        }
    } catch (e) {
        console.error("Error in PDF processing:", e);
        return {
            success: false,
            message: "File upload failed",
            data: null,
        }
    }
}

export async function savePDFSummary({
    userId,
    fileUrl,
    summary,
    title,
    fileName
}: pdfSummaryType) {  // Return the saved summary's ID
    try {
        const sql = await getDBConnection();
        const [savedSummary] = await sql`
            INSERT INTO pdf_summaries(
                user_id,
                original_file_url,
                summary_text,
                title,
                file_name
            ) 
            VALUES (
                ${userId},
                ${fileUrl},
                ${summary},
                ${title},
                ${fileName}
            ) 
            RETURNING id, summary_text`;  // Return the 'id' of the inserted row

        return savedSummary;
    } catch (error) {
        console.error("Error saving PDF summary:", error);
        throw new Error("Error saving PDF summary");
    }
}

export async function storePDFSummaryAction({
    fileUrl,
    summary,
    title,
    fileName
}: pdfSummaryType) {

    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "User is not authenticated",
            }
        }

        // Save the PDF summary and get the inserted summary's ID
        const savedSummary = await savePDFSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        });

        if (!savedSummary || !savedSummary.id) {
            return {
                success: false,
                message: "Error saving PDF summary, please try again",
            }
        }

        // Log the saved summary ID
        console.log("PDF summary saved with ID:", savedSummary.id);

        // Revalidate our cache using the saved summary's ID
        revalidatePath(`/summaries/${savedSummary.id}`);

        return {
            success: true,
            message: "PDF summary saved successfully",
            data: {
                id: savedSummary.id
            }
        }

    } catch (error) {
        console.error("Error saving PDF summary:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Error saving PDF summary",
        }
    }
}
