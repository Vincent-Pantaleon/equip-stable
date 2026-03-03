import { Metadata } from "next"
import { ReleasesList } from "@/components/page-components/releases-list"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Release Form"
    }
}

const ReleaseFormPage = () => {
    return (
        <div className="flex flex-col h-full space-y-2">
            <div className="col-span-2 border-b">
                <h1 className="text-2xl font-semibold text-gray-800">Releases</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Form to release venues, and equipments
                </p>
            </div>

            {/* Put a table here that would show the bookings for the day */}
            <div className="flex-1 min-h-0">
                <ReleasesList/>
            </div>
        </div>
    )
}

export default ReleaseFormPage