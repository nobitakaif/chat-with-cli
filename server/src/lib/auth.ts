import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import client  from "./db"

export const auth = betterAuth({
    database: prismaAdapter(client,{
        provider : "postgresql" // use the provider which one you're using like -> "mysql", "postgresql"... 
    }),
    basePath : "/api/auth",
    trustedOrigins : ["http://localhost:3000"],
    socialProviders:{
        github : {
            clientId : process.env.GITHUB_CLIENT_ID as string,
            clientSecret : process.env.GITHUB_CLIENT_SECRET as string
        }
    }
})