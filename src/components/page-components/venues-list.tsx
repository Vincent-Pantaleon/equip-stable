'use client'

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { VenuesDataTable } from "../tables/venues-table"
import { venuesColumns, venueTypesColumns } from "@/utils/table-columns/venues-columns"

import { GetAdminVenues, GetAdminTypeVenues } from "@/utils/server-actions/fetch-venues"

import { Skeleton } from "../ui/skeleton"
import { TableLoadingSkeleton } from "../loading-skeletons/table-loading"
import { toast } from "sonner"
import { CancelConfirmButtons } from "../cancel-confirm"
import Modal from "../modal"

import { VenueTypeUpdateForm, VenueUpdateForm } from "../modal-content/admin-venues-modal-content"
import { DeleteVenue, DeleteVenueType } from "@/utils/server-actions/delete-venue"
import { useQueryClient } from "@tanstack/react-query"

import { CardContainer, CardContent, CardDescription, CardWrapper } from "../card"
import { formatLabel } from "@/utils/handlers/capitalize"

type VenueStatusCount = {
    total: number
    open: number
    closed: number
    in_use: number
    available: number
    maintenance: number
}

type TypeStatusCount = {
    total: number
    public: number
}

const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
        case "returned":
            return "bg-yellow-100 text-yellow-800";
        case "available":
            return "bg-green-100 text-green-800";
        case "closed":
            return "bg-red-100 text-red-800";
        case "maintenance":
            return "bg-gray-200 text-gray-700";
        case "in_use":
            return "bg-blue-100 text-blue-700";
        case "open": 
            return "bg-green-300 text-green-700"
        default:
            return "bg-gray-200 text-gray-700";
  }
}

