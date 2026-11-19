import { cache } from "react"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"

export type UserRole = "seeker" | "recruiter" | "admin"

/**
 * Session lookup cached for the duration of a request, so layouts and pages
 * don't hit the database more than once per navigation.
 */
export const getSession = cache(async () => {
    return auth.api.getSession({ headers: await headers() })
})

export function getUserRole(
    session: Awaited<ReturnType<typeof getSession>>
): UserRole {
    const role = (session?.user as { role?: string } | undefined)?.role

    if (role === "recruiter" || role === "admin") {
        return role
    }

    return "seeker"
}
