"use server";
import {
    registerRegisterAuthRegisterPost,
    RegisterRegisterAuthRegisterPostData,
} from "@/client";
export async function register(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let response = await registerRegisterAuthRegisterPost({
        body: { email, password },
    });
}
