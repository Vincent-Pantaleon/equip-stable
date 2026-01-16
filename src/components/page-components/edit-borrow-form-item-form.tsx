'use client'

import { formatLabel } from "@/utils/handlers/capitalize"
import { Input, SelectInput } from "../input"
import { useQuery } from "@tanstack/react-query"
import { FetchDepartmentOptions } from "@/utils/server-actions/fetch-departments"
import { CancelConfirmButtons } from "../cancel-confirm"
import { toast } from "sonner"
import { EditFormItem } from "@/utils/server-actions/edit-borrow-form-item"
import { useState } from "react"
import Modal from "../modal"
import { useQueryClient } from "@tanstack/react-query"

interface FormProps {
    item: any
    table: string
    onClose: () => void
}

const RoomOptions = [
    { label: "GS", value: "gs" },
    { label: "HS", value: "hs" }
]

const EditBorrowFormItem = ({ item, table, onClose }: FormProps) => {
    
    const [form, setForm] = useState<FormData | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)

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

        setOpenModal(true)
        setForm(form)
    }

    const handleConfirm = async () => {
        const result = await EditFormItem({table, form, item})

        if (!result?.status) {
            toast.error(result?.message)
        } else {
            setOpenModal(false)
            onClose()
            queryClient.invalidateQueries({ queryKey: ['borrow-form-values'] })
            toast.success(result.message)
        }
    }

    const nameFieldMap: Record<string, string> = {
        department: 'department_name',
        designation: 'designation_name',
        purpose: 'purpose_name',
        type_of_request: 'type_name',
        location_of_use: 'location_name',
    }



    return (
        <>
            <form
                className="space-y-3"
                onSubmit={handleSubmit}
            >
                {(table === 'department' || table === 'designation' || table === 'purpose' || table === 'type_of_request' || table === 'location_of_use') && (
                    <Input
                        id="name"
                        label="Item Name"
                        name="name"
                        type="text"
                        defaultValue={formatLabel(item?.[nameFieldMap[table]]) ?? ''}
                    />
                )}

                {(table === 'grade_level' || table === 'place_of_use' || table === 'subject') && (
                    <>
                        <SelectInput
                            label="Department"
                            name="department"
                            options={data?.data || []}
                            defaultValue={item.department_id}
                        />

                        {(table === 'grade_level') && (
                            <Input
                                id="level"
                                label="Level"
                                name="level"
                                type="text"
                                defaultValue={item.grade_level}
                            />
                        )}

                        {(table === 'place_of_use') && (
                            <>
                                <SelectInput
                                    label="Room"
                                    name="room"
                                    options={RoomOptions || []}
                                    defaultValue={item.room}
                                />

                                <Input
                                    id="number"
                                    label="Number"
                                    name="number"
                                    type="text"
                                    defaultValue={item.number}
                                />

                            </>
                        )}

                        {(table === 'subject') && (
                            <Input
                                id="subject"
                                label="Subject"
                                name="subject"
                                type="text"
                                defaultValue={formatLabel(item.subject_name)}
                            />
                        )}
                    </>
                )}

                <CancelConfirmButtons
                    onCancel={onClose}
                    onConfirm={() => {}}
                />
            </form>

            <Modal
                header="Confirm Update"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                Are you sure you want to update this item?

                <CancelConfirmButtons
                     onCancel={() => setOpenModal(false)}
                     onConfirm={handleConfirm}
                />
            </Modal>
        </>
    )
}

export { EditBorrowFormItem }