import { cancel,confirm, intro, isCancel, outro } from "@clack/prompts";
import {logger} from "better-auth"
import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";
import chalk from "chalk";
import { Command } from "commander";
import fs from "node:fs/promises"
import open from "open";
import os from "os"
import path from "path";
import yoctoSpinner from "yocto-spinner";
import * as z from "zod/v4"
import prisma from "../../../lib/db"


const URL = "http://localhost:8000"
const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CONFIG_DIR = path.join(os.homedir(),".better-auth") // this will create .better-auth folder in os like \mk281\.better-auth
// console.log("this is os -> ",os.homedir())
const TOKEN_FILE = path.join(CONFIG_DIR,"token.json")


export async function loginAction(){
    const options = z.object({
        serverURL : z.string().optional(),
        clientId : z.string().optional() 
    })

    // const  = options.safeParse(opts)

    console.log("this funciton is called ")


    
    const serverUrl =  URL
    const clientId =  CLIENT_ID
    intro(chalk.bold("Auth CLI login"))

    const existingToken = false
    const expired = false

    if(existingToken && !expired){
        const shouldReAuth = await confirm({
            message : "you're already login!!. Do you want to login again?",
            initialValue : false
        })
        // if user press no 
        if(!isCancel(shouldReAuth) || !shouldReAuth ){
            cancel("Login Cancelled!")
            process.exit(0)
        }
    }
    const authClient = createAuthClient({
        baseURL : serverUrl,
        plugins: [deviceAuthorizationClient()]
    })
    const spinner = yoctoSpinner({text : "Requesting device authorization..."})
    spinner.start()

    try{
        const { data, error } = await authClient.device.code({
            client_id : clientId!,
            scope : "opened profile email"
        })
        spinner.stop()

        if(error || !data){
            logger.error(`failed to request authorization! ${error.error_description}`)
            process.exit(1)
        }

        const { device_code, user_code, verification_uri, verification_uri_complete,interval=5, expires_in } = data

        console.log(chalk.cyan("Device Authorization Required"))
        console.log(`Please visit ${chalk.underline.blue(verification_uri || verification_uri_complete)}`)

        console.log(`Enter code : ${chalk.bold.green(user_code)}`)

        const shouldOpen = await confirm({
            message : "Open browser automatically",
            initialValue : true
        })

        if(!isCancel(shouldOpen) && shouldOpen){
            const urlToOpen = verification_uri || verification_uri_complete
            await open(urlToOpen)
        }

        console.log(chalk.gray(`Waiting for authorization (expire in ${Math.floor(expires_in/60)} minutes)...`))
        
    }catch(e){

    }
}

// COMMANDER SETUP

export const login = new Command("login").description("Login to Better Auth")
    .option("--server-url <url>", "The Better Auth server URL", URL) // optoin 1
    .option("--client-id <id>", "The OAuth client ID ", CLIENT_ID)
    .action(loginAction) // what option we want to perform