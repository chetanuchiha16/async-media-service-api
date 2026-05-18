"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {SignOutIcon, CameraIcon, ImageSquareIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const isAuthPage = pathname === "/login" || pathname === "/signup";

    const handleLogout = async () => {
        // Implement logout logic (clear cookie)
        // For now, redirect to login
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <CameraIcon weight="duotone" className="h-5 w-5" />
                    </div>
                    <span className="font-sans text-xl font-bold tracking-tight">Home</span>
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {!isAuthPage && (
                        <>
                            <Link href="/posts">
                                <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                                    <ImageSquareIcon className="h-4 w-4" />
                                    Feed
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                                <SignOutIcon className="h-4 w-4" />
                                Logout
                            </Button>
                        </>
                    )}
                    {isAuthPage && (
                        <Link href={pathname === "/login" ? "/signup" : "/login"}>
                            <Button variant="outline" size="sm">
                                {pathname === "/login" ? "Sign Up" : "Login"}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
