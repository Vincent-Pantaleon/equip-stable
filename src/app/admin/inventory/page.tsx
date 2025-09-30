import { AdminEquipments } from "@/components/page-components/admin-equipments"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Inventory List"
    }
}

const DashboardInventoryPage = () => {
    return (
        <AdminEquipments/>
    )
}

export default DashboardInventoryPage