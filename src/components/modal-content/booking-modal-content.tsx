'use client'

import { useState } from "react";
import { useInfo } from "@/utils/hooks/user-context";
import { useQueryClient } from "@tanstack/react-query";

import { Capitalize, CapitalizeAll, formatCreatedAt, formatLabel } from "@/utils/handlers/capitalize";
import formatDate, { formatTime } from "@/utils/handlers/format-date";

import { UpdateStatus } from "@/utils/server-actions/update-booking-status";

import Button from "../button";
import Modal from "../modal";
import { toast } from "sonner";
import { SelectInput } from "../input";

const StatusOptions = [
    { label: "Approved", value: "approved" },
    { label: "Declined", value: "declined" },
]

interface ModalProps {
    request: Requests
    isAdmin?: boolean
    action: () => void
}

export function BookingModalContent({ request, isAdmin = false, action }: ModalProps) {
    const info = useInfo();
    const isModOrAdmin = (info?.role === "administrator" || info?.role === "superadmin") && isAdmin === true;

    const [status, setStatus] = useState<string>(request.status)
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)

    const queryClient = useQueryClient()

    const handleSubmit = async (id: string, status: string) => {
        const result = await UpdateStatus(id, status)

        if (result.status === false) {
            toast.error(result.message)
        }

        setOpenConfirmModal(false)
        action()
        queryClient.invalidateQueries({ queryKey: ["all-requests-data"] });
        toast.success(result.message)
        return
    }

    return (
        <div className="max-h-[70vh] overflow-y-auto pr-2">
            <div className="flex flex-col gap-6 text-sm text-gray-800">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-auto">
                    <div>
                        <h3 className="text-gray-500">Booking ID</h3>
                        <p className="font-bold">{request.id}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Filer&apos;s Name</h3>
                        <p className="font-bold">{Capitalize(request.first_name)} {Capitalize(request.last_name)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Contact Number</h3>
                        <p className="font-bold">{request.contact_number}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Department</h3>
                        <p className="font-bold">{formatLabel(request.department)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Designation</h3>
                        <p className="font-bold">{Capitalize(request.designation)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Grade Level</h3>
                        <p className="font-bold">{formatLabel(request.grade_level)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Subject</h3>
                        <p className="font-bold">{formatLabel(request.subject)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Type of Request</h3>
                        <p className="font-bold">{formatLabel(request.type_of_request)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Date of Use</h3>
                        <p className="font-bold">{formatDate(request.date_of_use)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Time of Use</h3>
                        <p className="font-bold">
                            {formatTime(request.time_of_start)} - {formatTime(request.time_of_end)}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Purpose</h3>
                        <p className="font-bold">{Capitalize(request.purpose)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Office</h3>
                        <p className="font-bold">{request.office ? formatLabel(request.office) : "No Office"}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Location of Use</h3>
                        <p className="font-bold">{formatLabel(request.location_of_use)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Place of Use</h3>
                        <p className="font-bold">{formatLabel(request.place_of_use)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">{request.type_of_request === 'equipment' ? "Equipment" : "Venue"}</h3>
                        <p className="font-bold">{request.type_of_request === 'equipment' ? formatLabel(request.equipment as string) : formatLabel(request.venue as string) }</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Created At</h3>
                        <p className="font-bold">{formatCreatedAt(request.created_at).formatted_date}</p>
                        <p className="font-bold">{formatCreatedAt(request.created_at).formatted_time}</p>
                    </div>
                </div>
                {/* Status Section */}
                <div>
                    <div className="border rounded-2xl p-3 bg-slate-100 flex justify-between items-center">
                        
                        {isModOrAdmin ? (
                        <>
                            <SelectInput
                                label="Status"
                                name="status"
                                options={StatusOptions}
                                defaultValue={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />

                            <Button
                                label="Update Status"
                                className="w-fit px-4"
                                onClick={() => setOpenConfirmModal(true)}
                            />
                        </>
                        ) : (
                            <p className="font-bold">{Capitalize(request.status)}</p>
                        )}
                    </div>
                </div>
            </div>

            {openConfirmModal && (
                <Modal
                    header="Confirm Status Update"
                    isOpen={openConfirmModal}
                    onClose={() => setOpenConfirmModal(false)}
                >
                    Please confirm status update

                    <div className="text-black flex justify-end gap-2">
                        <Button
                            label="Cancel"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={() => setOpenConfirmModal(false)}
                        />
                        <Button
                            label="Confirm"
                            className="px-4 py-2"
                            onClick={() => handleSubmit(request.id, status)}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}