'use client'

import { formatCreatedAt } from "@/utils/handlers/capitalize"
import { Input, SelectInput } from "../input"
import { CancelConfirmButtons } from "../cancel-confirm"
import { useState } from "react"
import Modal from "../modal"
import { toast } from "sonner"
import { UpdateVenue, UpdateVenueType } from "@/utils/server-actions/update-venue"
import { useQueryClient } from "@tanstack/react-query"

interface VenueFormProps {
    item: Venues
    onClose: () => void
}

const StatusOptions = [
    { label: "Available", value: "available" },
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "In Use", value: "in_use" },
    { label: "Maintenance", value: "maintenance" },

]

const VenueUpdateForm = ({ item, onClose }: VenueFormProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const handleSubmit = () => {
        setOpenModal(true);
    };

    const handleConfirm = async () => {
        const form = document.querySelector("form") as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);

        const result = await UpdateVenue(formData, item.id)

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
                <div>
                    <h3 className="text-gray-500">Venue Type</h3>
                    <p className="font-semibold">{item.type.name}</p>
                </div>
            </div>

            <form className="rounded-2xl p-6 shadow-sm space-y-2 text-black">
                <Input
                    id="reference"
                    label="Reference"
                    name="reference"
                    type="text"
                    defaultValue={item.reference}
                />
                <SelectInput 
                    label="Status"
                    name="status"
                    options={StatusOptions || []}
                    defaultValue={item.status}
                />
            </form>

            <CancelConfirmButtons 
                onCancel={onClose}
                onConfirm={handleSubmit}
            />

            {openModal && (
                <Modal
                    header="Confirm Update Venue"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    Confirm Update on venue with id {item.id}

                    <CancelConfirmButtons
                        onCancel={() => setOpenModal(false)}
                        onConfirm={handleConfirm}
                    />
                </Modal>
            )}
        </div>
    )
}

interface VenueTypeFormProps {
    item: VenuesType
    onClose: () => void
}

const IsPublicOptions = [
    { label: "Yes", value: 'true' },
    { label: "No", value: 'false' }
]

const VenueTypeUpdateForm = ({ item, onClose }: VenueTypeFormProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const queryClient = useQueryClient()


    const handleSubmit = () => {
        setOpenModal(true)
    }

    const handleConfirm = async () => {
        const form = document.querySelector("form") as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);

        const result = await UpdateVenueType(formData, item.id)

        if (!result.status) {
            toast.error(result.message)
        }
        
        toast.success(result.message)
        queryClient.invalidateQueries({queryKey: ['venues-type-data']})
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
                className="rounded-2xl p-6 shadow-sm space-y-2 text-black"
            >
                <Input
                    id="name"
                    label="Venue Name"
                    name="name"
                    type="text"
                    defaultValue={item.name}
                />
                <Input
                    id="total_count"
                    label="Total Count"
                    name="total_count"
                    type="number"
                    defaultValue={item.total_count}
                />
                <Input
                    id="total_capacity"
                    label="Total Capacity"
                    name="total_capacity"
                    type="number"
                    defaultValue={item.total_capacity ?? "N/A"}
                />
                <SelectInput
                    label="Public"
                    name="is_public"
                    options={IsPublicOptions || []}
                    defaultValue={item.is_public ? "true" : "false"}
                />
            </form>

            <CancelConfirmButtons
                onCancel={onClose}
                onConfirm={handleSubmit}
            />

            {openModal && (
                <Modal
                    header="Confirm Venue Type Update"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    Confirm venue type update with id {item.id}

                    <CancelConfirmButtons
                        onCancel={() => setOpenModal(false)}
                        onConfirm={handleConfirm}
                    />
                </Modal>
            )}
        </div>
    )
}

export { VenueUpdateForm, VenueTypeUpdateForm }