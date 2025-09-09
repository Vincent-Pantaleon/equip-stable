'use client'

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { GetOfficeNames } from "@/utils/server-actions/office-page-actions"
import { AddNewUser } from "@/utils/server-actions/add-user"

import { Input, Section, SelectInput } from "../input"
import Button from "../button"
import { toast } from "sonner"

const Gender: GenderOptions[] = [
    { label: "Male", value: "male", kind: "gender" },
    { label: "Female", value: "female", kind: "gender" },
    { label: "Others", value: "others", kind: "gender" }
]

const Roles: RoleOptions[] = [
    { label: "User", value: "user", kind: "role" },
    { label: "Moderator", value: "moderator", kind: "role" },
    { label: "Administrator", value: "administrator", kind: "role" },
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
                    <Input
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        divStyle="col-span-2"
                    />

                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="text"
                        divStyle="col-span-2"
                        isPassword={true}
                    />

                    <Input
                        label="Confirm Password"
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        divStyle="col-span-2"
                        isPassword={true}
                    />

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