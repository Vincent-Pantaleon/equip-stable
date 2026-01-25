'use client'

import { UpdateRelease } from "@/utils/server-actions/update-release";

import { Capitalize, formatCreatedAt, formatLabel } from "@/utils/handlers/capitalize";
import { formatTime } from "@/utils/handlers/format-date";
import { CancelConfirmButtons } from "../cancel-confirm";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../modal";
import { BookingModalContent } from "./booking-modal-content";

interface ReleaseModalContentProps {
  item: Release | null;
  onClose: () => void;
}

const ReleaseModalContent = ({ item, onClose }: ReleaseModalContentProps) => {
    if(!item) return;

    const [isReturned, setIsReturned] = useState<boolean>(item.is_returned)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const queryClient = useQueryClient()
    
    const handleConfirm = () => {
        setOpenModal(true)
    }

    const handleReturn = async () => {
        const result = await UpdateRelease({ is_returned: isReturned, id: item.id})

        if (!result.status) {
            toast.error(result.message)
        } else {
            queryClient.invalidateQueries({ queryKey: ['release-list'] })
            setOpenModal(false)
            onClose()
            toast.success(result.message)
        }
    }

    // TODO: DISPLAY PROPER INFORMATION FOR BETTER UNDERSTANDING
    return (
        <div className="space-y-4">
            <div className="h-[35rem] p-1 space-y-4 overflow-auto">
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-800 bg-white rounded-2xl p-4 shadow-md">
                    <h1 className="col-span-2 font-semibold">Release Information</h1>
                    
                    <div>
                        <h3 className="text-gray-500">Time Released</h3>
                        <p className="font-semibold">{formatCreatedAt(item.time_released).formatted_time}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Released By</h3>
                        <p className="font-semibold">{item.profiles ? `${item.profiles.first_name} ${item.profiles.last_name}` : 'No Name Found'}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-gray-500">Is Item Returned</h3>
                        <p className={`font-semibold ${item.is_returned ? "text-green-500" : "text-red-500"}`}>{item.is_returned ? "Yes" : "No"}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Time Returned</h3>
                        <p className="font-semibold">{item.time_returned ? formatTime(item.time_returned as string) : "Not Returned"}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Accepted By</h3>
                        <p className="font-semibold">{item.accepted_profiles ? `${item.accepted_profiles.first_name} ${item.accepted_profiles.last_name}` : "Not Returned"}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">{item.request_type === 'equipment' ? "Equipment" : "Venue"}</h3>
                        <p className="font-semibold">{item.request_type === 'equipment' ? formatLabel(item.equipment.item_name) : formatLabel(item.venue.venue_name as string)}</p>
                    </div>
                </div>

                <div className="gap-3 text-sm text-gray-800 bg-white rounded-2xl p-4 shadow-md">
                    <h1 className="mb-3 font-semibold">Booking Information</h1>
                    {/* Content */}
                    <BookingModalContent request={item.bookings} action={onClose}/>
                </div>
            </div>
            

            {!item.is_returned ? (
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="mark_return" id="mark_return" className="h-5 w-5 accent-blue-600 rounded border-gray-300 hover:cursor-pointer" onChange={(e) => setIsReturned(e.target.checked)}/>
                    <label htmlFor="mark_return" className="text-md font-medium text-gray-700 select-none">Mark Item as Returned</label>
                </div>
            ) : (
                <div>

                </div>
            )}
            
            <CancelConfirmButtons
                onCancel={onClose}
                onConfirm={handleConfirm}
            />

            <Modal
                header="Confirm Update"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                Confirm Updating release?

                <CancelConfirmButtons
                    onCancel={() => setOpenModal(false)}
                    onConfirm={handleReturn}
                />
            </Modal>

        </div>
    )
}

export { ReleaseModalContent }