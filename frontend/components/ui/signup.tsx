import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./input-group";
export function SignUp() {
    return (
        <div>
            <form action="">
                <Card className="p-6">
                    <h1>Sign Up</h1>
                    <InputGroup>
                    <InputGroupInput placeholder="email"></InputGroupInput>
                    </InputGroup>
                    <InputGroup>
                    <InputGroupInput placeholder="password"></InputGroupInput>
                    </InputGroup>
                    
                    <Button>Submit</Button>
                </Card>
            </form>
        </div>
    );
}
