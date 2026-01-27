'use client'

import { SelectInput, Input } from "../input"
import { useState } from "react"
import { CancelConfirmButtons } from "../cancel-confirm"
import { useQuery } from "@tanstack/react-query"
import { GetAvailabilityOptions, GetItemAvailability } from "@/utils/server-actions/fetch-availability"
import { toast } from "sonner"
import Modal from "../modal"

const typeOptions = [
    { label: "Equipment", value: "equipment" },
    { label: "Venue", value: "venue" }
]

const AvailabilityModalForm = () => {
    const [type, setType] = useState<'equipment' | 'venue' | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const { data: options, error} = useQuery({
        queryKey: ['options-data'],
        queryFn: GetAvailabilityOptions
    })

    if (error) {
        toast.error(error.message)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpenModal(true)

    }

    const handleConfirm = async () => {

    }

    return (
        <div className="space-y-4">
            <form
                className="space-y-2"
                onSubmit={handleSubmit}
            >
                <SelectInput
                    label="Select Type"
                    name="type"
                    options={typeOptions}
                    onChange={(e) => setType(e.target.value as ('equipment' | 'venue'))}
                />

                {type && (
                    <>
                        <SelectInput
                            label={type === 'equipment' ? 'Equipment' : 'Venue'}
                            name="item"
                            options={(type === 'equipment' ? options?.data?.normalizeEquipmentOptions : options?.data?.normalizeVenueOptions) || [] }
                        />

                        <Input 
                            id="date"
                            label="Enter Date"
                            name="date"
                            type="date"
                        />
                    </>
                )}

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={() => {}}
                />
                
            </form>

            <Modal
                header="Confirm"
                onClose={() => setOpenModal(false)}
                isOpen={openModal}
            >
                Confirm Availability Check?

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={handleConfirm}
                />
            </Modal>
        </div>
    )
}

export { AvailabilityModalForm }