import { BgGradient } from "@/components/_common/BgGradient";
import { EmptySummary } from "@/components/summary/EmptySummary";
import { SummaryCard } from "@/components/summary/SummaryCard";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
        return redirect("/sign-in");
    }
    const summary = await getSummaries(userId);

    const uploadLimit = 5;

    return (
        <main className="min-h-screen">
            <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
            <div className="container mx-auto flex flex-col gap-4">
                <div className="px-2 py-12 sm:py-24">
                    <div className="flex gap-4 mb-8 justify-between">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-4xl tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                                Your Summaries
                            </h1>
                            <p className="text-gray-600">
                                Transform your PDFs into concise, actionable insights
                            </p>
                        </div>

                        <Button
                            variant="link"
                            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group-hover:no-underline"
                        >
                            <Link href="/upload" className="flex text-white items-center">
                                <PlusIcon className="size-5 mr-2" />
                                New Summary
                            </Link>
                        </Button>
                    </div>

                    <div className="mb-6">
                        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                            <p className="text-sm">
                                You've reached the limit of {uploadLimit} uploads on the Basic Plan{" "}

                                <Link href="/#pricing" className="text-rose-800 underline font-medium underline-offset-4 inline-flex text-center">
                                    Click here to upgrade to Pro {" "}
                                    <ArrowRightIcon className="size-4 inline-block" /> {" "}
                                </Link>
                                {" "} for unlimited uploads
                            </p>
                        </div>
                    </div>

                    {summary.length === 0
                        ? <EmptySummary />
                        : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 sm:px-0">
                                    {summary.map((summary, idx) => (
                                        <SummaryCard summary={summary} key={idx} />
                                    ))}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </main>
    );
}