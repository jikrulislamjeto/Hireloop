import { redirect } from "next/navigation"

import { getSession, getUserRole } from "@/lib/session"

export default async function RecruiterDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession()

    if (!session) {
        redirect("/signin")
    }

    const role = getUserRole(session)

    if (role !== "recruiter") {
        redirect(`/dashboard/${role}`)
    }

    return <>{children}</>
}
