'use client'

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { GetOfficeList } from "@/utils/server-actions/office-page-actions"

import { DataTable } from "../data-table"
import { OfficeTableColumns } from "@/utils/table-columns/offices-columns"
import { Section } from "../input"
import Button from "../button"
import { toast } from "sonner"

const OfficeList = () => {
    const router = useRouter()
   
    const { data, error, isPending } = useQuery({
        queryKey: ['office-list'],
        queryFn: GetOfficeList
    })

    if (error) {
        toast.error(error.message)
    }

    return (
        <div className="h-full">
            <div className="h-[60%]">
                <DataTable
                    caption="Offices List"
                    columns={OfficeTableColumns}
                    data={data?.data || []}
                    isLoading={false}
                    tableType="offices"
                    isAdmin={isPending}
                />
            </div>
            <Section header="Actions">
                <Button
                    label="Add New Office"
                    onClick={() => router.push('/admin/offices/add-new-office')}
                />
                <Button
                    label="Edit Office"
                    onClick={() => router.push('/admin/offices/edit-office')}
                />
                <Button
                    label="Remove Office"
                    onClick={() => router.push('/admin/offices/remove-office')}
                />
            </Section>
        </div>
    )
}

export { OfficeList }