import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export const NavigationControl = ({
    currentSection,
    totalSections,
    onPrev,
    onNext,
    onSectionSelect
}: {
    currentSection: number,
    totalSections: number,
    onPrev: () => void,
    onNext: () => void,
    onSectionSelect: (index: number) => void
}) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xs border-t border-rose-500/10">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onPrev}
                    disabled={currentSection === 0}
                    className={cn(
                        "rounded-full size-12 transition-all duration-200 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10",
                        currentSection === 0 ? "opacity-0" : "hover:bg-rose-500/20"
                    )}
                >
                    <ChevronLeftIcon className="size-6" />
                </Button>

                <div className="flex gap-2">
                    {Array.from({ length: totalSections }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onSectionSelect(index)}
                            className={cn(
                                "size-2 rounded-full transition-all duration-300",
                                currentSection === index
                                    ? "bg-linear-to-r from-rose-500 to-rose-600"
                                    : "bg-rose-500/20 hover:bg-rose-500/30"
                            )}
                        >

                        </button>
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNext}
                    disabled={currentSection === totalSections - 1}
                    className={cn(
                        "rounded-full size-12 transition-all duration-200 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10",
                        currentSection === totalSections - 1 ? "opacity-50" : "hover:bg-rose-500/20"
                    )}
                >
                    <ChevronRightIcon className="size-6" />
                </Button>
            </div>
        </div>
    )
}