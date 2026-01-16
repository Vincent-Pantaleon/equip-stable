'use client'

import { formatLabel } from "@/utils/handlers/capitalize"

interface FormProps {
    item: Profile
    onClose: () => void
}

const UpdateProfileForm = ({ item, onClose }: FormProps) => {
    return (
        <>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6 text-sm text-gray-800 bg-white rounded-2xl p-6 shadow-sm">
                    <div>
                        <h3 className="text-gray-500">ID</h3>
                        <p className="font-semibold">{item.id}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Email</h3>
                        <p className="font-semibold">{item.email}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">First Name</h3>
                        <p className="font-semibold">{item.first_name}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Last Name</h3>
                        <p className="font-semibold">{item.last_name}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Role</h3>
                        <p className="font-semibold">{item.role}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Assigned Office</h3>
                        <p className="font-semibold">{formatLabel(item.office.office_name)}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">School ID</h3>
                        <p className="font-semibold">{item.school_id}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500">Is In Charge</h3>
                        <p className="font-semibold">{item.is_in_charge ? "Yes" : "No"}</p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-sm transition button-animation hover:cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>

        </>
    )
}

export { UpdateProfileForm }