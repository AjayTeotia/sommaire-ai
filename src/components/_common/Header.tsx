import { FileTextIcon } from "lucide-react";
import { Button } from "../ui/button";
import { NavLink } from "./NavLink";

export const Header = () => {
    const isLoggedIn = false;

    return (
        <nav className="container flex items-center justify-between py-4 px-2 lg:px-8 mx-auto">
            <div className="flex lg:flex-1">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                    <FileTextIcon className="size-5 lg:size-8 text-gray-900 hover:rotate-12 transition transform duration-200 ease-in-out" />
                    <span className="font-extrabold lg:text-xl text-gray-900">Sommaire</span>
                </NavLink>
            </div>

            <div className="flex lg:justify-center lg:items-center gap-4 lg:gap-12">
                <NavLink href="/#pricing">Pricing</NavLink>

                {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
            </div>

            <div className="flex lg:justify-end lg:flex-1">
                {isLoggedIn
                    ? (
                        <div className="flex gap-2 items-center">
                            <NavLink href="/upload">Upload A PDF</NavLink>

                            <div>Pro</div>

                            <Button>Sign Out</Button>
                        </div>
                    ) : (
                        <div>
                            <NavLink href="/sign-in">Sign In</NavLink>
                        </div>
                    )}
            </div>
        </nav>
    )
}