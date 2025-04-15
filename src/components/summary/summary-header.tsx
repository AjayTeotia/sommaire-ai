import { CalendarIcon, ChevronLeftIcon, ClockIcon, SparklesIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export const SummaryHeader = ({
    title,
    createdAt,
    readingTime
}: {
    title: string,
    createdAt: string,
    readingTime: number
}) => {
    return (
        <h1 className="flex gap-4 mb-4 justify-between">
            <div className="space-y-6">
                <div className="flex flex-row items-center gap-4">
                    <Button
                        variant="secondary"
                        className="relative px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 transition-all duration-200 shadow-xs hover:shadow-md"
                    >
                        <SparklesIcon className="size-4 mr-1.5 text-rose-500" />
                        AI Summary
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="size-4 text-rose-400" />
                        {new Date(createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="size-4 text-rose-400" />
                        {readingTime} min read
                    </div>
                </div>

                <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
                    <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h1>

            </div>

            <div className="self-start">
                <Link href="/dashboard">
                    <Button
                        variant="link"
                        className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3"
                    >
                        <ChevronLeftIcon className="size-3 sm:size-4 text-rose-500 transition-transform group-hover:translate-x-0.5" />
                        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                            Back {" "}
                            <span className="hidden sm:inline">to dashboard</span>
                        </span>
                    </Button>
                </Link>
            </div>
        </h1>
    )
}