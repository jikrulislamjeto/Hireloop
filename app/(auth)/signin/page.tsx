"use client"
// import type { Metadata } from "next"

import { AuthForm, AuthFormData } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"

// export const metadata: Metadata = {
//   title: "Sign In — HireLoop",
// }

export default function SignInPage() {

  const handleSignIn = async (data: AuthFormData) => {
    const { data: SignInResponse, error } = await authClient.signIn.email({
      email: data.email, 
      password: data.password, 
      rememberMe: true, 
      callbackURL: "/",
    });
    console.log("Sign In Response", SignInResponse, error);
  }
  return (
    <main className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,--theme(--color-primary/15%),transparent)]"
      />
      <AuthForm mode="signin" onSubmit={handleSignIn} />
    </main>
  )
}
