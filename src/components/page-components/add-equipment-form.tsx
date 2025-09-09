'use client'

import { useRouter } from "next/navigation"

import { Section, Input, SelectInput } from "../input"
import Button from "../button"

import { InsertNewEquipment } from "@/utils/server-actions/admin-equipments-actions"
import { toast } from "sonner"

const AddEquipmentForm = () => {
    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const result = await InsertNewEquipment(formData)

        if (result?.status === false) {
            toast.error(result.message)
        } else {
            toast.success(result?.message)
        }
    }

    return (
        <> 
            <Button
                label="Back"
                className="w-full mb-4"
                onClick={() => router.back()}
            />
            <form
                onSubmit={handleSubmit}
            >
                <Section header="Add new Equipment">
                    {/* <SelectInput
                        label="Type"
                        name="type"
                        options={[]}
                    /> */}
                    <Input
                        label="Type"
                        id="type"
                        name="type"
                        type="text"
                    />
                    <Input
                        label="Item Name"
                        id="item_name"
                        name="item_name"
                        type="text"
                    />
                    <Input
                        label="Reference"
                        id="reference"
                        name="reference"
                        type="text"
                    />
                    <Input
                        label="Item Code"
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
                        className="col-span-2"
                        type="submit"
                    />
                </Section>
            </form>
        </>
    )
}

export { AddEquipmentForm }