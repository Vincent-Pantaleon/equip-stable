'use client'

import { useState } from "react"
import { CancelConfirmButtons } from "../cancel-confirm"

interface FormProps {
    item: Profile
    onClose: () => void
}

const UpdateProfileForm = ({ item, onClose }: FormProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    
    const handleSubmit = () => {
        
    }

    return (
        <>
            <form>
                <div className="grid grid-cols-2 gap-6 text-sm text-gray-800 bg-white rounded-2xl p-6 shadow-sm">
                    <div>
                        <h3 className="text-gray-500">ID</h3>
                        <p className="font-semibold">{item.id}</p>
                    </div>
                </div>

                <button>

                </button>
            </form>

            <CancelConfirmButtons
                onCancel={onClose}
                onConfirm={handleSubmit}
            />
        </>
    )
}

export { UpdateProfileForm }