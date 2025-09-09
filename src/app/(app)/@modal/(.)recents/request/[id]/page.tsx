'use client'

import { useRouter } from "next/navigation"
import Modal from "@/components/modal"

const RequestModal = () => {
    const router = useRouter();

    return (
        <Modal
            header="Request Modal"
            isOpen={true}
            onClose={() => router.back()}
        >
            <div>
                Request Modal Content
            </div>
        </Modal>
    );
}

export default RequestModal;