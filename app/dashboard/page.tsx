import { redirect } from "next/navigation"

import { getSession, getUserRole } from "@/lib/session"

export default async function DashboardPage() {
    const session = await getSession()

    if (!session) {
        redirect("/signin")
    }

    redirect(`/dashboard/${getUserRole(session)}`)
}
