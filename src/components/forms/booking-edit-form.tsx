'use client'

import { FIELD_MAP } from "../request-field"
import { CancelConfirmButtons } from "../cancel-confirm"
import { useRef, useState } from "react"
import Modal from "../modal"
import { UpdateStatus } from "@/utils/server-actions/update-booking-status"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface FormProps {
    field: keyof AdminRequests | null
    request: AdminRequests
    onClose: () => void
    formData: any
    onSuccess: (updatedFields: Partial<AdminRequests>) => void
}

const BookingEditForm = ({ field, request, onClose, formData, onSuccess }: FormProps) => {
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)
    const queryClient = useQueryClient()

    const renderField = FIELD_MAP[field as keyof AdminRequests]

    if (!renderField) {
        return <p className="text-sm text-gray-500">Field not editable.</p>;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpenConfirmModal(true)
    }

    const handleConfirm = async () => {
        if (!formRef.current) return

        const form = new FormData(formRef.current)
        const result = await UpdateStatus(request, form)

        if (result.status === false) {
            toast.error(result.message)
            setOpenConfirmModal(false)
            return
        }

        toast.success(result.message)
        setOpenConfirmModal(false)
        queryClient.invalidateQueries({ queryKey: ["all-requests-data"] })

        const updatedFields: Partial<AdminRequests> = {
            first_name: form.get("fname") as string || request.first_name,
            last_name: form.get("lname") as string || request.last_name,
            contact_number: form.get("contact_number") as string || request.contact_number,
            date_of_use: form.get("date_of_use") as string || request.date_of_use,
            time_of_start: form.get("time_of_start") as string || request.time_of_start,
            time_of_end: form.get("time_of_end") as string || request.time_of_end,
        }

        const designationId = form.get("designation") as string
        if (designationId) {
            const match = formData?.designation?.find((d: OptionType) => d.value === designationId)
            if (match) updatedFields.designation = { id: match.value, designation_name: match.label }
        }

        const departmentId = form.get("department") as string
        if (departmentId) {
            const match = formData?.department?.find((d: OptionType) => d.value === departmentId)
            if (match) updatedFields.department = { id: match.value, department_name: match.label }
        }

        const gradeLevelId = form.get("level") as string
        if (gradeLevelId) {
            const match = formData?.gradeLevel?.find((d: OptionType) => d.value === gradeLevelId)
            if (match) updatedFields.grade_level = { id: match.value, grade_level: match.label }
        }

        const purposeId = form.get("purpose") as string
        if (purposeId) {
            const match = formData?.purpose?.find((d: OptionType) => d.value === purposeId)
            if (match) updatedFields.purpose = { id: match.value, purpose_name: match.label }
        }

        const locationId = form.get("location_of_use") as string
        if (locationId) {
            const match = formData?.locationOfUse?.find((d: OptionType) => d.value === locationId)
            if (match) updatedFields.location_of_use = { id: match.value, location_name: match.label }
        }

        const placeOfUseId = form.get("room") as string
        if (placeOfUseId) {
            const match = formData?.placeOfUse?.find((d: OptionType) => d.value === placeOfUseId)
            if (match) updatedFields.place_of_use = { id: match.value, room: match.label, number: "" }
        }

        const subjectId = form.get("subject") as string
        if (subjectId) {
            const match = formData?.subject?.find((d: OptionType) => d.value === subjectId)
            if (match) updatedFields.subject = { id: match.value, subject_name: match.label }
        }

        const officeId = form.get("office") as string
        if (officeId) {
            const match = formData?.office?.find((d: OptionType) => d.value === officeId)
            if (match) updatedFields.office = { id: match.value, office_name: match.label }
        }

        const venueIds = form.getAll("venue_ids") as string[]
        if (form.get("venue_field_present")) {
            updatedFields.venue = venueIds.map(id => {
                const match = formData?.venue?.find((d: OptionType) => d.value === id)
                return { id, venue_name: match?.label ?? id }
            })
        }

        const equipmentIds = form.getAll("equipment_ids") as string[]
        if (form.get("equipment_field_present")) {
            updatedFields.equipment = equipmentIds.map(id => {
                const match = formData?.equipment?.find((d: OptionType) => d.value === id)
                return { id, type_name: match?.label ?? id }
            })
        }

        onClose()
        onSuccess(updatedFields)
    }

    return (
        <>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                {renderField(request, formData)}

                <CancelConfirmButtons
                    onCancel={onClose}
                    onConfirm={() => formRef.current?.requestSubmit()}
                />
            </form>

            <Modal
                header="Confirm Edit"
                isOpen={openConfirmModal}
                onClose={() => setOpenConfirmModal(false)}
            >
                <p className="text-sm text-gray-600 mb-4">Are you sure you want to save these changes?</p>

                <CancelConfirmButtons
                    onCancel={() => setOpenConfirmModal(false)}
                    onConfirm={handleConfirm}
                />
            </Modal>
        </>
    )
}

export { BookingEditForm }