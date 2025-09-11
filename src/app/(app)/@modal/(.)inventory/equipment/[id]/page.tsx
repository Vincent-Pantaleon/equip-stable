'use client'

import { useRouter } from "next/navigation"
import Modal from "@/components/modal"

const EquipmentModal = () => {
    const router = useRouter();

    console.log('equipment intercept fire')

    return (
        <Modal
            header="Request Modal"
            isOpen={true}
            onClose={() => router.back()}
        >
            <div>
                Equipment Modal Content
            </div>
        </Modal>
    );
}

export default EquipmentModal;