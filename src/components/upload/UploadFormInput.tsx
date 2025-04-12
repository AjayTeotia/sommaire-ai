"use client"

import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { forwardRef } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({ onSubmit, isLoading }, ref) => {
    return (
        <form
            ref={ref}
            className="flex flex-col gap-6"
            onSubmit={onSubmit}
        >
            <div className="flex items-center justify-end gap-1.5">
                <Input
                    id="file"
                    type="file"
                    name="file"
                    accept="application/pdf"
                    required
                    disabled={isLoading}
                    className={cn(
                        isLoading && "cursor-not-allowed opacity-50",
                    )}
                />

                <Button disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2Icon className="mr-2 size-4 animate-spin" /> Processing...
                        </>
                    ) : (
                        "Upload Your PDF"
                    )}
                </Button>
            </div>
        </form>
    )
})

export default UploadFormInput;