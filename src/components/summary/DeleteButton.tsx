"use client"

import { deleteSummary } from "@/action/summary.action"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2Icon } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"

interface DeleteButtonProps {
    summaryId: string
}

export const DeleteButton = ({
    summaryId
}: DeleteButtonProps) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteSummary({ summaryId });
            if (!result.success) {
                toast.error("Error deleting summary");
            }

            setOpen(false);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-500"
                >
                    <Trash2Icon className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Summary</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this summary? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="ghost"
                        className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-500"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        className="bg-gray-900 hover:bg-gray-600"
                        onClick={handleDelete}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}