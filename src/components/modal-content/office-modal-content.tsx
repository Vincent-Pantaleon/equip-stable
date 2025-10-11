'use client'

import { formatCreatedAt } from "@/utils/handlers/capitalize"
import { Input, SelectInput } from "../input";

import { useQuery } from "@tanstack/react-query";
import { GetAdministratorsList } from "@/utils/server-actions/profile-query";
import { toast } from "sonner";
import { CancelConfirmButtons } from "../cancel-confirm";
import { useState } from "react";
import Modal from "../modal";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateOffice } from "@/utils/server-actions/update-office";

interface FormProps {
    item: Office | null
    onClose: () => void
} 

const UpdateOfficeForm = ({ item, onClose }: FormProps) => {
    if (!item) return;

    const [openModal, setOpenModal] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const { data, error } = useQuery({
        queryKey: ['administrator-list'],
        queryFn: GetAdministratorsList,
        staleTime: 1000 * 60 * 5
    })

    console.log(data?.data)

    if(error) {
        toast.error(error.message)
    }

    const handleSubmit = () => {
        setOpenModal(true)
    }

    const handleConfirm = async () => {
        const form = document.querySelector("form") as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);

        const result = await UpdateOffice(formData, item.id)

        if (!result.status) {
            toast.error(result.message)
        }
        
        toast.success(result.message)
        queryClient.invalidateQueries({queryKey: ['venues-data']})
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
            >
                <Input
                    id="office_name"
                    label="Office"
                    name="office_name"
                    type="text"
                    defaultValue={item.office}
                />

                <SelectInput
                    label="Employee In Charge"
                    name="in_charge"
                    options={data?.data || []}
                    defaultValue={item.in_charge.id}
                />
            </form>

            <CancelConfirmButtons
                onCancel={onClose}
                onConfirm={handleSubmit}
            />

            <Modal
                header="Confirm Office Update"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                Are you sure you want to update this office with id <span className="font-semibold">{item.id}</span>

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={handleConfirm}
                />
            </Modal>
        </div>
        
    )
}

export { UpdateOfficeForm } 