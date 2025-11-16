import { toNodeHandler } from "better-auth/node"
import express from "express" 
import { auth } from "./lib/auth"
import cors from "cors"

const app = express()
app.use(cors())

app.all("/api/auth/*splat", toNodeHandler(auth))

app.use(express.json())

app.post("/signup",async(req,res)=>{

})

app.listen(8000,()=>{
    console.log("servers is running on port 8000")
})