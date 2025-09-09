import { RequestsList } from "@/components/page-components/requests-list"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Admin | Requests List"
    }
}

const RequestsListPage = () => {
    return (
        <RequestsList />
    )
}

export default RequestsListPage