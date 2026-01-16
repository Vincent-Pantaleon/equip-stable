'use client'

import { equipmentColumns } from "@/utils/table-columns/equipments-columns"
import { venueTypesColumnsNoActions } from "@/utils/table-columns/venues-columns"
import GetInventoryData from "@/utils/server-actions/inventory-page-query"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { EquipmentsDataTable } from "../tables/equipments-table"
import { VenuesDataTable } from "../tables/venues-table"
import InventoryLoading from "@/app/(app)/inventory/loading"
import { useQueryClient } from "@tanstack/react-query"

export default function Inventory() {
    const { data: InventoryData, isPending, isError } = useQuery({
        queryKey: ['inventory-data'],
        queryFn: GetInventoryData,
    })

    console.log(InventoryData)

    // const queryClient = useQueryClient()

    // queryClient.invalidateQueries({queryKey: ['inventory-data']})

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
                            isEquipmentType={false}
                            pageSize={8}
                            offices={InventoryData?.offices || []}
                            isInventory={true}
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
                            columns={venueTypesColumnsNoActions} 
                            data={InventoryData?.venues || []}
                            header="Venues"
                            tableType="venues"
                            isAdminLayout={false}
                            options={InventoryData?.offices || []}
                            pageSize={8}
                            isInventory={true}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
