"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
    return (
        <form
            className="flex flex-col gap-6"
            onSubmit={onSubmit}
        >
            <div className="flex items-center justify-end gap-1.5">
                <Input id="file" type="file" name="file" accept="application/pdf" />

                <Button>Upload Your PDF</Button>
            </div>
        </form>
    )
}