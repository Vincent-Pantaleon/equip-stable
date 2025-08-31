'use client'

import { useQuery } from "@tanstack/react-query"
import { GetUsersList } from "@/utils/server-actions/profile-query"
import { toast } from "sonner"
import { DataTable } from "../data-table"
import { profilesColumns } from "@/utils/data/profiles-columns"

const ProfileListTable = () => {
    const {data, error, isPending} = useQuery({
        queryKey: ['profiles-list'],
        queryFn: GetUsersList
    })

    if (error) {
        toast.error(error.message)
    }
   
    return (
        <DataTable
            caption="Profiles List"
            columns={profilesColumns}
            data={data?.data || []}
            isLoading={isPending}
            tableType="profiles"
        />
    )
}

export { ProfileListTable }