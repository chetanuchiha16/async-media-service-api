"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { EnvelopeIcon, LockIcon, SpinnerIcon } from "@phosphor-icons/react"

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

export function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = React.useState<{
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  function validate(): boolean {
    const errors: typeof fieldErrors = {}

    if (!email) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!validate()) return

    setIsLoading(true)

    try {
      const { data, error: apiError } =
        await registerRegisterAuthRegisterPost({
          body: {
            email,
            password,
          },
        })

      if (apiError) {
        const detail = (apiError as { detail?: string | { [key: string]: string } }).detail
        if (typeof detail === "string") {
          setError(detail)
        } else if (detail && typeof detail === "object") {
          setError(Object.values(detail).join(", "))
        } else {
          setError("Registration failed. Please try again.")
        }
        return
      }

      if (data) {
        setSuccess(true)
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <EnvelopeIcon className="text-primary size-6" />
          </div>
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription>
            We sent a verification link to{" "}
            <span className="text-foreground font-medium">{email}</span>. Please
            verify your email to get started.
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
        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            {error && (
              <div
                role="alert"
                className="bg-destructive/10 text-destructive rounded-lg px-4 py-3 text-sm"
              >
                {error}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="signup-email">Email</FieldLabel>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email)
                    setFieldErrors((prev) => ({ ...prev, email: undefined }))
                }}
                aria-invalid={!!fieldErrors.email}
                disabled={isLoading}
                autoComplete="email"
                required
              />
              {fieldErrors.email && (
                <FieldError>{fieldErrors.email}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="signup-password">Password</FieldLabel>
              <Input
                id="signup-password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password)
                    setFieldErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }))
                }}
                aria-invalid={!!fieldErrors.password}
                disabled={isLoading}
                autoComplete="new-password"
                required
              />
              {fieldErrors.password && (
                <FieldError>{fieldErrors.password}</FieldError>
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (fieldErrors.confirmPassword)
                    setFieldErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }))
                }}
                aria-invalid={!!fieldErrors.confirmPassword}
                disabled={isLoading}
                autoComplete="new-password"
                required
              />
              {fieldErrors.confirmPassword && (
                <FieldError>{fieldErrors.confirmPassword}</FieldError>
              )}
            </Field>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <SpinnerIcon className="animate-spin" data-icon="inline-start" />
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
          <a href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
