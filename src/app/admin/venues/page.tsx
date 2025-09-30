import { VenuesList } from "@/components/page-components/venues-list"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Venues List"
    }
}

const AdminVenuesPage = () => {
    return (
        <VenuesList />
    )
}

export default AdminVenuesPage