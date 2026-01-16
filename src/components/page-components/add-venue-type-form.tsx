'use client'

import { Input } from "../input"
import { CancelConfirmButtons } from "../cancel-confirm"
import { AddNewVenueType } from "@/utils/server-actions/add-venue-type"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import Button from "../button"
import { Send } from "lucide-react"
import Modal from "../modal"
import { useQueryClient } from "@tanstack/react-query"

interface FormProps {
    onClose: () => void
}

const AddVenueTypeForm = ({ onClose }: FormProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData | null>(null)

    const queryClient = useQueryClient()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)

        setFormData(form)
        setOpenModal(true)
    }

    const handleConfirm = async () => {
        if (!formData) return

        const result = await AddNewVenueType(formData)

        if (!result.status) {
            toast.error(result.message)
        }
        
        toast.success(result.message)
        queryClient.invalidateQueries({ queryKey: ['venues-type-data']})
        setOpenModal(false)
    }
    
    return (
        <>
            <form
                className="text-black space-y-2"
                onSubmit={handleSubmit}
            >
                <Input
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                />
                <Input
                    id="total_capacity"
                    label="Total Capacity"
                    name="total_capacity"
                    type="number"
                />

                <Button
                    Icon={Send}
                    label="Submit"
                    type="submit"
                    className="w-full"
                />
            </form>

            {openModal && (
                <Modal
                    header="Confirm New Venue Type"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <div>Please confirm adding a new venue type</div>
                    
                    <CancelConfirmButtons
                        onCancel={() => setOpenModal(false)}
                        onConfirm={handleConfirm}
                    />
                </Modal>
            )}
        </>
    )
}

export { AddVenueTypeForm }