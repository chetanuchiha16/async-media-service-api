import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/components/actions/signup-action";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./input-group";
import { Field, FieldLabel, FieldGroup } from "./field";
export function SignUp() {
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
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
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
