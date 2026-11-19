"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Bookmark,
    Briefcase,
    Building2,
    ClipboardList,
    CreditCard,
    LayoutDashboard,
    Settings,
    Users,
    type LucideIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

export type DashboardRole = "seeker" | "recruiter" | "admin"

export type MenuItem = {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

export const menuItemsByRole: Record<DashboardRole, MenuItem[]> = {
    seeker: [
        {
            id: "seeker-dashboard",
            name: "Dashboard",
            url: "/dashboard/seeker",
            icon: LayoutDashboard,
        },
        {
            id: "seeker-jobs",
            name: "Jobs",
            url: "/dashboard/seeker/jobs",
            icon: Briefcase,
        },
        {
            id: "seeker-saved-jobs",
            name: "Saved Jobs",
            url: "/dashboard/seeker/saved-jobs",
            icon: Bookmark,
        },
        {
            id: "seeker-applications",
            name: "Applications",
            url: "/dashboard/seeker/applications",
            icon: ClipboardList,
        },
        {
            id: "seeker-billing",
            name: "Billing",
            url: "/dashboard/seeker/billing",
            icon: CreditCard,
        },
        {
            id: "seeker-settings",
            name: "Settings",
            url: "/dashboard/seeker/settings",
            icon: Settings,
        },
    ],
    recruiter: [
        {
            id: "recruiter-dashboard",
            name: "Dashboard",
            url: "/dashboard/recruiter",
            icon: LayoutDashboard,
        },
        {
            id: "recruiter-company",
            name: "My Company",
            url: "/dashboard/recruiter/company",
            icon: Building2,
        },
        {
            id: "recruiter-manage-jobs",
            name: "Manage Jobs",
            url: "/dashboard/recruiter/jobs",
            icon: Briefcase,
        },
        {
            id: "recruiter-applications",
            name: "Applications",
            url: "/dashboard/recruiter/applications",
            icon: ClipboardList,
        },
        {
            id: "recruiter-settings",
            name: "Settings",
            url: "/dashboard/recruiter/settings",
            icon: Settings,
        },
    ],
    admin: [
        {
            id: "admin-dashboard",
            name: "Dashboard",
            url: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            id: "admin-users",
            name: "Users",
            url: "/dashboard/admin/users",
            icon: Users,
        },
        {
            id: "admin-companies",
            name: "Companies",
            url: "/dashboard/admin/companies",
            icon: Building2,
        },
        {
            id: "admin-jobs",
            name: "Jobs",
            url: "/dashboard/admin/jobs",
            icon: Briefcase,
        },
        {
            id: "admin-payments",
            name: "Payments",
            url: "/dashboard/admin/payments",
            icon: CreditCard,
        },
        {
            id: "admin-settings",
            name: "Settings",
            url: "/dashboard/admin/settings",
            icon: Settings,
        },
    ],
}

export function DashboardSidebar() {
    const pathname = usePathname()
    const { data: session, isPending } = useSession()
    const role = (session?.user?.role || "seeker") as DashboardRole
    const items = menuItemsByRole[role] ?? menuItemsByRole.seeker

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    {!isPending && (
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={pathname === item.url}
                                        render={<Link href={item.url} />}
                                    >
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    )}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
