export type Job = {
    jobTitle: string
    companyName: string
    category: string
    jobType: string
    isRemote: boolean
    location: string
    deadline: Date | null
    minSalary: number | null
    maxSalary: number | null
    frequency: string
    responsibilities: string
    requirements: string
    status: "published"
    recruiterId: string
    recruiterEmail: string
    createdAt: Date
    updatedAt: Date
}

export type CreateJobResult =
    | { success: true; id: string }
    | { success: false; error: string }
