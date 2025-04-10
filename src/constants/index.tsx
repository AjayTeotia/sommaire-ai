import { BrainCircuitIcon, FileOutputIcon, FileTextIcon, PizzaIcon } from "lucide-react";
import { ReactNode } from "react"

export type Step = {
    icon: ReactNode;
    label: string;
    description: string;
}

export const STEPS: Step[] = [
    {
        icon: <FileTextIcon size={64} strokeWidth={1.5} />,
        label: "Upload a PDF",
        description: "Simply drag and drop your PDF document or click to upload"
    },
    {
        icon: <BrainCircuitIcon size={64} strokeWidth={1.5} />,
        label: "AI Analysis",
        description: "Our advanced AI processes and analyzes your document instantly"
    },
    {
        icon: <FileOutputIcon size={64} strokeWidth={1.5} />,
        label: "Get a Summary",
        description: "Receive a clear and concise summary of your document in seconds"
    }
]

export type Plan = {
    id: string;
    name: string;
    description: string;
    price: number;
    items: string[];
    paymentLink: string;
    priceId: string
}

export const PLANS: Plan[] = [
    {
        id: "basic",
        name: "Basic",
        description: "Perfect for occasional use",
        price: 9,
        items: [
            "5 PDF summaries per month",
            "Standard processing speed",
            "Email support"
        ],
        paymentLink: "",
        priceId: ""
    },
    {
        id: "pro",
        name: "Pro",
        description: "For professionals and teams",
        price: 19,
        items: [
            "Unlimited PDF summaries per month",
            "Priority processing",
            "24/7 priority support",
            "Markdown Export"
        ],
        paymentLink: "",
        priceId: ""
    }
]