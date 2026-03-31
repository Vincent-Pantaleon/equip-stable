'use client'

import { useState } from "react";
import { useInfo } from "@/utils/hooks/user-context";
import { useQueryClient } from "@tanstack/react-query";
import { formatCreatedAt, formatLabel } from "@/utils/handlers/capitalize";
import formatDate, { formatTime } from "@/utils/handlers/format-date";
import { UpdateStatus } from "@/utils/server-actions/update-booking-status";
import Button from "../button";
import Modal from "../modal";
import { toast } from "sonner";
import { SelectInput } from "../input";
import { CancelConfirmButtons } from "../cancel-confirm";
import { BookingEditForm } from "../forms/booking-edit-form";
import { SquarePen } from "lucide-react";
import { GetBorrowFormData } from "@/utils/server-actions/borrow-page-query";
import { useQuery } from "@tanstack/react-query";

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

export function BookingModalContent({ request: initialRequest, isAdmin = false, action }: ModalProps) {
    const info = useInfo();
    const isModOrAdmin = (info?.role === "administrator" || info?.role === "superadmin") && isAdmin === true;

    const [request, setRequest] = useState<AdminRequests>(initialRequest) // local copy
    const [status, setStatus] = useState<StatusType>(initialRequest.status as StatusType)
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
    const [editingField, setEditingField] = useState<keyof AdminRequests | null>(null);

    const queryClient = useQueryClient()

    const {data, error, isLoading} = useQuery({
        queryKey: ['form-options'],
        queryFn: GetBorrowFormData,
        staleTime: 60 * 1000 * 10
    })

    if (isLoading) {
        return (
            <div className="flex justify-center p-5">
                <p>Gathering Data...</p>
            </div>
        )
    }

    if (error) {
        toast.error("Error Fetching Options")
    }

    const handleEditSuccess = (updatedFields: Partial<AdminRequests>) => {
        setRequest(prev => ({ ...prev, ...updatedFields }))
        setEditingField(null)
    }

    const handleSubmit = async () => {
        const form = new FormData()
        form.append("status", status)

        const result = await UpdateStatus(request, form)

        if (result.status === false) {
            toast.error(result.message)
        } else {
            toast.success(result.message)
        }

        setOpenConfirmModal(false)
        action()
        queryClient.invalidateQueries({ queryKey: ["all-requests-data"] })
    }

    const fieldLabels: Partial<Record<keyof AdminRequests, string>> = {
        time_of_start: "Edit Time of Use",
        first_name: "Edit Filer's Name",
        equipment: "Edit Equipments",
        venue: "Edit Venues"
    };

    return (
        <div className="h-fit overflow-y-auto space-y-3">
            <div className="flex flex-col text-sm text-gray-800 space-y-3">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 overflow-auto gap-y-3">
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Filer&apos;s Name</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("first_name")}/>
                        </div>
                        
                        <p className="font-bold">{formatLabel(request.first_name)} {formatLabel(request.last_name)}</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Contact Number</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("contact_number")}/>
                        </div>
                        <p className="font-bold">{request.contact_number}</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Department</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("department")}/>
                        </div>
                        <p className="font-bold">{request.department ? formatLabel(request.department.department_name) : "No Department"}</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Designation</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("designation")}/>
                        </div>
                        <p className="font-bold">{request.designation ? formatLabel(request.designation.designation_name) : "No Designation"}</p>
                    </div>
                    {request.grade_level && (
                        <div>
                            <div className="flex gap-2">
                                <h3 className="text-gray-500">Grade Level</h3>
                                <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("grade_level")}/>
                            </div>
                            <p className="font-bold">{request.grade_level.grade_level ?? "No Grade Level"}</p>
                        </div>
                    )}
                    {request.subject && (
                        <div>
                            <div className="flex gap-2">
                                <h3 className="text-gray-500">Subject</h3>
                                <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("subject")}/>
                            </div>
                            <p className="font-bold">{request.subject ? formatLabel(request.subject.subject_name) : "No Subject"}</p>
                        </div>
                    )}
                    
                    {/* <div>
                        <h3 className="text-gray-500">Type of Request</h3>
                        <p className="font-bold">{formatLabel(request.type_of_request.type_name)}</p>
                    </div> */}

                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Date of Use</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("date_of_use")}/>
                        </div>
                        <p className="font-bold">{formatDate(request.date_of_use)}</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Time of Use</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("time_of_start")}/>
                        </div>
                        <p className="font-bold">
                            {formatTime(request.time_of_start)} - {formatTime(request.time_of_end)}
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Activity</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("purpose")}/>
                        </div>
                        <p className="font-bold">{request.purpose ? formatLabel(request.purpose.purpose_name) : "No Activity"}</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Office</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("office")}/>
                        </div>
                        <p className="font-bold">{request.office ? formatLabel(request.office.office_name) : "No Office"}</p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Location of Use</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("location_of_use")}/>
                        </div>
                        <p className="font-bold">{request.location_of_use ? formatLabel(request.location_of_use.location_name) : "No Location"}</p>
                    </div>
                    {request.place_of_use && (
                        <div>
                            <div className="flex gap-2">
                                <h3 className="text-gray-500">Class Room</h3>
                                <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("place_of_use")}/>
                            </div>
                            <p className="font-bold">{request.place_of_use ? `${formatLabel(request.place_of_use.room)} ${formatLabel(request.place_of_use.number)}` : "No Room"}</p>
                        </div>
                    )}  
                    <div>
                       <div className="flex gap-2">
                            <h3 className="text-gray-500">Equipments</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("equipment")}/>
                        </div>
                        {(request.equipment && request.equipment.length > 0) ? (
                            <div>
                                {request.equipment.map((item, index) => (
                                    <p className="font-bold" key={index}>{formatLabel(item.type_name)}</p>
                                ))}
                            </div>
                        ) : (
                            <div className="font-bold">
                                No Equipments
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <h3 className="text-gray-500">Venues</h3>
                            <SquarePen className="w-4 h-4 hover:cursor-pointer" onClick={() => setEditingField("venue")}/>
                        </div>
                        <div>
                            {request.venue && request.venue.length > 0 ? (
                                request.venue.map((item, index) => (
                                <p className="font-bold" key={index}>{formatLabel(item.venue_name)}</p>
                                ))
                            ) : (
                                <p className="font-bold">No Venues</p>
                            )}
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
                        <div>
                            <SelectInput
                                label="Status"
                                name="status"
                                options={StatusOptions}
                                defaultValue={request.status}
                                onChange={(e) => setStatus(e.target.value as StatusType)}
                            />
                        </div>
                        

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

            {editingField !== null && (
                <Modal
                    header={fieldLabels[editingField!] || `Edit ${formatLabel(editingField!)}`}
                    isOpen={editingField !== null}
                    onClose={() => setEditingField(null)}
                >
                    <BookingEditForm field={editingField} request={request} onClose={() => setEditingField(null)} formData={data} onSuccess={handleEditSuccess}/>                    
                </Modal>
            )}

            {openConfirmModal && (
                <Modal
                    header="Confirm Status Update"
                    isOpen={openConfirmModal}
                    onClose={() => setOpenConfirmModal(false)}
                >
                    Please confirm status update

                    <CancelConfirmButtons
                        onCancel={() => setOpenConfirmModal(false)}
                        onConfirm={handleSubmit}
                    />
                </Modal>
            )}
        </div>
    );
}