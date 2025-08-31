import { Metadata } from "next"
import Messages from "@/components/page-components/messages"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Messages"
    }
}

export default async function MessagesPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    
    return (
        <Messages /> 
    )
}