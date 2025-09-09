'use client'

import { useRouter } from "next/navigation"

import { InsertNewEquipmentType } from "@/utils/server-actions/admin-equipments-actions" 

import { toast } from "sonner"
import Button from "../button"
import { Section, Input } from "../input"

const AddEquipmentTypeForm = () => {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const result = await InsertNewEquipmentType(formData)

        if (result.status === false) {
            toast.error(result.message)
        } else {
            toast.success(result.message)
        }
    }
    
    return (
        <> 
            <Button
                label="Back"
                onClick={() => router.back()}
                className="w-full mb-4"
            />
            <form
                onSubmit={handleSubmit}
            >
                <Section header="Add New Type">
                    <Input
                        label="Type"
                        id="type"
                        name="type"
                        type="text"
                        required={true}
                        divStyle="col-span-2"
                    />
                    <Input
                        label="Total Count"
                        id="total_count"
                        name="total_count"
                        type="number"
                        required={true}
                        divStyle="col-span-2"
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

export { AddEquipmentTypeForm }