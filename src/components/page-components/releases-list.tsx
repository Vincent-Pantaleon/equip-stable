'use client'

import { useQuery } from "@tanstack/react-query"

import { ReleaseDataTable } from "../tables/release-list-table"
import { EquipmentReleaseListColumns } from "@/utils/table-columns/releases-columns"
import { TableLoadingSkeleton } from "../loading-skeletons/table-loading"

import { GetReleases } from "@/utils/server-actions/get-releases"
import { toast } from "sonner"
import { useState } from "react"
import Modal from "../modal"
import { ReleaseForm } from "./release-form"
import { ReleaseModalContent } from "../modal-content/admin-release-modal-content"
import { CancelConfirmButtons } from "../cancel-confirm"
import { DeleteRelease } from "@/utils/server-actions/delete-release"
import { useQueryClient } from "@tanstack/react-query"

const ReleasesList = () => {
    const [openReleaseModal, setOpenReleaseModal] = useState<boolean>(false)
    const [action, setAction] = useState<'update' | 'delete' | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<Release | null>(null)

    const queryClient = useQueryClient()

    const { data, error, isPending } = useQuery({
        queryKey: ['release-list'],
        queryFn: GetReleases,
        staleTime: 1000 * 60 * 5,
    })

    if (error) {
        toast.error(error.message)
    }

    const handleAction = (action: string, item: Release) => {
        setAction(action as 'update' | 'delete')
        setOpenModal(true)
        setSelectedItem(item)
    }

    const handleDelete = async () => {
        if(!selectedItem) return;
        
        const result = await DeleteRelease({ id: selectedItem.id })

        if (!result.status) {
            toast.error(result.message)
        } else {
            queryClient.invalidateQueries({ queryKey: ['release-list'] })
            toast.success(result.message)
        }
        
        setOpenModal(false)
    }

    const renderModalContent = (action: 'update' | 'delete' | null) => {
        if (action === null) return;

        switch (action) {
            case 'update':
                return <ReleaseModalContent item={selectedItem} onClose={() => setOpenModal(false)} />

            case 'delete':
                return (
                    <div className="space-y-4">
                        <p>Confirm delete with item id {selectedItem?.id}?</p>
                    
                        <CancelConfirmButtons
                            onCancel={() => setOpenModal(false)}
                            onConfirm={handleDelete}
                        />
                    </div>
                )

            default: 
                return;
        }
    }
    
    return (
        <div className="h-full p-2 border-1 rounded-md">
            
            {isPending ? (
                <TableLoadingSkeleton/>
            ) : (
                <ReleaseDataTable
                    columns={EquipmentReleaseListColumns({
                        onUpdate: (item) => handleAction('update', item),
                        onDelete: (item) => handleAction('delete', item) 
                    })}
                    data={data?.data as any || []}
                    setOpenModalAction={() => setOpenReleaseModal(true)}
                />
            )}

            <Modal
                header="Release an Equipment"
                isOpen={openReleaseModal}
                onClose={() => setOpenReleaseModal(false)}
            >
                <ReleaseForm
                    onClose={() => setOpenReleaseModal(false)}
                />
            </Modal>

            <Modal
                header={action === 'update' ? "Update Release Item" : "Delete Item" }
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                {renderModalContent(action)}
            </Modal>
        </div>
        
    )
}

export { ReleasesList }