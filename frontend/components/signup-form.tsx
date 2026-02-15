"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EnvelopeIcon, SpinnerIcon } from "@phosphor-icons/react"

import { registerRegisterAuthRegisterPost } from "@/client/sdk.gen"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignupFormValues) {
    try {
      const { data, error: apiError } =
        await registerRegisterAuthRegisterPost({
          body: {
            email: values.email,
            password: values.password,
          },
        })

      if (apiError) {
        const detail = (
          apiError as { detail?: string | { [key: string]: string } }
        ).detail
        if (typeof detail === "string") {
          setError("root", { message: detail })
        } else if (detail && typeof detail === "object") {
          setError("root", { message: Object.values(detail).join(", ") })
        } else {
          setError("root", { message: "Registration failed. Please try again." })
        }
        return
      }

      if (!data) {
        setError("root", {
          message: "An unexpected error occurred. Please try again.",
        })
      }
    } catch {
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      })
    }
  }

  if (isSubmitSuccessful && !errors.root) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <EnvelopeIcon className="text-primary size-6" />
          </div>
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription>
            We sent a verification link to{" "}
            <span className="text-foreground font-medium">
              {getValues("email")}
            </span>
            . Please verify your email to get started.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to home
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>
          Enter your email and password to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            {errors.root && (
              <div
                role="alert"
                className="bg-destructive/10 text-destructive rounded-lg px-4 py-3 text-sm"
              >
                {errors.root.message}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="signup-email">Email</FieldLabel>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                disabled={isSubmitting}
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <FieldError>{errors.email.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="signup-password">Password</FieldLabel>
              <Input
                id="signup-password"
                type="password"
                placeholder="At least 8 characters"
                aria-invalid={!!errors.password}
                disabled={isSubmitting}
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="signup-confirm-password">
                Confirm password
              </FieldLabel>
              <Input
                id="signup-confirm-password"
                type="password"
                placeholder="Re-enter your password"
                aria-invalid={!!errors.confirmPassword}
                disabled={isSubmitting}
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </Field>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <SpinnerIcon
                    className="animate-spin"
                    data-icon="inline-start"
                  />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
