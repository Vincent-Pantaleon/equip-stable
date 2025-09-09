'use client'

import { DataTable } from "../data-table"
import { equipmentColumns } from "@/utils/table-columns/equipments-columns"
import { venuesColumns } from "@/utils/table-columns/venues-columns"
import GetInventoryData from "@/utils/server-actions/inventory-page-query"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export default function InventoryTables() {
    const { data: InventoryData, isPending, isError } = useQuery({
        queryKey: ['inventory-data'],
        queryFn: GetInventoryData,
    })

    if (isError) {
        toast.error(isError)
    }

    return (
        <div className="h-full">
            <div className="h-1/2">
                <DataTable 
                    caption="Equipments" 
                    columns={equipmentColumns} 
                    data={InventoryData?.equipments || []} 
                    tableType="equipments" 
                    isLoading={isPending}
                />
            </div>
            <div className="h-1/2">
                <DataTable 
                    caption="Venues" 
                    columns={venuesColumns} 
                    data={InventoryData?.venues || []} 
                    tableType="venues" 
                    isLoading={isPending}
                />
            </div>
        </div>
    )
}
