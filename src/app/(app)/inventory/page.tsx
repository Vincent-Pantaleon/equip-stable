import Inventory from "@/components/page-components/inventory"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Inventory"
    }
}

export default async function InventoryPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    
    return (
        <Inventory />
    )
}