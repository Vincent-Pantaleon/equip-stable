'use client'

import { useState } from "react"
import { Input, SelectInput } from "../input"
import { formatLabel } from "@/utils/handlers/capitalize"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FetchDepartmentOptions } from "@/utils/server-actions/fetch-departments"
import { toast } from "sonner"
import { CancelConfirmButtons } from "../cancel-confirm"
import Modal from "../modal"
import { AddNewValue } from "@/utils/server-actions/add-new-form-value"

const ValueOptions = [
    { label: "Department", value: "department" },
    { label: "Designation", value: "designation" },
    { label: "Purpose", value: "purpose" },
    { label: "Type of Request", value: "type_of_request" },
    { label: "Location of Use", value: "location_of_use" },
    { label: "Grade Level", value: "grade_level" },
    { label: "Place Of Use", value: "place_of_use" },
    { label: "Subject", value: "subject" }
]

interface FormProps {
    onClose: () => void
}

const roomOptions = [
    { label: "GS", value: "gs"},
    { label: "HS", value: "hs" }
]

const AddNewValueForm = ({ onClose }: FormProps) => {

    const [table, setTable] = useState<
    'department' | 
    'designation' | 
    'purpose' | 
    'type_of_request' | 
    'location_of_use' | 
    'grade_level' | 
    'place_of_use' | 
    'subject' | 
    null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData | null>(null)

    const queryClient = useQueryClient()

    const { data, error } = useQuery({
        queryKey: ['department-options'],
        queryFn: FetchDepartmentOptions
    })

    if (error) {
        toast.error(error.message)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)

        setFormData(form)
        setOpenModal(true)
    }

    const handleConfirm = async () => {
        if (!formData) return;

        const result = await AddNewValue({ table: table, form: formData })

        if (!result.status) {
            toast.error(result.message)
        }

        toast.success(result.message)
        queryClient.invalidateQueries({ queryKey: ['borrow-form-values'] })
        onClose()
        setOpenModal(false)
    }

    return (
        <form
            className="space-y-4"
            onSubmit={handleSubmit}
        >
            <SelectInput
                label="Select Table"
                name="table"
                options={ValueOptions || []}
                onChange={(e) => setTable(e.target.value as typeof table)}
            />

            {(table === 'department' || table === 'designation' || table === 'purpose' || table === 'type_of_request' || table === 'location_of_use') && (
                <Input
                    id={table as string}
                    label={formatLabel(table as string)}
                    name='name'
                    type="text"
                />
            )}

            {(table === 'grade_level' || table === 'place_of_use' || table === 'subject') && (
                <>
                    <SelectInput
                        label="Select Department"
                        name="department"
                        options={ data?.data || []}
                    />

                    {(table === 'grade_level') && (
                        <Input
                            id="level"
                            label="Level"
                            name="level"
                            type="text"
                        />
                    )}

                    {(table === 'place_of_use') && (
                        <>
                            <SelectInput
                                label="Room"
                                name="room"
                                options={roomOptions || []}
                            />
                            
                            <Input
                                id="number"
                                label="Number"
                                name="number"
                                type="text"
                            />
                        </>
                    )}

                    {(table === 'subject') && (
                        <Input
                            id="subject"
                            label="Subject"
                            name="subject"
                            type="text"
                        />
                    )}
                </>
            )}

            <CancelConfirmButtons
                onCancel={onClose}
                onConfirm={() => {}}
            />

            <Modal
                header="Confirm Adding New Value"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                Confirm adding new value to table {formatLabel(table ?? "No Table")}?

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={handleConfirm}
                />
            </Modal>
        </form>
    )
}

export { AddNewValueForm }