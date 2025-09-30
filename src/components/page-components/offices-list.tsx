'use client'

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { GetOfficeList } from "@/utils/server-actions/office-page-actions"

import { DataTable } from "../data-table"
import { OfficeTableColumns } from "@/utils/table-columns/offices-columns"
import { Section } from "../input"
import Button from "../button"
import { toast } from "sonner"
import { OfficesDataTable } from "../tables/offices-table"

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
        <div className="h-full flex flex-col">
            <div className="col-span-2 my-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Offices list</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Office management
                </p>
            </div>
            
            <div className="grow">
                <OfficesDataTable
                    columns={OfficeTableColumns}
                    data={data?.data || []}
                />
            </div>
            {/* <Section header="Actions">
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
            </Section> */}
        </div>
    )
}

export { OfficeList }