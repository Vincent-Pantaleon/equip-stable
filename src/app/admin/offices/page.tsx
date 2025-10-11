import { OfficeList } from "@/components/page-components/offices-list"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Office List"
    }
}

const AdminOfficesPage = () => {
    return (
        <OfficeList />
    )
}

export default AdminOfficesPage