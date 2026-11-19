import { redirect } from "next/navigation"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"
import { getSession } from "@/lib/session"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession()

    if (!session) {
        redirect("/signin")
    }

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
};

export default DashboardLayout;
