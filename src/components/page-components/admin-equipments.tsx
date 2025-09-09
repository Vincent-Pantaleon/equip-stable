'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import Button from "../button"
import { DataTable } from "../data-table"
import { adminEquipmentColumns, adminEquipmentTypeColumns } from "@/utils/table-columns/admin-equipments-columns"
import { SelectEquipment, SelectEquipmentType } from "@/utils/server-actions/admin-equipments-actions"

import { Section, Input } from "../input"

const AdminEquipments = () => {
    const router = useRouter()
    
    const [isEquipmentTypeVisible, setIsEquipmentTypeVisible] = useState<boolean>(false)

    const { data: typeData, error: typeError, isPending: typePending } = useQuery({
        queryKey: ['equipment-type-data'],
        queryFn: SelectEquipmentType
    })

    if (typeError) {
        toast.error(typeError.message)
    }

    const { data: equipmentData, error: equipmentError, isPending: equipmentPending } = useQuery({
        queryKey: ['equipment-data'],
        queryFn: SelectEquipment
    })
    
    return (
        <div className="flex flex-col gap-y-4 h-full">
            <div className=" h-[60%]">
                {!isEquipmentTypeVisible ? (
                    <DataTable
                        caption="Equipments"
                        columns={adminEquipmentColumns}
                        data={equipmentData?.data || []}
                        isLoading={equipmentPending}
                        tableType="equipments"
                        isAdmin={true}
                    />
                ) : (
                    <DataTable
                        caption="Equipment Types"
                        columns={adminEquipmentTypeColumns}
                        data={typeData?.data || []}
                        isLoading={typePending}
                        tableType="equipments"
                        isAdmin={true}
                    />
                )}
            </div>

            <Section header="Actions">
                <Button 
                    label={isEquipmentTypeVisible? "Go to Equipments" : "Go to Equipment Types"}
                    onClick={() => setIsEquipmentTypeVisible(prev => !prev)}
                    className="px-4 col-span-2"
                />

                <Section header="Equipment Actions">
                    <Button
                        label="Add New Equipment"
                        onClick={() => router.push('/admin/inventory/add-new-equipment')}
                    />
                    <Button
                        label="Edit Equipment"
                        onClick={() => router.push('/admin/inventory/edit-equipment')}
                    />
                    <Button
                        label="Remove Equipment"
                        onClick={() => router.push('/admin/inventory/remove-equipment')}
                    />
                </Section>

                <Section header="Equipment Type Actions">
                    <Button
                        label="Add New Type"
                        onClick={() => router.push('/admin/inventory/add-new-type')}
                    />
                    <Button
                        label="Edit Equipment Type"
                        onClick={() => router.push('/admin/inventory/edit-equipment-type')}
                    />
                    <Button
                        label="Remove Equipment Type"
                        onClick={() => router.push('/admin/inventory/remove-equipment-type')}
                    />
                </Section>
            </Section>
        </div>
    )
}

export { AdminEquipments }