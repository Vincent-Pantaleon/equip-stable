'use client'

import { useQuery } from "@tanstack/react-query"

import { Input, SelectInput } from "../input"
import Button from "../button"
import { Send } from "lucide-react"
import { FormEvent, useState } from "react"
import Modal from "../modal"
import { CancelConfirmButtons } from "../cancel-confirm"
import { GetTypes } from "@/utils/server-actions/update-venue"
import { AddNewVenue } from "@/utils/server-actions/add-new-venue"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

const AddVenueForm = () => {
    
    const [formData, setFormData] = useState<FormData | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const { data, error } = useQuery({
        queryKey: ['venue-options'],
        queryFn: GetTypes,
        staleTime: Infinity
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)
        setFormData(form)

        setOpenModal(true)
    } 

    const handleConfirm = async () => {
        if (!formData) return

        const result = await AddNewVenue(formData)

        if (!result.status) {
            toast.error(result.message)
        }

        toast.success(result.message)
        queryClient.invalidateQueries({ queryKey: ['venues-data'] })
        setOpenModal(false)
    }
    
    return (
        <>
            <form
                className="space-y-4 text-black"
                onSubmit={handleSubmit}
            >
                <SelectInput
                    label="Type"
                    name="type"
                    options={data?.data || []}
                />
                <Input
                    id="reference"
                    label="Venue Name"
                    name="reference"
                    type="text"
                />

                <Button
                    Icon={Send}
                    label="Submit"
                    className="w-full"
                    type="submit"
                />
            </form>

            {openModal && (
                <Modal
                    header="Confirm New Venue"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    Confirm Adding New Venue?
                    <CancelConfirmButtons
                        onCancel={() => setOpenModal(false)}
                        onConfirm={handleConfirm}
                    />
                </Modal>
            )}
        </>

    )
}

export { AddVenueForm }