'use client'

import { Input, SelectInput } from "../input"
import Button from "../button"
import Modal from "../modal"

import { InsertNewEquipment } from "@/utils/server-actions/admin-equipments-actions"
import { toast } from "sonner"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { GetEquipmentTypes } from "@/utils/server-actions/fetch-equipment-types"
import { useState } from "react"

const AddEquipmentForm = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData | null>(null)

    const queryClient = useQueryClient()

    const { data, error } = useQuery({
        queryKey: ['equipment-types'],
        queryFn: GetEquipmentTypes,
        staleTime: Infinity,
    })

    if (error) {
        toast.error(error.message)
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        setFormData(data)
        setOpenModal(true)
    }

    const handleConfirm = async () => {
        if (!formData) return

        const result = await InsertNewEquipment(formData)

        if (result?.status === false) {
            toast.error(result.message)
        } else {
            toast.success(result?.message)
            setOpenModal(false)
            queryClient.invalidateQueries({ queryKey: ["equipment-data"] })
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-y-4"
            >
                    <SelectInput
                        label="Type"
                        name="type"
                        options={data?.data || []}
                    />
                    <Input
                        label="Item Name"
                        id="item_name"
                        name="item_name"
                        type="text"
                    />
                    <Input
                        label="Reference Number"
                        id="reference"
                        name="reference"
                        type="text"
                    />
                    <Input
                        label="Property Code"
                        id="item_code"
                        name="item_code"
                        type="text"
                    />
                    <Input
                        label="Serial Number"
                        id="serial_number"
                        name="serial_number"
                        type="text"
                    />
                    <Input
                        label="Date acquired"
                        id="date_acquired"
                        name="date_acquired"
                        type="date"
                    />

                    <Button
                        label="Submit"
                        className=""
                        type="submit"
                    />
            </form>

            {openModal && (
                <Modal
                    header="Confirm Add New Equipment Type"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    Please confirm adding a new equipment
        
                    <div className="text-black flex justify-end gap-2 mt-4">
                    <Button
                        label="Cancel"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => setOpenModal(false)}
                    />
                    <Button
                        label="Confirm"
                        className="px-4 py-2"
                        onClick={handleConfirm} // ✅ call function directly
                    />
                    </div>
                </Modal>
            )}
        </>
    )
}

export { AddEquipmentForm }