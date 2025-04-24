import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FileTextIcon } from "lucide-react";
import { NavLink } from "./NavLink";

export const Header = () => {
    return (
        <nav className="container flex items-center justify-between py-4 px-2 lg:px-8 mx-auto">
            {/* Logo with icon and test */}
            <div className="flex lg:flex-1">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                    <FileTextIcon className="size-5 lg:size-8 text-gray-900 hover:rotate-12 transition transform duration-200 ease-in-out" />
                    <span className="font-extrabold lg:text-xl text-gray-900">Sommaire</span>
                </NavLink>
            </div>

            {/*Pricing and dashboard */}
            <div className="flex lg:justify-center lg:items-center gap-4 lg:gap-12">
                {/* Pricing */}
                {/* <NavLink href="/#pricing">Pricing</NavLink> */}

                {/* Dashboard */}
                <SignedIn>
                    <NavLink href="/dashboard">Your Summaries</NavLink>
                </SignedIn>
            </div>

            {/* Sign in, sign out, upload file, pro */}
            <div className="flex lg:justify-end lg:flex-1">
                <SignedIn>
                    <div className="flex gap-2 items-center">
                        {/* Upload */}
                        <NavLink href="/upload">Upload A PDF</NavLink>
                        {/* pro */}
                        {/* <div>Pro</div> */}

                        {/* Sign out */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </SignedIn>

                <SignedOut>
                    {/* Sign in */}
                    <NavLink href="/sign-in">Sign In</NavLink>
                </SignedOut>

            </div>
        </nav>
    )
}