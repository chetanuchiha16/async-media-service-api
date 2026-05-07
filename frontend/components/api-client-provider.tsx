"use client";

import { useEffect } from "react";
import { client } from "@/client/client.gen";

// Helper to get cookie on client side
function getCookie(name: string) {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
}

export function ApiClientProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        client.interceptors.request.use((request) => {
            const token = getCookie("access_token");
            if (token) {
                request.headers.set("Authorization", `Bearer ${token}`);
            }
            return request;
        });
    }, []);

    return <>{children}</>;
}
