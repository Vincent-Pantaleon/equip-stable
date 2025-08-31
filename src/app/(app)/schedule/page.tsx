import { Metadata } from "next"
import Schedule from "@/components/page-components/schedule"

export const metadata:Metadata = {
    title: {
        absolute: "equip | Schedule"
    }
}

export default async function SchedulePage() {
    // await new Promise((resolve) => setTimeout(resolve, 1500))

    return (
        <Schedule />
    )
}