import Recents from "@/components/page-components/recents"
import { Metadata } from "next"
import { Table } from "@/components/improved-page-components/Table"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Recents"
    }
}

export default async function RecentsPage() {
    // await new Promise((resolve) => setTimeout(resolve, 1500))

    return(
        <div className="grow h-full">
            <Recents />
        </div>
    )
}