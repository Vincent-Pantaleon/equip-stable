'use client'

import { SelectInput, Input } from "../input"
import { useState } from "react"
import { CancelConfirmButtons } from "../cancel-confirm"
import { useQuery } from "@tanstack/react-query"
import { GetAvailabilityOptions, GetItemAvailability } from "@/utils/server-actions/fetch-availability"
import { toast } from "sonner"
import Modal from "../modal"
import { Check, X } from "lucide-react"

const typeOptions = [
    { label: "Equipment", value: "equipment" },
    { label: "Venue", value: "venue" }
]

type Type = 'equipment' | 'venue';

const AvailabilityModalForm = () => {
    const [type, setType] = useState<Type | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData | null>(null)
    const [showAvailabilityResult, setShowAvailabilityResult] = useState<boolean>(false)
    const [availabilityResult, setAvailabilityResult] = useState<AvailabilityResult | null>(null)

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

        setFormData(new FormData(e.currentTarget))
    }

    const handleConfirm = async () => {
        const result = await GetItemAvailability(type as Type, formData as FormData)

        if (!result.status) {
            toast.error(result.message)
        }

        if (result.status) {
            setOpenModal(false)
            setShowAvailabilityResult(true)
            setAvailabilityResult(result.data || null)
        }
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

            <Modal 
                header="Item Availability"
                isOpen={showAvailabilityResult}
                onClose={() => setShowAvailabilityResult(false)}
            >
                <div className="flex flex-col items-center justify-center p-2">
                    {availabilityResult?.is_available ? (
                        <div className="mt-4 text-center flex flex-col items-center gap-y-4">
                            <div className="p-3 rounded-full bg-green-500 w-fit">
                                <Check color="white" className="h-10 w-10"/>
                            </div>
                            <h2 className="text-lg font-semibold">Item is Available!</h2>
                            <div className="mt-2 space-y-1">
                                <p>Booked On This Date: {availabilityResult.total_bookings_count}</p>
                                <p>Available Amount: {availabilityResult.available_amount}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4 text-center flex flex-col items-center gap-y-4">
                            <div className="p-3 rounded-full bg-red-500 w-fit">
                                <X color="white" className="h-10 w-10"/>
                            </div>

                            <h2 className="text-lg font-semibold">Item is Not Available!</h2>
                        </div>
                    )}
                </div>
                
            </Modal>
        </div>
    )
}

export { AvailabilityModalForm }