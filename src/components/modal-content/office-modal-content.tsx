'use client'

import { formatCreatedAt, formatLabel } from "@/utils/handlers/capitalize"
import { Input, SelectInput } from "../input";

import { useQuery } from "@tanstack/react-query";
import { GetAdministratorsList } from "@/utils/server-actions/profile-query";
import { toast } from "sonner";
import { CancelConfirmButtons } from "../cancel-confirm";
import { useState } from "react";
import Modal from "../modal";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateOffice } from "@/utils/server-actions/update-office";
import { ArrayItem } from "../array-item";

interface FormProps {
    item: Office | null
    onClose: () => void
} 

type Assigned_to = {
    id: string;
    name: string;
}[]


const UpdateOfficeForm = ({ item, onClose }: FormProps) => {
    if (!item) return;

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [profileList, setProfileList] = useState<Assigned_to | null>(item.assigned_to)

    const queryClient = useQueryClient()

    const { data, error } = useQuery({
        queryKey: ['administrator-list'],
        queryFn: GetAdministratorsList,
        staleTime: 1000 * 60 * 5
    })

    if(error) {
        toast.error(error.message)
    }

    const handleItemDelete = (id: string) => {
        setProfileList(prev => prev?.filter(p => p.id !== id) ?? null)
    }

    const handleAddProfile = (value: { id: string; name: string }) => {
        setProfileList(prev => {
            if (prev?.some(p => p.id === value.id)) return prev // avoid duplicates
            return [...(prev ?? []), value]
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpenModal(true)
    }
    
    const handleConfirm = async () => {
        const form = document.querySelector("form") as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);

        const result = await UpdateOffice(formData, item.id, profileList ?? [])

        if (!result.status) {
            toast.error(result.message)
        } else {
            toast.success(result.message)
            queryClient.invalidateQueries({queryKey: ['office-list']})
        }
        
        onClose()
        setOpenModal(false)
    }
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6 text-sm text-gray-800 bg-white rounded-2xl p-6 shadow-sm">
                <div>
                    <h3 className="text-gray-500">ID</h3>
                    <p className="font-semibold">{item.id}</p>
                </div>
                <div>
                    <h3 className="text-gray-500">Created At</h3>
                    <p className="font-semibold">
                        {formatCreatedAt(item.created_at).formatted_date}
                    </p>
                    <p className="font-semibold">
                        {formatCreatedAt(item.created_at).formatted_time}
                    </p>
                </div>
            </div>

            <form
                className="space-y-2"
                onSubmit={handleSubmit}
            >
                <Input
                    id="office_name"
                    label="Office"
                    name="office_name"
                    type="text"
                    defaultValue={formatLabel(item.name)}
                />

                <div className="space-y-1"> 
                    <SelectInput
                        label="Employees In Charge"
                        name="in_charge"
                        options={data?.data || []}
                        onChange={(e) => {
                            const option = (data?.data as OptionType[])?.find(o => o.value === e.target.value)
                            if (option) handleAddProfile({ id: option.value, name: option.label })
                        }}
                    />

                    <div className='flex flex-wrap gap-1'>
                        {profileList?.map((item) => (
                            <ArrayItem key={item.id} name={item.name} onDelete={() => handleItemDelete(item.id)}/>
                        ))}
                    </div>
                                        
                </div>

                <CancelConfirmButtons
                    onCancel={onClose}
                    onConfirm={() => {}}
                />
            </form>

            <Modal
                header="Confirm Office Update"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div className="mb-4">
                    Are you sure you want to update this office with id <span className="font-semibold">{item.id}</span>
                </div>
                

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={handleConfirm}
                />
            </Modal>
        </div>
        
    )
}

export { UpdateOfficeForm } 