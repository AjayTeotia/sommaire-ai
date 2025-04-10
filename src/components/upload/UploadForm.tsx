"use client"

import { z } from "zod"
import { UploadFormInput } from "./UploadFormInput"

const schema = z.object({
    file: z.instanceof(File, { message: "Invalid file" })
        .refine(
            (file) => file.size <= 20 * 1024 * 1024,
            "File size must be less than 20MB"
        )
        .refine(
            (file) => file.type.startsWith("application/pdf"),
            "File must be a PDF"
        ),
})

export const UploadForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')

        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        const validatedFields = schema.safeParse({ file });
        if (!validatedFields.success) {
            console.log(
                validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
            )
            return;
        }

        console.log(file)
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    )
}