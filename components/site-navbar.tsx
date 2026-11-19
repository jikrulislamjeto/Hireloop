"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"


function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("flex shrink-0 items-center", className)}
    >
      <Image
        src="/logo.png"
        alt="HireLoop"
        width={204}
        height={64}
        priority
        className="h-8 w-auto md:h-9"
      />
    </Link>
  )
}

function NavLink({
  href,
  label,
  active,
  className,
  onClick,
}: {
  href: string
  label: string
  active: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        active
          ? "font-semibold text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {label}
    </Link>
  )
}

export function SiteNavbar() {
  const pathname = usePathname()

  const { data: session, isPending } = useSession()

  const handleSignOut = async () => {
    await signOut()
  }

  const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: `/dashboard/${session?.user.role || "seeker"}` },
] as const

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(pathname, link.href)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isPending ? null : session?.user ? (
            <>
              <span className="text-sm font-medium">
                Welcome, {session.user.name}
              </span>
              <Button onClick={handleSignOut} variant="ghost">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/signin" />}
              >
                Sign In
              </Button>
              <Button nativeButton={false} render={<Link href="/signup" />}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="w-72 gap-0 p-0">
              <SheetHeader className="border-b">
                <SheetTitle className="flex h-9 items-center">
                  <Image
                    src="/logo.png"
                    alt="HireLoop"
                    width={204}
                    height={64}
                    className="h-7 w-auto"
                  />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  HireLoop navigation menu
                </SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Main mobile"
                className="flex flex-col gap-1 p-4"
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={isActive(pathname, link.href)}
                    className="px-3 py-2"
                  />
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                {session?.user ?
                  <span className="text-sm font-medium">Welcome, {session.user.name}</span>
                  : <>
                    <Button
                      variant="outline"
                      className="w-full"
                      nativeButton={false}
                      render={<Link href="/signin" />}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full"
                      nativeButton={false}
                      render={<Link href="/signup" />}
                    >
                      Get Started
                    </Button>
                  </>}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