const VenuesList = () => {
    // States
    const [tableType, setTableType] = useState< "venues" | "types" >('venues')
    const [action, setAction] = useState<"venue-update" | "venue-delete" | "type-update" | "type-delete" | null>(null)
    const [selectedItem, setSelectedItem] = useState<Venues | VenuesType | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)

      // Counts 
    const [statusCount, setStatusCount] = useState<VenueStatusCount>({
        total: 0,
        open: 0,
        closed: 0,
        in_use: 0,
        available: 0,
        maintenance: 0,
    });
    const [typeStatusCount, setTypeStatusCount] = useState<TypeStatusCount>({
        total: 0,
        public: 0,
    })

    const queryClient = useQueryClient()

    // Queries
    const {data: venuesData, error: venuesError, isPending: venuesPending} = useQuery({
        queryKey: ['venues-data'],
        queryFn: GetAdminVenues,
    })

    if (venuesError) {
        toast.error(venuesError.message)
    }

    const {data: venuesTypeData, error: venuesTypeError, isPending: venuesTypePending} = useQuery({
        queryKey: ['venues-type-data'],
        queryFn: GetAdminTypeVenues,
    })

    if (venuesTypeError) {
        toast.error(venuesTypeError.message)
    }
    
    const isLoading = venuesPending || venuesTypePending

    useEffect(() => {
        if (!venuesData?.data) return;
        if (!venuesTypeData?.data) return;

        const newTypeCounts: TypeStatusCount = {
            total: venuesTypeData.data.length,
            public: 0,
        }

        const newCounts: VenueStatusCount = {
            total: venuesData.data.length,
            open: 0,
            closed: 0,
            in_use: 0,
            available: 0,
            maintenance: 0,
        };

        venuesData.data.forEach((req) => {
            if (req.status in newCounts) {
                newCounts[req.status as keyof VenueStatusCount] += 1;
            }
        });

        venuesTypeData.data.forEach((req: EquipmentTypeType) => {
            if (req.is_public) {
                newTypeCounts.public += 1;
            }
        })

        setStatusCount(newCounts);
        setTypeStatusCount(newTypeCounts);
    }, [venuesData, venuesTypeData])

    // Render Modal Content
    const renderModalContent = () => {
        if (!action || !selectedItem) return null

        switch (action) {
            case "venue-update":
                return (
                    <div>
                        <VenueUpdateForm item={selectedItem as Venues} onClose={() => setOpenModal(false)}/>
                    </div>
                )

            case "venue-delete":
                return (
                    <div>
                        <p>Are you sure you want to delete this venue?</p>

                        <CancelConfirmButtons
                            onCancel={() => {setOpenModal(false); setAction(null); setSelectedItem(null)}}
                            onConfirm={() => handleDelete(action, selectedItem)}
                        />
                    </div>
                )

            case "type-update":
                return (
                    <div>
                        <VenueTypeUpdateForm item={selectedItem as VenuesType} onClose={() => setOpenModal(false)}/>
                    </div>
                )

            case "type-delete":
                return (
                    <div>
                        <p>Are you sure you want to delete this venue type?</p>

                        <CancelConfirmButtons
                            onCancel={() => {setOpenModal(false); setAction(null); setSelectedItem(null)}}
                            onConfirm={() => handleDelete(action, selectedItem)}
                        />
                    </div>
                )

            default:
                return null
        }
    }

    // Handlers
    const handleAction = (actionType: typeof action, item: Venues | VenuesType) => {
        setSelectedItem(item)
        setAction(actionType)
        setOpenModal(true)
    }

    // Handle Delete
    const handleDelete = async (actionType: typeof action, item: Venues | VenuesType) => {
        if (actionType === 'venue-delete') {
            const result = await DeleteVenue(selectedItem as Venues)

            if (!result.status) {
                toast.error(result.message)
            }

            queryClient.invalidateQueries({ queryKey: ['venues-data'] })
            setOpenModal(false)
        } else if (actionType === 'type-delete') {
            const result = await DeleteVenueType(selectedItem as VenuesType)

            if (!result.status) {
                toast.error(result.message)
            }

            queryClient.invalidateQueries({ queryKey: ['venues-type-data'] })
            queryClient.invalidateQueries({ queryKey: ['venues-data'] })
            setOpenModal(false)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="col-span-2 my-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Venues inventory</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Manage the list of available venues and update their quantities.
                </p>
            </div>

            {tableType === 'types' ? (
                <CardWrapper>
                    {Object.entries(typeStatusCount).map(([status, count], index) => (
                        isLoading ? (
                            <Skeleton key={index} className="h-20 flex-1"/>
                        ) : (
                            <CardContainer key={index}>
                                <CardContent>
                                    <p className="text-2xl font-bold text-center">{count as number}</p>
                                </CardContent>
                                <CardDescription>
                                    <h3 className={`text-sm  text-center px-1 rounded-xl capitalize ${getStatusStyles(status)}`}>{status === 'total' ?  `Total no. of venue type` : formatLabel(status)}</h3>
                                </CardDescription>
                            </CardContainer>
                        )
                    ))}
                </CardWrapper>
                ) : (
                <CardWrapper>
                    {Object.entries(statusCount).map(([status, count], index) => (
                        isLoading ? (
                            <Skeleton key={index} className="h-20 flex-1"/>
                        ) : (
                            <CardContainer key={index}>
                                <CardContent>
                                    <p className="text-2xl font-bold text-center">{count as number}</p>
                                </CardContent>
                                <CardDescription>
                                    <h3 className={`text-sm  text-center px-1 rounded-xl capitalize ${getStatusStyles(status)}`}>{status === 'total' ?  `Total no. of venues` : formatLabel(status)}</h3>
                                </CardDescription>
                            </CardContainer>
                        )
                    ))}
                </CardWrapper>
            )}

            {isLoading ? (
                <div className="flex justify-end">
                    <Skeleton className="h-10 w-1/5"/>
                </div>
            ) : (
                <div className="flex justify-end mb-4">
                    <div className="flex w-1/5 rounded-lg border-1 p-1 text-sm">
                        <button 
                            className={`flex-1 py-1 rounded-lg hover:cursor-pointer ${tableType === 'venues' ? 'bg-blue-100 text-slate-700 border-gray-400' : 'text-slate-400' }`}
                            onClick={() => setTableType('venues')}
                            >
                            Venues
                        </button>
                        <button 
                            className={`flex-1 py-1 rounded-lg hover:cursor-pointer ${tableType === 'types' ? 'bg-blue-100 text-slate-700 border-gray-400' : 'text-slate-400' }`}
                            onClick={() => setTableType('types')}
                        >
                            Venue Types
                        </button>
                    </div>
                </div>
            )}

            <div className="grow">
                {isLoading ? (
                    <div className="mt-6">
                        <TableLoadingSkeleton/>
                    </div>
                    
                ) : (
                    tableType === "venues" ? (
                        <VenuesDataTable
                            columns={venuesColumns({
                                onUpdate: (item) => handleAction('venue-update', item),
                                onDelete: (item) => handleAction('venue-delete', item)
                            })}
                            data={venuesData?.data || []}
                            header="Venues"
                            tableType={tableType}
                            isAdminLayout={true}
                        /> 
                    ) : (
                        <VenuesDataTable
                            columns={venueTypesColumns({
                                onDelete: (item) => handleAction('type-delete', item),
                                onUpdate: (item) => handleAction('type-update', item)
                            })}
                            data={venuesTypeData?.data || []}
                            header="Venue Types"
                            tableType={tableType}
                            isAdminLayout={true}
                        /> 
                    )
                )}
                 
            </div>

            {openModal && (
                <Modal 
                    header={
                        action === "venue-update" ? "Update Venue" :
                        action === "venue-delete" ? "Delete Venue" :
                        action === "type-update" ? "Update Venue Type" :
                        action === "type-delete" ? "Delete Venue Type" :
                        ""
                    }
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    {renderModalContent()}
                </Modal>
            )}
            
        </div>
    )
}

export { VenuesList }