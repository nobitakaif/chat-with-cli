"use client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Github  } from "lucide-react"

export default function LoginForm(){
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)
    return <div className="flex gap-4">
        
        <Button className="cursor-pointer"
            onClick={()=> authClient.signIn.social({
                    provider : "github",
                    callbackURL : "http://localhost:3000"
                })
            }
        >
            <Github/>
            Login with github 
        </Button>
    </div>
}