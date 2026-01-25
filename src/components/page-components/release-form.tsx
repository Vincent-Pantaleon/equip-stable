'use client'

import { SelectInput } from "../input"

import { useQuery } from "@tanstack/react-query"
import { GetBookings, GetEquipments, GetVenues } from "@/utils/server-actions/get-releases"

import { toast } from "sonner"
import { CancelConfirmButtons } from "../cancel-confirm"
import React, { useState, useMemo } from "react"
import { AddRelease } from "@/utils/server-actions/add-release"
import Modal from "../modal"

import { useQueryClient } from "@tanstack/react-query"

interface FormProps {
    onClose: () => void;
}

const ReleaseForm = ({ onClose }: FormProps) => {
    const [formData, setFormData] = useState<FormData | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [requestType, setRequestType] = useState<string>('')
    const [group, setGroup] = useState<string>('')
    const [office, setOffice] = useState<string>('')
    const queryClient = useQueryClient()

    const { data: bookingsData, error: bookingsError } = useQuery({
        queryKey: ['bookings-options'],
        queryFn: GetBookings,
    })

    // 1. Always call hooks at the top level (no if statements)
    const { data: equipmentsData, error: equipmentsError } = useQuery({
        queryKey: ['equipments-options'],
        queryFn: GetEquipments,
        // 2. Only run this query if requestType is 'equipment'
        enabled: requestType === 'equipment', 
    });

    const { data: venuesData, error: venuesError } = useQuery({
        queryKey: ['venues-options'],
        queryFn: GetVenues,
        // 2. Only run this query if requestType is 'venue'
        enabled: requestType === 'venue',
    });

    const bookingsOptions = useMemo(() => bookingsData?.data || [], [bookingsData])
    const equipmentsOptions = useMemo(() => equipmentsData?.data || [], [equipmentsData])
    const venuesOptions = useMemo(() => venuesData?.data || [], [venuesData])

    console.log("Equipments Options: ", equipmentsOptions)
    console.log("Venues Options: ", venuesOptions)

    if (equipmentsError || venuesError) {
        toast.error(equipmentsError?.message || venuesError?.message)
    }

    if (bookingsError) {
        toast.error(bookingsError.message)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        setFormData(formData)
        setOpenModal(true)
    }

    const handleConfirm = async () => {
        if (!formData) return;

        const result = await AddRelease({ formData })

        if (result.status) {
            toast.success(result.message)
            onClose()
        } else {
            console.log(result.message)
            toast.error(result.message)
        }

        queryClient.invalidateQueries({ queryKey: ['release-list'] })
    }

    return (
        <div className="space-y-4" >
            <form
                className="space-y-4"
                onSubmit={handleSubmit}
            >
                <SelectInput
                    label="Select Booking"
                    name="booking_id"
                    options={ bookingsOptions || [] }
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        if (!bookingsData?.data) return;
                        const selected = bookingsData?.data.find(opt => opt.value === e.target.value)
                        if (selected) {
                            setRequestType(selected.type)
                            setGroup(selected.group)
                            setOffice(selected.office)
                        }
                    }}
                />

                {(requestType && group && office) && (
                    <SelectInput    
                        label={requestType === 'equipment' ? "Select Equipment" : "Select Venue"}
                        name="item_id"
                        options={ (requestType === 'equipment' ? equipmentsOptions : venuesOptions) || [] }
                        group={group}
                    />
                )}
                
                <CancelConfirmButtons
                    onCancel={onClose}
                    onConfirm={() => {}}
                />
            </form>

            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                header="Confirm Release"
            >
                Confirm release?

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={handleConfirm}
                />
            </Modal>
        </div>
        
    )
}

export { ReleaseForm }  