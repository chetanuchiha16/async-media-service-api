"use server";
import {
    authJwtLoginAuthJwtLoginPost,
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

export async function login(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    let response = authJwtLoginAuthJwtLoginPost({
        body: { username, password },
    });
    console.log(await response)
}
