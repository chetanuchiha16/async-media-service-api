"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "./actions/signup-action";
import { useActionState } from "react";
import { redirect } from "next/navigation";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [errorMessage, formAction] = useActionState(login, undefined);
    console.log(errorMessage);
    if (errorMessage?.message) redirect("/posts");
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">
                                    Username
                                </FieldLabel>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="m@example.com"
                                    name="username"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>

                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <a href="/signup">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
                {errorMessage && (
                    <CardFooter className="text-red-500">
                        {errorMessage.error as string}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
