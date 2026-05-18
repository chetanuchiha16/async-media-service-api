"use server";
import { authJwtLogin, registerRegister, RegisterRegisterData } from "@/client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormState } from "react-hook-form";

export async function register(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let response = await registerRegister({
        body: { email, password },
    });
    if (response.error) {
        return { error: response.error.detail };
    } else {
        return { message: "signup successfull" };
    }
}

export async function login(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    let response = await authJwtLogin({
        body: { username, password },
    });
    let token = response.data?.access_token;
    let cookieStore = await cookies();
    if (token) {
        cookieStore.set("access_token", token);
    }
    if (response.error) {
        return { error: response.error.detail };
    }
    return { message: "Login Successful" };
}
