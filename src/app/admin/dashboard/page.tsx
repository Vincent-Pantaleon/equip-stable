import { Metadata } from "next"

import { AdminDashboard } from "@/components/page-components/admin-dashboard"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Admin Dashboard"
    }
} 

const AdminDashboardPage = () => {
    return (
        <AdminDashboard />
    )
}

export default AdminDashboardPage