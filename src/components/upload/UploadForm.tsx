"use client"

import { useUploadThing } from "@/utils/uploadthing"
import { z } from "zod"
import { UploadFormInput } from "./UploadFormInput"
import { toast } from "sonner"

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
    const { startUpload, routeConfig } = useUploadThing(
        "pdfUploader", {
        onClientUploadComplete: () => {
            console.log('Upload Successfully')
            toast.success('Upload Successfully')
        },
        onUploadError: (error) => {
            console.error('Error occurred while uploading', error)
            toast.error('Error occurred while uploading', error)
        },
        onUploadBegin: ({ file }) => {
            console.log('Upload has begun for', file)
            toast.success('Upload has begun for', file)
        }
    }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')

        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        const validatedFields = schema.safeParse({ file });
        if (!validatedFields.success) {
            console.log(
                validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
            )
            toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file")
            return;
        }

        // console.log(file)

        toast.loading('Uploading...')

        const resp = await startUpload([file])
        if (!resp) {
            toast.error('Something went wrong')
            return;
        }


    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    )
}