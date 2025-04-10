import { BgGradient } from "@/components/_common/BgGradient";
import { UploadForm } from "@/components/upload/UploadForm";
import { UploadHeader } from "@/components/upload/UploadHeader";

export default function UploadPage() {
    return (
        <section className="min-h-screen">
            <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <UploadHeader />

                    <UploadForm />
                </div>
            </div>
        </section>
    )
}