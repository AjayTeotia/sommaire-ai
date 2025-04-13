"use client"

import { generatePDFSummary, storePDFSummaryAction } from "@/action/upload.action"
import { useUploadThing } from "@/utils/uploadthing"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { set, z } from "zod"
import UploadFormInput from "./UploadFormInput"
import { useRouter } from "next/navigation"

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
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { startUpload, routeConfig } = useUploadThing(
        "pdfUploader", {
        onClientUploadComplete: () => {
            console.log('Upload Successfully')
            toast.success('Upload Successfully')
        },
        onUploadError: (error) => {
            console.error('Error occurred while uploading', error)
            toast.error('Error occurred while uploading')
        },
        onUploadBegin: ({ file }) => {
            console.log('Upload has begun for', file)
            toast.success('Upload has begun.')
        }
    }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log('submit')

        try {
            setIsLoading(true);

            const formData = new FormData(e.currentTarget);
            const file = formData.get('file') as File;

            const validatedFields = schema.safeParse({ file });
            if (!validatedFields.success) {
                console.log(
                    validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
                )
                toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file")
                setIsLoading(false);

                return;
            }

            // console.log(file)

            toast.loading('Uploading...')

            const resp = await startUpload([file])
            if (!resp) {
                toast.error('Something went wrong')
                setIsLoading(false);

                return;
            }

            toast.message("Processing your file...")

            const result = await generatePDFSummary(resp)
            // console.log("result", result);

            const { data = null, message, success } = result || {};
            if (data) {
                let storeResult: any;
                toast.success("Saving PDF...")

                if (data.summary) {
                    storeResult = await storePDFSummaryAction({
                        summary: data.summary,
                        title: data.title,
                        fileUrl: resp[0].serverData.file.url,
                        fileName: file.name
                    })

                    toast.success("PDF summary generated and saved successfully")

                    formRef.current?.reset();

                    // TODO: Redirect to the [id] summary page.
                    router.push(`/summaries/${storeResult.data.id}`)
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error occurred while uploading", error)
            formRef.current?.reset();
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
        </div>
    )
}