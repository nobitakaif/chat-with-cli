import { ReactNode } from "react";

export default function ({children}:{children:ReactNode}){
    return <div className="flex flex-col justify-center items-center h-screen w-full">
        {children}
    </div>
}