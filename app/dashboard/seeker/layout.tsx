import { redirect } from "next/navigation"

import { getSession, getUserRole } from "@/lib/session"

export default async function SeekerDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession()

    if (!session) {
        redirect("/signin")
    }

    const role = getUserRole(session)

    if (role !== "seeker") {
        redirect(`/dashboard/${role}`)
    }

    return <>{children}</>
}
