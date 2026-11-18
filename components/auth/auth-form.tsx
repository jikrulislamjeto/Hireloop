
"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import {
  BriefcaseIcon,
  EyeIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Mode = "signin" | "signup"

export type UserRole = "seeker" | "recruiter" | "admin"

export type AuthFormData = {
  name?: string
  email: string
  password: string
  role?: UserRole
  remember?: string
}

const roles: Array<{
  value: UserRole
  label: string
  description: string
  icon: typeof BriefcaseIcon
}> = [
  {
    value: "seeker",
    label: "Seeker",
    description: "Looking for a job",
    icon: BriefcaseIcon,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Hiring talent",
    icon: UsersIcon,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage platform",
    icon: ShieldCheckIcon,
  },
]

type AuthFormProps = {
  mode: Mode
  onSubmit?: (data: AuthFormData) => void | Promise<void>
}

const modes: Array<{ value: Mode; label: string; href: string }> = [
  { value: "signin", label: "Sign In", href: "/signin" },
  { value: "signup", label: "Sign Up", href: "/signup" },
]

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [collected, setCollected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const isSignIn = mode === "signin"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const data: AuthFormData = {
      name: formData.get("name")?.toString(),
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
      role: (formData.get("role")?.toString() as UserRole | undefined) ?? undefined,
      remember: formData.get("remember")?.toString(),
    }

    setErrorMessage("")
    setLoading(true)

    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        console.log(`[auth] ${mode} form data:`, data)
      }

      setCollected(true)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-6 sm:p-8">
      <div
        role="tablist"
        aria-label="Authentication mode"
        className="mb-8 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1"
      >
        {modes.map((tab) => (
          <Link
            key={tab.value}
            href={tab.href}
            role="tab"
            aria-selected={mode === tab.value}
            className={cn(
              "rounded-md py-1.5 text-center text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              mode === tab.value
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <h1 className="font-heading text-2xl font-bold tracking-tight">
        {isSignIn ? "Welcome back" : "Create your account"}
      </h1>

      <p className="mt-1.5 text-sm text-muted-foreground">
        {isSignIn
          ? "Sign in to continue your job hunt."
          : "Start finding the roles made for you."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        {!isSignIn && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="name"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              className="h-10 px-3"
            />
          </div>
        )}

        {!isSignIn && (
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">I am joining as</legend>

            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon

                return (
                  <label key={role.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      defaultChecked={role.value === "seeker"}
                      className="peer sr-only"
                    />

                    <span className="flex h-full flex-col items-center gap-1.5 rounded-xl border border-input bg-transparent p-3 text-center text-muted-foreground transition-colors hover:border-ring/60 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                      <Icon className="size-4" aria-hidden />

                      <span className="text-sm font-medium">{role.label}</span>

                      <span className="text-[11px] leading-tight text-muted-foreground">
                        {role.description}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane.doe@example.com"
            required
            autoComplete="email"
            className="h-10 px-3"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            {isSignIn && (
              <Link
                href="/signin"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot password?
              </Link>
            )}
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              autoComplete={
                isSignIn ? "current-password" : "new-password"
              }
              className="h-10 px-3 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" aria-hidden />
              ) : (
                <EyeIcon className="size-4" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {isSignIn && (
          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" value="yes" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
        )}

        {errorMessage && (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        {collected && (
          <p className="text-center text-sm text-muted-foreground" role="status">
            {onSubmit
              ? "Request completed successfully."
              : "Form data captured — check the browser console."}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-10 w-full font-heading"
        >
          {loading
            ? "Please wait..."
            : isSignIn
              ? "Sign In"
              : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/signup" : "/signin"}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  )
}
