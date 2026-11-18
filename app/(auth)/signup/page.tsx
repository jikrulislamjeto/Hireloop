"use client"
// import type { Metadata } from "next"

import { AuthForm, type AuthFormData } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"

// export const metadata: Metadata = {
//   title: "Sign Up — HireLoop",
// }

export default function SignUpPage() {
  async function handleSignUp(data: AuthFormData) {
    const { data: signUpResponse, error } =
      await authClient.signUp.email({
        name: data.name as string,
        email: data.email,
        password: data.password,
        role: data.role ?? "seeker",
        callbackURL: "/",
      })

    if (error) {
      throw new Error(error.message || "Failed to create your account.")
    }

    console.log("Sign Up Response:", signUpResponse)
  }

  return (
    <main className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,--theme(--color-primary/15%),transparent)]"
      />

      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </main>
  )
}
