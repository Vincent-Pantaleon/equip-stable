import Recents from "@/components/page-components/recents"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Recents"
    }
}

export default async function RecentsPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000))

    return(
        <Recents />
    )
}