import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { client } from "./db"

export const auth = betterAuth({
    database: prismaAdapter(client,{
        provider : "postgresql" // use the provider which one you're using like -> "mysql", "postgresql"... 
    }),
    socialProviders:{
        github : {
            clientId : process.env.GITHUB_CLIENT_ID!,
            clientSecret : process.env.GITHUB_CLIENT_SECRET
        }
    }
})