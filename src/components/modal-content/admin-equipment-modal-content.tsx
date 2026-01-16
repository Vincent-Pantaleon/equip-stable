'use client'

import { useState } from "react";

import formatDate from "@/utils/handlers/format-date";
import { SelectInput, Input } from "../input"
import { Capitalize, formatCreatedAt, formatLabel } from "@/utils/handlers/capitalize"
import Modal from "../modal";
import { EditEquipmentInformation } from "@/utils/server-actions/update-equipment";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CancelConfirmButtons } from "../cancel-confirm";
import { UpdateEquipmentTypeItem } from "@/utils/server-actions/update-equipment-type";

type EquipmentUpdateFormProps = {
  equipment: Equipments;
  onClose: () => void;
};

interface EquipmentTypeUpdateFormProps {
    equipmentType: EquipmentTypeType
    onClose: () => void
}

const StatusOptions = [
    { label: "Stored", value: "stored" },
    { label: "Out", value: "out" },
    { label: "Returned", value: "returned" },
    { label: "Maintenance", value: "maintenance" }
]

const IsPublicOptions = [
    { label: "Yes", value: 'true' },
    { label: "No", value: 'false' }
]

const EquipmentUpdateForm = ({ equipment, onClose }: EquipmentUpdateFormProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpenModal(true)
    }

    const handleConfirm = async (equipment: Equipments) => {
        const form = document.querySelector("form") as HTMLFormElement
        if (!form) return

        const formData = new FormData(form)

        const result = await EditEquipmentInformation(formData, equipment)

        if (!result.status) {
            toast.error(result.message)
        } else {
            toast.success(result.message)
            queryClient.invalidateQueries({ queryKey: ['equipment-data'] })
        }

        onClose()
        setOpenModal(false)
    }
    
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Equipment Info */}
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-800 bg-white rounded-2xl p-6 shadow-sm">
            <div>
                <h3 className="text-gray-500">ID</h3>
                <p className="font-semibold">{equipment.id}</p>
            </div>

            <div>
                <h3 className="text-gray-500">Created At</h3>
                <p className="font-semibold">
                    {formatCreatedAt(equipment.created_at).formatted_date}
                </p>
                <p className="font-semibold">
                    {formatCreatedAt(equipment.created_at).formatted_time}
                </p>
            </div>

            <div>
                <h3 className="text-gray-500">Equipment Type</h3>
                <p className="font-semibold">{Capitalize(equipment.type.type_name)}</p>
            </div>

            <div>
                <h3 className="text-gray-500">Date Acquired</h3>
                <p className="font-semibold">
                    {formatDate(equipment.date_acquired as string)}
                </p>
            </div>
        </div>

        {/* Editable Fields */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-black">            
            <div className="grid grid-cols-2 gap-4">
                <Input
                    id="item_name"
                    label="Item Name"
                    name="item_name"
                    type="text"
                    defaultValue={formatLabel(equipment.item_name as string)}
                    placeholder={formatLabel(equipment.item_name as string)}
                />
                <Input
                    id="reference"
                    label="Reference"
                    name="reference"
                    type="text"
                    defaultValue={equipment.reference_number as string}
                    placeholder={equipment.reference_number}
                />
                <Input
                    id="code"
                    label="Code"
                    name="code"
                    type="text"
                    defaultValue={equipment.property_code as string}
                    placeholder={equipment.property_code as string}
                />
                <Input
                    id="serial_number"
                    label="Serial Number"
                    name="serial_number"
                    type="text"
                    defaultValue={equipment.serial_number as string}
                    placeholder={equipment.serial_number as string}
                />

                <SelectInput
                    label="Status"
                    name="status"
                    options={StatusOptions}
                    defaultValue={equipment.status}
                    onChange={(e) => e.target.value}
                />
            </div>
        </div>

        {/* Buttons */}
            <div className="flex justify-end gap-3">
                <CancelConfirmButtons
                    onCancel={onClose}
                    onConfirm={() => setOpenModal(true)}
                />
            </div>

            {openModal && (
                <Modal
                    header="Confirm Update"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    Confirm Update on equipment with id {equipment.id}

                    <div className="flex justify-end gap-3">
                        <CancelConfirmButtons
                            onCancel={() => setOpenModal(false)}
                            onConfirm={() => handleConfirm(equipment)}
                        />
                    </div>
                </Modal>
            )}
        </form>
    )
}

const EquipmentTypeUpdateForm = ({equipmentType, onClose}: EquipmentTypeUpdateFormProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const booleanValue = equipmentType.is_public ? "true" : "false"

    const queryClient = useQueryClient()

    const handleConfirm = async (item: EquipmentTypeType) => {
        const form = document.querySelector("form") as HTMLFormElement
        if (!form) return

        const formData = new FormData(form)

        const result = await UpdateEquipmentTypeItem(formData, item)

        if (!result.status) {
            toast.error(result.message)
        } else {
            toast.success(result.message)
            queryClient.invalidateQueries({ queryKey: ['equipment-type-data'] })
        }

        onClose()
        setOpenModal(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpenModal(true)
    }

    return (
        <form 
            className="space-y-6"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-2 gap-6 text-sm text-gray-800 bg-white rounded-2xl p-6 shadow-sm">
                <div>
                    <h3 className="text-gray-500">ID</h3>
                    <p className="font-semibold">{equipmentType.id}</p>
                </div>

                <div>
                    <h3 className="text-gray-500">Created At</h3>
                    <p className="font-semibold">
                        {formatCreatedAt(equipmentType.created_at).formatted_date}
                    </p>
                    <p className="font-semibold">
                        {formatCreatedAt(equipmentType.created_at).formatted_time}
                    </p>
                </div>

                <div>
                    <h3 className="text-gray-500">Office</h3>
                    <p className="font-semibold">{equipmentType.office.id ?? "No Office Assigned"}</p>
                </div>

            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-2 text-black">
                <Input
                    id="type"
                    label="Type"
                    name="type"
                    type="text"
                    defaultValue={Capitalize(String(equipmentType.type_name))}
                />
                <SelectInput
                    label="Public"
                    name="is_public"
                    options={IsPublicOptions}
                    defaultValue={equipmentType.is_public ? "true" : "false"}
                />
            </div>
            
            <CancelConfirmButtons
                onCancel={onClose}
                onConfirm={() => setOpenModal(true)}
            />

            {openModal && (
                <Modal
                    header="Update Equipment Type"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    Confirm update on equipment modal with id {equipmentType.id}

                    <CancelConfirmButtons
                        onCancel={() => setOpenModal(false)}
                        onConfirm={() => handleConfirm(equipmentType)}
                    />
                </Modal>
            )}
        </form>
    )
}

export { EquipmentUpdateForm, EquipmentTypeUpdateForm }