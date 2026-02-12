'use client'

import { useQuery } from "@tanstack/react-query"
import { AddNewUser } from "@/utils/server-actions/add-user"
import { FetchOfficeOptions } from "@/utils/server-actions/fetch-office"

import { Input, SelectInput } from "../input"
import { CancelConfirmButtons } from "../cancel-confirm"
import { toast } from "sonner"

import { useState } from "react"
import Button from "../button"
import { Send } from "lucide-react"
import Modal from "../modal"

const Roles: OptionType[] = [
    { label: "User", value: "user" },
    { label: "Moderator", value: "moderator" },
    { label: "Administrator", value: "administrator" },
]

interface FormProps {
    onClose: () => void
}

type Role = 'user' | 'moderator' | 'administrator';

const AddUserForm = ({ onClose }: FormProps) => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData | null>(null)
    const [role, setRole] = useState<Role | null>(null)

    const { data, error } = useQuery({
        queryKey: ['offices'],
        queryFn: FetchOfficeOptions
    })

    if (error) {
        toast.error(error.message)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)
        setFormData(form)
        setOpenModal(true)
    }

    const handleConfrim = async () => {
        if (!formData) return

        const result = await AddNewUser(formData)

        if (!result.status) {
            toast.error(result.message)
        }

        setOpenModal(false)
        toast.success(result.message)
    }

    return (
        <>
            <form 
                onSubmit={handleSubmit}
                className="space-y-3"
            >

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
                    onChange={(e) => setRole(e.target.value as Role)}
                />

                {(role === 'administrator' || role === 'moderator') && (
                    <SelectInput
                        label="Assigned Office"
                        name="office_assigned"
                        options={data?.data || []}
                    />
                )}
                
                <Button
                    Icon={Send}
                    label="Submit"
                    className="w-full"
                    type="submit"
                />
            </form>


            {openModal && (
                <Modal
                    header="Confirm New Profile"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <p className="text-gray-500">Confirm adding new profile?</p>
                    

                    <CancelConfirmButtons
                        onCancel={onClose}
                        onConfirm={handleConfrim}
                    />
                </Modal>
            )}
        </>
    )
}

export { AddUserForm }