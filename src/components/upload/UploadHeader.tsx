import { SparklesIcon } from "lucide-react"
import { Button } from "../ui/button"

export const UploadHeader = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
                <Button
                    variant="secondary"
                    className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors"
                >
                    <SparklesIcon className="size-6 mr-2 text-rose-600 animate-pulse" />
                    <p className="text-base text-rose-600">AI-Powered Content Creation</p>
                </Button>
            </div>

            <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Start Uploading{" "}
                <span className="relative inline-block">
                    <span className="relative z-10 px-2">Your PDF's</span>{" "}
                    <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-1" aria-hidden="true" />
                </span>
            </div>

            <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
                Upload your PDF and let our AI do the magic ✨
            </div>
        </section>
    )
}
