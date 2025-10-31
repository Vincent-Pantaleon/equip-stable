'use client'

import { useQuery } from "@tanstack/react-query"
import { GetUsersList } from "@/utils/server-actions/profile-query"
import { toast } from "sonner"
import { profilesColumns } from "@/utils/table-columns/profiles-columns"
import { ProfilesDataTable } from "../tables/profiles-table"
import { useState } from "react"
import Modal from "../modal"
import { UpdateProfileForm } from "../modal-content/profiles-modal-content"
import { DeleteUser } from "@/utils/server-actions/delete-user"
import { CancelConfirmButtons } from "../cancel-confirm"

const ProfileListTable = () => {    
    const [action, setAction] = useState<"delete-profile" | "update-profile" | null >(null)
    const [selectedItem, setSelectedItem] = useState<Profile | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    
    const { data, error } = useQuery({
        queryKey: ['profiles-list'],
        queryFn: GetUsersList,
        staleTime: 5 * 1000 * 5,
    })

    if (error) {
        toast.error(error.message)
    }

    const handleAction = (actionType: typeof action, item: Profile | null) => {
        setSelectedItem(item)
        setAction(actionType)
        setOpenModal(true)
    }

    const renderModalContent = () => {
        if (!selectedItem || !action) return null; 

        switch(action) {
            case 'update-profile':
                return (
                    <UpdateProfileForm item={selectedItem as Profile} onClose={() => setOpenModal(false)}/>
                )

            case 'delete-profile':
                return (
                    <div>
                        <p>Are you sure you want to delete this profile?</p>
                        
                        <CancelConfirmButtons
                            onCancel={() => setOpenModal(false)}
                            onConfirm={() => handleDelete(selectedItem)}
                        />
                    </div>
                )

            default: 
                return null
        }
    }

    const handleDelete = async (item: Profile) => {
        const result = await DeleteUser(item.id)

        if (!result.status) {
            toast.error(result.message)
        } else {
            setOpenModal(false)
            toast.success(result.message)
        }
    }
   
    return (
        <div className="h-full flex flex-col">
            <div className="col-span-2 my-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Profiles list</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    User account management
                </p>
            </div>
            
            <div className="grow">
                <ProfilesDataTable
                    columns={profilesColumns({
                        onDelete: (item) => handleAction('delete-profile', item),
                        onUpdate: (item) => handleAction('update-profile', item)
                    })}
                    data={data?.data || []}
                />
            </div>

            {openModal && (
                <Modal
                    header={
                        action === "update-profile" ? "Update Profile" :
                        action === "delete-profile" ? "Delete Profile" : 
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

export { ProfileListTable }