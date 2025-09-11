'use client'

import { useRouter } from "next/navigation"
import Modal from "@/components/modal"

const VenueModal = () => {
    const router = useRouter();

    return (
        <Modal
            header="Request Modal"
            isOpen={true}
            onClose={() => router.back()}
        >
            <div>
                Venue Modal Content
            </div>
        </Modal>
    );
}

export default VenueModal;