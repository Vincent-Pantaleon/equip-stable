'use client'

import { useParams, useRouter } from "next/navigation"
import Modal from "@/components/modal"
import { useEffect } from "react";
import { ReadMessage } from "@/utils/server-actions/message-send";
import { toast } from "sonner";

const MessageModal = () => {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    useEffect(() => {
        const MarkMessageAsViewed = async (id: string) => {
            const response = await ReadMessage(id);

            if (response.status === false) {
                toast.error(response.message);
            }
        }
        MarkMessageAsViewed(id);
    }, [])

    return (
        <Modal
            header="Message Modal"
            isOpen={true}
            onClose={() => router.back()}
        >
            <div>
                Message Modal Content
            </div>
        </Modal>
    );
}

export default MessageModal;