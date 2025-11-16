#!/usr/bin/env bun 

import figlet from "figlet"
import chalk from "chalk"
import { Command, program} from "commander"

async function main(){
    console.log(
        chalk.cyan(
            figlet.textSync("nobita",{
                font : "Standard",
                horizontalLayout : "default"
            })

        )
    )
    console.log(chalk.gray("A CLI based ai tool \n"))

    const program = new Command("nobita") // creating new command
    program.version("0.0.1").description("nobita CLI - A CLI based AI Tool")

    program.action(()=>{
        program.help()
    })
    program.parse()
    
}

main().catch(err=>{
    console.log(chalk.red("Error running nobita CLI: ", err))
    process.exit(1)
})