'use client'

import { useQuery } from "@tanstack/react-query"
import { GetOfficeList } from "@/utils/server-actions/office-page-actions"
import { OfficeTableColumns } from "@/utils/table-columns/offices-columns"
import { toast } from "sonner"
import { OfficesDataTable } from "../tables/offices-table"
import { TableLoadingSkeleton } from "../loading-skeletons/table-loading"
import { useState } from "react"
import Modal from "../modal"
import { UpdateOfficeForm } from "../modal-content/office-modal-content"
import { CancelConfirmButtons } from "../cancel-confirm"
import { DeleteOffice } from "@/utils/server-actions/delete-office"
import { useQueryClient } from "@tanstack/react-query"

const OfficeList = () => {     
    const [action, setAction] = useState<'delete-office' | 'update-office' | null>(null)
    const [selectedItem, setSelectedItem] = useState<Office | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const queryClient = useQueryClient()

    console.log("Selected Item: ", selectedItem)

    const { data, error, isPending } = useQuery({
        queryKey: ['office-list'],
        queryFn: GetOfficeList
    })

    if (error) {
        toast.error(error.message)
    }

    const handleAction = (actionType: typeof action, item: Office | null) => {
        setAction(actionType)
        setOpenModal(true)
        setSelectedItem(item)
    }

    const handleDelete = async () => {
        if (!selectedItem) return;

        const result = await DeleteOffice(selectedItem.id)

        if (!result.status) {
            toast.error(result.message)
        }

        toast.success(result.message)
        queryClient.invalidateQueries({ queryKey: ['office-list'] })
        setOpenModal(false)
    }

    const HandleModalContent = () => {
        switch (action) {
            case 'delete-office':
                return (
                    <div>
                        <p>Are you sure you want to delete this office?</p>

                        <CancelConfirmButtons
                            onCancel={() => setOpenModal(false)}
                            onConfirm={handleDelete}
                        />
                    </div>
                )

            case 'update-office':
                return (
                    <div>
                        <UpdateOfficeForm item={selectedItem} onClose={() => setOpenModal(false)}/>
                    </div>
                )

            default:
                return;
        }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="col-span-2 my-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Office list</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Easily add, update, and delete offices
                </p>
            </div>
            
            {isPending ? (
                <TableLoadingSkeleton/>
            ): (
                <div className="grow">
                    <OfficesDataTable
                        columns={OfficeTableColumns({
                            onDelete: (item) => handleAction('delete-office', item),
                            onUpdate: (item) => handleAction('update-office', item),
                        })}
                        data={data?.data || []}
                    />
                </div>
            )}

            <Modal
                header={action === 'update-office' ? 'Update Office' : "Delete Office"}
                isOpen={openModal}
                onClose={() => {setOpenModal(false); setSelectedItem(null) }}
            >
                {HandleModalContent()}
            </Modal>
        </div>
    )
}

export { OfficeList }