import { fromNodeHeaders, toNodeHandler } from "better-auth/node"
import express from "express"
import { auth } from "./lib/auth"
import cors from "cors"

const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.all("/api/auth/{*any}", toNodeHandler(auth))

app.use(express.json())

app.post("/signup", async (req, res) => {

})

app.get("/api/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    })
    res.json(session)
})

app.listen(8000, () => {
    console.log("servers is running on port 8000")
})