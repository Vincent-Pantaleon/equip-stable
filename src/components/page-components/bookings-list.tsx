'use client'

import { useQuery } from "@tanstack/react-query"
import { GetAdminRequestData, GetRecentRequestData } from "@/utils/server-actions/request-query"
import { useMemo, useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { BookingDataTable } from "../tables/booking-table"
import { allRequestColumns } from "@/utils/table-columns/all-bookings-columns"
import { DeleteBooking } from "@/utils/server-actions/delete-booking"
import { useInfo } from "@/utils/hooks/user-context"

import Modal from "../modal"
import { toast } from "sonner"
import { BookingModalContent } from "../modal-content/booking-modal-content"
import Button from "../button"
import { TableLoadingSkeleton } from "../loading-skeletons/table-loading"
import { Skeleton } from "../ui/skeleton"

import { getStatusStyles } from "@/utils/table-columns/booking-columns"
import { 
    CardContent,
    CardContainer,
    CardDescription,
    CardWrapper
} from "../card"

type StatusCount = {
    total: number;
    pending: number;
    approved: number;
    declined: number;
    completed: number;
};

const BookingsList = () => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [selectedRequest, setSelectedRequest] = useState<Requests | null>(null)
    const [statusCount, setStatusCount] = useState<StatusCount>({
        total: 0,
        pending: 0,
        approved: 0,
        declined: 0,
        completed: 0,
    });

    const queryClient = useQueryClient()
    const user = useInfo()

    const { data: requestData, error: requestError, isPending: requestPending } = useQuery({
        queryKey: ['all-requests-data'],
        queryFn: GetAdminRequestData,
        staleTime: 1000 * 60 * 5,
    })

    if (requestError) {
        toast.error("Error fetching data")
    }
    
    const DeleteRow = (request: Requests) => {
        setSelectedRequest(request)
        setOpenDeleteModal(true)
    }

    const UpdateRow = (request: Requests) => {
        setSelectedRequest(request)
        setOpenEditModal(true)
    }

    const memoizedColumns = useMemo(() => allRequestColumns({ onUpdate: UpdateRow, onDelete: DeleteRow }), [])

    useEffect(() => {
        if (!requestData) return;

        const newCounts: StatusCount = {
            total: requestData.requestData.length,
            pending: 0,
            approved: 0,
            declined: 0,
            completed: 0,
        };

        requestData.requestData.forEach((req) => {
            if (req.status in newCounts) {
            newCounts[req.status as keyof StatusCount] += 1;
            }
        });

        setStatusCount(newCounts);
    }, [requestData]);

    const handleDelete = async (id: string) => {

        const result = await DeleteBooking(id)

        if (result.status === false) {
            toast.error(result.message)
        }

        queryClient.invalidateQueries({ queryKey: ["all-requests-data"] })

        setOpenDeleteModal(false)
        toast.success("Booking deleted successfully")
    }

    return (
        <div className="flex flex-col h-full">
            <div className="col-span-2 my-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Bookings list</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Manage bookings
                </p>
            </div>

            {/* Statistics type shi */}
            <CardWrapper>
                {Object.entries(statusCount).map(([status, count], index) => (
                    requestPending ? (
                        <Skeleton key={index} className="h-20 flex-1"/>
                    ) : (
                        <CardContainer key={index}>
                            <CardContent>
                                <p className="text-2xl font-bold text-center">{count as number}</p>
                            </CardContent>
                            <CardDescription>
                                <h3 className={`text-sm  text-center px-1 rounded-xl capitalize ${getStatusStyles(status)}`}>{status === 'total' ? 'Total no. of bookings' : status}</h3>
                            </CardDescription>
                        </CardContainer>
                    )
                ))}
            </CardWrapper>
            
            <div className="grow">
                {requestPending ? (
                    <div className="p-2">
                        <TableLoadingSkeleton/>
                    </div>
                ) : (
                    <BookingDataTable
                        columns={memoizedColumns}
                        data={requestData?.requestData || []}
                        pageSize={10}
                        offices={requestData?.officeData || []}
                        role={user?.role ?? ""}
                    />
                )}
            </div>
            

                <Modal
                    onClose={() => {setOpenEditModal(false), setSelectedRequest(null)}}
                    header="Update Booking"
                    isOpen={openEditModal}
                >
                    <BookingModalContent request={selectedRequest as Requests} isAdmin={true} action={() => setOpenEditModal(false)}/>
                </Modal>


                <Modal
                    header="Delete Booking"
                    isOpen={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                >
                    Are you sure you want to delete this booking?
                    <div className="text-black flex justify-end gap-2">
                        <Button
                            label="Cancel"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={() => setOpenDeleteModal(false)}
                        />
                        <Button
                            label="Confirm"
                            className="px-4 py-2"
                            onClick={() => selectedRequest && handleDelete(selectedRequest.id)}
                        />
                    </div>
                </Modal>
        </div>
        
    )
}

export { BookingsList }