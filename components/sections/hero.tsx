"use client"

import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import { MapPin, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"] as const

export function Hero() {
  const router = useRouter()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = new URLSearchParams()
    const query = String(data.get("query") ?? "").trim()
    const location = String(data.get("location") ?? "").trim()
    if (query) params.set("q", query)
    if (location) params.set("location", location)
    router.push(`/jobs${params.size ? `?${params}` : ""}`)
  }

  return (
    <section className="relative isolate overflow-hidden">
      {/* Purple swirl backdrop from the Figma hero art */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-35 mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent_75%)]"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,--theme(--color-primary/20%),transparent)]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-28 text-center sm:px-6 sm:pt-32 sm:pb-36">
        <p className="inline-flex items-center gap-2 rounded-full border bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          50,000+ new jobs this month
        </p>

        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role faster.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-2xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-0"
        >
          <div className="flex h-14 flex-1 items-center gap-2 rounded-xl border bg-card/70 px-4 backdrop-blur-sm focus-within:border-ring sm:rounded-r-none sm:border-r-0">
            <SearchIcon
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              name="query"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="h-full w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="hidden h-14 items-center gap-2 rounded-xl border bg-card/70 px-4 backdrop-blur-sm focus-within:border-ring md:flex md:w-52 md:rounded-l-none">
            <MapPin
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or remote"
              className="h-full w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-14 rounded-xl px-7 font-heading text-sm font-semibold sm:rounded-l-none"
          >
            Search
          </Button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Trending:</span>
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => router.push(`/jobs?q=${encodeURIComponent(position)}`)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm text-muted-foreground transition-colors",
                "hover:border-ring hover:text-foreground",
                "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              )}
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
