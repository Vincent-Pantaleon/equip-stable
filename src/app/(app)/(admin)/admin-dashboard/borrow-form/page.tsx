import { AdminDashboard } from "@/components/page-components/admin-dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Admin Dashboard | Borrow Form"
    }
}

const DashboardBorrowPage = () => {
    return (
        <div>
            Hello from borrow page
        </div>
    )
}

export default DashboardBorrowPage