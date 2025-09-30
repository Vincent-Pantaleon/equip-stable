'use client'

import { equipmentColumns } from "@/utils/table-columns/equipments-columns"
import { venuesColumns } from "@/utils/table-columns/venues-columns"
import GetInventoryData from "@/utils/server-actions/inventory-page-query"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { EquipmentsDataTable } from "../tables/equipments-table"
import { VenuesDataTable } from "../tables/venues-table"
import InventoryLoading from "@/app/(app)/inventory/loading"

export default function Inventory() {
    const { data: InventoryData, isPending, isError } = useQuery({
        queryKey: ['inventory-data'],
        queryFn: GetInventoryData,
        staleTime: 1000 * 60 * 5,
    })

    if (isError) {
        toast.error(isError)
    }

    return (
        <div className="flex flex-col gap-1 h-full">
            <div className="h-1/2">
                {isPending ? (
                    <InventoryLoading/>
                ) : (
                    <>
                        <EquipmentsDataTable 
                            columns={equipmentColumns} 
                            data={InventoryData?.equipments || []}
                            isEquipmentType={true}
                        />
                    </>
                )}
            </div>
            <div className="h-1/2">
                {isPending ? (
                    <InventoryLoading/>
                ) : (
                    <>
                        <VenuesDataTable 
                            columns={venuesColumns} 
                            data={InventoryData?.venues || []} 
                        />
                    </>
                )}
            </div>
        </div>
    )
}
