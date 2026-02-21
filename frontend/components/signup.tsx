"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { register } from "@/components/actions/signup-action";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Field,
    FieldLabel,
    FieldGroup,
    FieldDescription,
} from "@/components/ui/field";
import { useActionState } from "react";

export function SignUp() {
    const [errorMessage, formAction] = useActionState(register, undefined);
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Signup with an email and a password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input placeholder="email" name="email"></Input>
                            </Field>
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    placeholder="password"
                                    name="password"
                                ></Input>
                            </Field>
                            <Button>Submit</Button>
                            <FieldDescription className="text-center">
                                Already Have an account?{" "}
                                <a href="/login">Login</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>

                {errorMessage && (
                    <CardFooter className="text-red-400">
                        {errorMessage.error as string}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
