import { BookingsList } from "@/components/page-components/bookings-list"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Bookings List"
    }
}

const RequestsListPage = () => {
    return (
        <BookingsList />
    )
}

export default RequestsListPage