"use server"

import { revalidatePath } from "next/cache"

import { getDb } from "@/lib/mongodb"
import { getSession, getUserRole } from "@/lib/session"
import type { CreateJobResult, Job } from "@/lib/types/job"

function text(formData: FormData, key: string): string {
    const value = formData.get(key)
    return typeof value === "string" ? value.trim() : ""
}

function optionalNumber(formData: FormData, key: string): number | null {
    const value = text(formData, key)
    if (!value) return null

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
}

export async function createJob(formData: FormData): Promise<CreateJobResult> {
    const session = await getSession()

    if (!session) {
        return { success: false, error: "You need to sign in to publish a job." }
    }

    const role = getUserRole(session)

    if (role !== "recruiter" && role !== "admin") {
        return { success: false, error: "Only recruiters can publish jobs." }
    }

    const jobTitle = text(formData, "jobTitle")
    const companyName = text(formData, "companyName")
    const category = text(formData, "category")
    const location = text(formData, "location")
    const responsibilities = text(formData, "responsibilities")
    const requirements = text(formData, "requirements")

    if (!jobTitle) {
        return { success: false, error: "Job title is required." }
    }

    if (!companyName) {
        return { success: false, error: "Company name is required." }
    }

    if (!category) {
        return { success: false, error: "Job category is required." }
    }

    if (!location) {
        return { success: false, error: "Job location is required." }
    }

    if (!responsibilities) {
        return { success: false, error: "Key responsibilities are required." }
    }

    if (!requirements) {
        return { success: false, error: "Qualifications and requirements are required." }
    }

    const deadline = text(formData, "deadline")
    const now = new Date()

    const job: Job = {
        jobTitle,
        companyName,
        category,
        jobType: text(formData, "jobType") || "Full-time",
        isRemote: formData.get("isRemote") === "on",
        location,
        deadline: deadline ? new Date(deadline) : null,
        minSalary: optionalNumber(formData, "minSalary"),
        maxSalary: optionalNumber(formData, "maxSalary"),
        frequency: text(formData, "frequency") || "per hour",
        responsibilities,
        requirements,
        status: "published",
        recruiterId: session.user.id,
        recruiterEmail: session.user.email,
        createdAt: now,
        updatedAt: now,
    }

    try {
        const result = await getDb().collection<Job>("jobs").insertOne(job)

        revalidatePath("/dashboard/recruiter/jobs")

        return { success: true, id: result.insertedId.toString() }
    } catch (error) {
        console.error("[jobs] failed to insert job:", error)
        return { success: false, error: "Could not save the job. Please try again." }
    }
}
