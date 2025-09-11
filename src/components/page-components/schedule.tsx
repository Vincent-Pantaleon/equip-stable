'use client'

import AccordionCalendar from "../accordion-calendar"
import GetApprovedRequests from "@/utils/server-actions/schedule-page-query"
import Link from "next/link"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

export default function Schedule() {
    const { data, error, isPending } = useQuery({
        queryKey: ['approved-requests-data'],
        queryFn: GetApprovedRequests,
        staleTime: 1000 * 60 * 5,
    })

    if (error) {
        toast.error("Error fetching data")
    }

    if (isPending) {
        return (
            <div className="h-full flex justify-center items-center">
                <p className="text-lg">Fetching Data...</p>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-center">
                <div className="flex flex-col gap-y-4">
                    <p className="text-xl font-semibold">No approved requests</p>
                    <Link 
                        href="/borrow"
                        className="text-blue-500 hover:underline"
                    >
                        Go to Borrow Page
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full">
            <AccordionCalendar data={data} />
        </div>
    )
}
