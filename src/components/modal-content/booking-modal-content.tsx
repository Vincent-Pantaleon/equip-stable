'use client'

import { useState } from "react";
import { useInfo } from "@/utils/hooks/user-context";
import { useQueryClient } from "@tanstack/react-query";
import { Capitalize, formatCreatedAt, formatLabel } from "@/utils/handlers/capitalize";
import formatDate, { formatTime } from "@/utils/handlers/format-date";
import { UpdateStatus } from "@/utils/server-actions/update-booking-status";
import Button from "../button";
import Modal from "../modal";
import { toast } from "sonner";
import { SelectInput } from "../input";
import { CancelConfirmButtons } from "../cancel-confirm";
import { Pencil } from "lucide-react";

const StatusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Declined", value: "declined" },
    { label: "Completed", value: "completed" }
]

type StatusType = "pending" | "approved" | "declined" | "completed";

interface ModalProps {
    request: AdminRequests
    isAdmin?: boolean
    action: () => void
}

export function BookingModalContent({ request, isAdmin = false, action }: ModalProps) {
    const info = useInfo();
    const isModOrAdmin = (info?.role === "administrator" || info?.role === "superadmin") && isAdmin === true;

    const [status, setStatus] = useState<StatusType>(request.status as StatusType)
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
        <div className="h-fit overflow-y-auto ">
            {/* <div className="flex justify-end">
                <Button
                    Icon={Pencil}
                />
            </div> */}

            <div className="flex flex-col text-sm text-gray-800">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-auto">
                    <div>
                        <h3 className="text-gray-500">Filer&apos;s Name</h3>
                        <p className="font-bold">{formatLabel(request.first_name)} {formatLabel(request.last_name)}</p>
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
                        <p className="font-bold">{formatLabel(request.designation)}</p>
                    </div>
                    {request.grade_level && (
                        <div>
                            <h3 className="text-gray-500">Grade Level</h3>
                            <p className="font-bold">{request.grade_level ?? "No Grade Level"}</p>
                        </div>
                    )}
                    {request.subject && (
                        <div>
                            <h3 className="text-gray-500">Subject</h3>
                            <p className="font-bold">{formatLabel(request.subject)}</p>
                        </div>
                    )}
                    
                    {/* <div>
                        <h3 className="text-gray-500">Type of Request</h3>
                        <p className="font-bold">{formatLabel(request.type_of_request.type_name)}</p>
                    </div> */}

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
                        <p className="font-bold">{formatLabel(request.purpose)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Office</h3>
                        <p className="font-bold">{request.office ? formatLabel(request.office) : "No Office"}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Location of Use</h3>
                        <p className="font-bold">{formatLabel(request.location_of_use)}</p>
                    </div>
                    {request.place_of_use && (
                        <div>
                            <h3 className="text-gray-500">Room</h3>
                            <p className="font-bold">{formatLabel(request.place_of_use.room)} {formatLabel(request.place_of_use.number)}</p>
                        </div>
                    )}  
                    <div>
                        <h3 className="text-gray-500">Equipment</h3>
                        <div>
                            {request.equipment.map((item, index) => (
                                <p className="font-bold" key={index}>{formatLabel(item.type_name)}</p>
                            ))}
                        </div>
                        
                    </div>
                    <div>
                        <h3 className="text-gray-500">Venue</h3>
                        <div>
                            {request.venue.map((item, index) => (
                                <p className="font-bold" key={index}>{formatLabel(item.venue_name)}</p>
                            ))}
                        </div>
                        
                    </div>
                    <div>
                        <h3 className="text-gray-500">Created At</h3>
                        <p className="font-bold">{formatCreatedAt(request.created_at).formatted_date}</p>
                        <p className="font-bold">{formatCreatedAt(request.created_at).formatted_time}</p>
                    </div>
                </div>
                {/* Status Section */}

                <div className="border rounded-2xl p-3 bg-slate-100 flex justify-between items-center">
                    
                    {isModOrAdmin ? (
                    <>
                        <SelectInput
                            label="Status"
                            name="status"
                            options={StatusOptions}
                            defaultValue={status}
                            onChange={(e) => setStatus(e.target.value as StatusType)}
                        />

                        <Button
                            label="Update Status"
                            className="w-fit px-4"
                            onClick={() => setOpenConfirmModal(true)}
                        />
                    </>
                    ) : (
                        <p className="font-bold">{formatLabel(request.status)}</p>
                    )}
                </div>

            </div>

            {openConfirmModal && (
                <Modal
                    header="Confirm Status Update"
                    isOpen={openConfirmModal}
                    onClose={() => setOpenConfirmModal(false)}
                >
                    Please confirm status update

                    <CancelConfirmButtons
                        onCancel={() => setOpenConfirmModal(false)}
                        onConfirm={() => handleSubmit(request.id, status)}
                    />
                </Modal>
            )}
        </div>
    );
}