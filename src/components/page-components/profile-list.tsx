'use client'

import { useQuery } from "@tanstack/react-query"
import { GetUsersList } from "@/utils/server-actions/profile-query"
import { toast } from "sonner"
import { DataTable } from "../data-table"
import { profilesColumns } from "@/utils/table-columns/profiles-columns"
import { Section } from "../input"
import Button from "../button"
import { useRouter } from "next/navigation"

const ProfileListTable = () => {
    const router = useRouter()
    
    const {data, error, isPending} = useQuery({
        queryKey: ['profiles-list'],
        queryFn: GetUsersList
    })

    if (error) {
        toast.error(error.message)
    }
   
    return (
        <div className="h-full bg-green-400">
            <div className="h-[60%] bg-red-200">
                <DataTable
                    caption="Profiles List"
                    columns={profilesColumns}
                    data={data?.data || []}
                    isLoading={isPending}
                    tableType="profiles"
                />
            </div>
            

           <Section header="Actions">
                <Button 
                    label="Add User"
                    onClick={() => router.push('/admin/profile-list/add-new-user')}
                />
                <Button
                    label="Remove User"
                    onClick={() => router.push('/admin/profile-list/remove-user')}
                />
                <Button
                    label="Update User"
                    onClick={() => router.push('/admin/profile-list/update-user')}
                />
           </Section>
        </div>
        
    )
}

export { ProfileListTable }