'use client'

import { equipmentColumns } from "@/utils/table-columns/equipments-columns"
import { venueTypesColumnsNoActions } from "@/utils/table-columns/venues-columns"
import GetInventoryData from "@/utils/server-actions/inventory-page-query"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { EquipmentsDataTable } from "../tables/equipments-table"
import { VenuesDataTable } from "../tables/venues-table"
import InventoryLoading from "@/app/(app)/inventory/loading"
import Button from "../button"
import { useState } from "react"
import Modal from "../modal"
import { AvailabilityModalForm } from "./availability-modal-form"
import { Skeleton } from "../ui/skeleton"
import { CalendarCheck } from "lucide-react"

export default function Inventory() {
    const [openModal, setOpenModal] = useState<boolean>(false)
    
    const { data: InventoryData, isPending, isError } = useQuery({
        queryKey: ['inventory-data'],
        queryFn: GetInventoryData,
    })
    
    if (isError) {
        toast.error(isError)
    }

    return (
        <div className="flex flex-col gap-1 h-[1000px] md:h-full">
            {isPending ? (
                <>
                    <Skeleton className="h-12 w-full"/>
                </>
            ) : (
                <Button
                    label="Check Availability"
                    Icon={CalendarCheck}
                    onClick={() => setOpenModal(true)}
                />
            )}

            <div className="flex-1 min-h-0 flex flex-col gap-1">
                <div className="h-1/2">
                    {isPending ? (
                        <InventoryLoading/>
                    ) : (
                        <>
                            <EquipmentsDataTable 
                                columns={equipmentColumns} 
                                data={InventoryData?.equipments || []}
                                isEquipmentType={false}
                                pageSize={15}
                                offices={InventoryData?.offices || []}
                                isInventory={true}
                            />
                        </>
                    )}
                </div>
                <hr className="border-t border-slate-200" />
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
                                pageSize={15}
                                isInventory={true}
                            />
                        </>
                    )}
                </div>
            </div>

            <Modal
                header="Check for Available Equipment"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <AvailabilityModalForm />
            </Modal>
        </div>
    )
}
