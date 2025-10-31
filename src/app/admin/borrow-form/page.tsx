import { Metadata } from "next"
import { FormValuesTableList } from "@/components/page-components/borrow-form-table-list"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Borrow Form Options"
    }
}

const AdminDashboardBorrowFormPage = () => {
    return (
        <FormValuesTableList />
    )
}

export default AdminDashboardBorrowFormPage