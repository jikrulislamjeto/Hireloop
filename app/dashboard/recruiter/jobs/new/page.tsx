"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const jobCategories = [
    "Engineering & Tech",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance",
    "Operations",
    "Human Resources",
    "Other",
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const salaryFrequencies = ["per hour", "per day", "per week", "per month", "per year"]

export default function NewJobPage() {
    const [submitted, setSubmitted] = useState(false)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = Object.fromEntries(new FormData(event.currentTarget))

        // TODO: replace with real job creation request
        console.log("[job] new job data:", data)
        setSubmitted(true)

    }

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Link
                    href="/dashboard/recruiter/jobs"
                    className="transition-colors hover:text-foreground"
                >
                    Manage Jobs
                </Link>
                <ChevronRightIcon className="size-3.5" aria-hidden />
                <span className="text-foreground">Create New Listing</span>
            </nav>

            {/* Page heading */}
            <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Post a New Job
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
                Fill in the position specifications to attract qualified talent across our
                network.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                {/* 1. Basic Information */}
                <section className="rounded-2xl border bg-card p-5 sm:p-6">
                    <h2 className="font-heading text-lg font-semibold">
                        1. Basic Information
                    </h2>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="jobTitle">Job Title *</Label>
                            <Input
                                id="jobTitle"
                                name="jobTitle"
                                placeholder="Frontend Developer"
                                required
                                className="h-10 px-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="companyName">Company Name *</Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                placeholder="HirePulse Network"
                                required
                                className="h-10 px-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="category">Job Category *</Label>
                            <Select name="category" defaultValue="Engineering & Tech" required>
                                <SelectTrigger id="category" className="h-10 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Job Type *</Label>
                            <div className="flex flex-wrap gap-2">
                                {jobTypes.map((type) => (
                                    <label key={type} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="jobType"
                                            value={type}
                                            defaultChecked={type === "Full-time"}
                                            className="peer sr-only"
                                        />
                                        <span className="inline-flex h-10 items-center rounded-lg border border-input px-3 text-sm text-muted-foreground transition-colors hover:border-ring/60 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Location, Compensation & Timeline */}
                <section className="rounded-2xl border bg-card p-5 sm:p-6">
                    <h2 className="font-heading text-lg font-semibold">
                        2. Location, Compensation &amp; Timeline
                    </h2>

                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-input p-4">
                        <Switch id="isRemote" name="isRemote" />
                        <div>
                            <Label htmlFor="isRemote" className="text-sm font-medium">
                                Remote Work Allowed
                            </Label>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Enable worldwide or distributed candidate applications.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="location">Job Location *</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="New York, USA"
                                required
                                className="h-10 px-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="deadline">Application Deadline</Label>
                            <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                className="h-10 px-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="minSalary">Min Salary / Rate</Label>
                            <Input
                                id="minSalary"
                                name="minSalary"
                                type="number"
                                min={0}
                                placeholder="40"
                                className="h-10 px-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="maxSalary">Max Salary / Rate</Label>
                            <Input
                                id="maxSalary"
                                name="maxSalary"
                                type="number"
                                min={0}
                                placeholder="70"
                                className="h-10 px-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="frequency">Frequency</Label>
                            <Select name="frequency" defaultValue="per hour">
                                <SelectTrigger id="frequency" className="h-10 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {salaryFrequencies.map((frequency) => (
                                        <SelectItem key={frequency} value={frequency}>
                                            {frequency}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                {/* 3. Responsibilities & Requirements */}
                <section className="rounded-2xl border bg-card p-5 sm:p-6">
                    <h2 className="font-heading text-lg font-semibold">
                        3. Responsibilities &amp; Requirements
                    </h2>

                    <div className="mt-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="responsibilities">Key Responsibilities *</Label>
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                rows={5}
                                placeholder="Describe what this role will do day to day…"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="requirements">
                                Qualifications &amp; Requirements *
                            </Label>
                            <Textarea
                                id="requirements"
                                name="requirements"
                                rows={5}
                                placeholder="List the experience, skills and qualifications required…"
                                required
                            />
                        </div>
                    </div>
                </section>

                {submitted && (
                    <p role="status" className="text-sm text-muted-foreground">
                        Job data captured — check the browser console.
                    </p>
                )}

                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        nativeButton={false}
                        render={<Link href="/dashboard/recruiter/jobs" />}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" size="lg" className="font-heading">
                        Publish Job
                    </Button>
                </div>
            </form>
        </div>
    )
}
