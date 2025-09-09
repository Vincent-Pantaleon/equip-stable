'use client'

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { GetAdministratorsList } from "@/utils/server-actions/profile-query"
import { AddNewOffice } from "@/utils/server-actions/office-page-actions"

import { Section, Input, SelectInput } from "../input"
import Button from "../button"
import { toast } from "sonner"

const AddNewOfficeForm = () => {
    const router = useRouter()
    
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
        
        const result = await AddNewOffice(formData)

        if (result.status === false) {
            toast.error(result.message)
        }

        toast.success(result.message)
    }
    
    return (
        <>
            <Button
                label="Back"
                onClick={() => router.back()}
                className="w-full"
            />
            <form onSubmit={handleSubmit}>
                <Section header="Add New Office">
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
                        className="col-span-2"
                        type="submit"
                    />
                </Section>
            </form>
        </>
    )
}

export { AddNewOfficeForm }