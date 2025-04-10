import { BgGradient } from "@/components/_common/BgGradient";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <section className="flex items-center justify-center lg:min-h-[40vh]">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

                {children}
            </div>
        </section>
    )
}