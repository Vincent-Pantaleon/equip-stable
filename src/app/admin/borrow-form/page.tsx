import { AdminDashboard } from "@/components/page-components/admin-dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip"
    }
}

const AdminDashboardBorrowFormPage = () => {
    return (
        <div>
            Hello from borrow form page
        </div>
    )
}

export default AdminDashboardBorrowFormPage