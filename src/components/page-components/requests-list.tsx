'use client'

import { useQuery } from "@tanstack/react-query"
import { GetAllRequestData } from "@/utils/server-actions/request-query"
import { toast } from "sonner"
import { allRequestColumns } from "@/utils/data/request-columns"
import { DataTable } from "../data-table"

const RequestsList = () => {
    const { data: requestData, error: requestError, isPending: requestPending } = useQuery({
        queryKey: ['all-requests-data'],
        queryFn: GetAllRequestData,
    })

    if (requestError) {
        toast.error("Error fetching data")
    }
    
    return (

        <DataTable
            columns={allRequestColumns}
            data={requestData || []}
            caption="All Requests"
            tableType="requests"
            isLoading={requestPending}
            isAdmin={true}
            paginate={false}
        />

    )
}

export { RequestsList }