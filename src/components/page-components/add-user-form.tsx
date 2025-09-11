'use client'

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { GetOfficeNames } from "@/utils/server-actions/office-page-actions"
import { AddNewUser } from "@/utils/server-actions/add-user"

import { Input, Section, SelectInput } from "../input"
import Button from "../button"
import { toast } from "sonner"

const Gender: OptionType[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" }
]

const Roles: OptionType[] = [
    { label: "User", value: "user" },
    { label: "Moderator", value: "moderator" },
    { label: "Administrator", value: "administrator" },
]

const AddUserForm = () => {
    const router = useRouter()

    const { data, error } = useQuery({
        queryKey: ['offices'],
        queryFn: GetOfficeNames
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const result = await AddNewUser(data)

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
                <Section header="Add New User">
                    <Section>
                        <Input
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                        />

                        <Input
                            label="Password"
                            id="password"
                            name="password"
                            type="text"

                            isPassword={true}
                        />

                        <Input
                            label="Confirm Password"
                            id="confirm_password"
                            name="confirm_password"
                            type="password"

                            isPassword={true}
                        />
                    </Section>
                    
                    <Section>
                        <Input
                            label="First Name"
                            id="fname"
                            name="fname"
                            type="text"
                        />

                        <Input
                            label="Last Name"
                            id="lname"
                            name="lname"
                            type="text"
                        />

                        <SelectInput
                            label="Gender"
                            name="gender"
                            options={Gender}  
                        />
                    </Section>
                    
                    <Section>
                        <Input
                            label="School ID"
                            id="school_id"
                            name="school_id"
                            type="text"
                        />

                        <SelectInput
                            label="Role"
                            name="role"
                            options={Roles || []}
                        />

                        <SelectInput
                            label="Assigned Office"
                            name="office_assigned"
                            options={data?.data || []}
                        />
                    </Section>
                    

                    <Button
                        label="Create"
                        className="col-span-2"
                        type="submit"
                    />
            </Section>
        </form>
        </>

    )
}

export { AddUserForm }