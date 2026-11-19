import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { getDb, getMongoClient } from "@/lib/mongodb";

export const auth = betterAuth({
    user: {
        additionalFields: {
            role: {
                type: ["seeker", "recruiter", "admin"],
                required: false,
                defaultValue: "seeker",
                input: true,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(getDb(), {
        client: getMongoClient(),
    }),
});