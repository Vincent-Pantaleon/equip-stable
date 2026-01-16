'use client'

import { useQuery } from "@tanstack/react-query"

import { GetAdministratorsList } from "@/utils/server-actions/profile-query"
import { AddNewOffice } from "@/utils/server-actions/office-page-actions"

import { Input, SelectInput } from "../input"
import Button from "../button"
import { toast } from "sonner"
import { useState } from "react"
import Modal from "../modal"
import { useQueryClient } from "@tanstack/react-query"
import { CancelConfirmButtons } from "../cancel-confirm"

const AddNewOfficeForm = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [formData, setFormData] = useState< FormData | null>(null)

    const queryClient = useQueryClient();
    
    const { data, error } = useQuery({
        queryKey: ['administrator-list'],
        queryFn: GetAdministratorsList
    })
    
    if (error) {
        toast.error("Error Fetching Administrator List")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        setFormData(formData)
        setOpenModal(true)
    }

    const handleConfirm = async () => {
        if (!formData) return;

        const result = await AddNewOffice(formData)

        if (!result.status) {
            toast.error(result.message)
        }

        toast.success(result.message)
        queryClient.invalidateQueries({ queryKey: ['office-list'] })
        setOpenModal(false)
    }
    
    return (
        <>
            <form 
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <Input
                    label="Office Name"
                    id="office"
                    name="office"
                    type="text"
                    divStyle="col-span-2"
                />

                {/* Swap to a Select Input */}
                <SelectInput
                    label="Person In Charge (Must be an Administrator)"
                    name="in_charge"
                    options={data?.data || []}
                    divStyle="col-span-2"
                />



                <Button
                    label="Submit"
                    className="w-full"
                    type="submit"
                />
            </form>

            <Modal
                header="Confirm Adding NNew Office"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                Are you sure you want to add a new office?

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={handleConfirm}
                />
            </Modal>
        </>
    )
}

export { AddNewOfficeForm }