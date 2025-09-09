import AdminContent from "@/components/layout-components/admin-layout"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {   
    return (
        <AdminContent>
            {children}
        </AdminContent>
    )
}

export default AdminLayout