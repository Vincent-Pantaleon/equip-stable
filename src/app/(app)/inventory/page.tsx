import InventoryTables from "@/components/page-components/inventory-tables"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Inventory"
    }
}

export default async function InventoryPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    
    return (
        <InventoryTables />
    )
}