import { DashboardNavbar } from "@/components/layout-components/dashboard-navbar"

type AdminDashboardLayoutProps = {
    children: React.ReactNode
}

const AdminDashboardLayout = ({ 
    children
}: AdminDashboardLayoutProps) => {
    return (
        <div>
            <DashboardNavbar/>

            <div>
                {children}
            </div>
        </div>
    )
}

export default AdminDashboardLayout