"use client"
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";


export default function Home() {
  const {data, isPending}= authClient.useSession()
  const router = useRouter()

  if(!data?.session && !data?.user){
    router.push("/sign-in")
  }
  
  if(isPending){
    return <div className="flex justify-center items-center h-screen w-full">
      <Spinner />
    </div>
  }

 return (
   <div className="flex h-screen w-full items-center justify-center">  
    <h1>You're logged in</h1>
   </div>
  );
}
