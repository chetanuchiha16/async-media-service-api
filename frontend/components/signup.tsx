import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { register } from "@/components/actions/signup-action";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup, FieldDescription } from "@/components/ui/field";
export function SignUp() {
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
                    <form action={register}>
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
            </Card>
        </div>
    );
}
