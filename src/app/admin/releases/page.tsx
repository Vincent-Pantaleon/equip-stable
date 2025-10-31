import { Metadata } from "next"
import { ReleasesList } from "@/components/page-components/releases-list"

export const metadata: Metadata = {
    title: {
        absolute: "equip | Release Form"
    }
}

const ReleaseFormPage = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="col-span-2 my-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Releases</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Form to release venues, and equipments
                </p>
            </div>

            {/* Put a table here that would show the bookings for the day */}
            <div className="grow">
                <ReleasesList/>
            </div>
        </div>
    )
}

export default ReleaseFormPage