"use server";
import {
    authJwtLoginAuthJwtLoginPost,
    registerRegisterAuthRegisterPost,
    RegisterRegisterAuthRegisterPostData,
} from "@/client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let response = await registerRegisterAuthRegisterPost({
        body: { email, password },
    });
}

export async function login(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    let response = await authJwtLoginAuthJwtLoginPost({
        body: { username, password },
    });
    let token = response.data?.access_token;
    let cookieStore = await cookies();
    if (token) {
        cookieStore.set("access_token", token);
    }
    let my = await cookieStore.get("access_token")?.value;
    if (!response.error) {
        redirect("/posts");
    }
    console.log(my);
}
