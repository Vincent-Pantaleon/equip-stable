'use client'

import { MessageDataTable } from "../tables/messages-table"
import { BookingDataTable } from "../tables/booking-table"
import { toast } from "sonner"
import RecentsLoading from "@/app/(app)/recents/loading"
import { useState } from "react"

import { messageColumns } from "@/utils/table-columns/message-columns"
import { requestColumns } from "@/utils/table-columns/booking-columns"
import { useQuery } from "@tanstack/react-query"
import { GetRecentRequestData } from "@/utils/server-actions/request-query"
import GetMessageData from "@/utils/server-actions/message-query"
import Modal from "../modal"
import { updateMessageView } from "@/utils/server-actions/update-message-view"
import { MessageModalContent } from "../modal-content"

export default function Recents() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<Message | null>(null)
  
  const { data: messageData, error: messageError, isPending: messagePending } = useQuery({
    queryKey: ['messages-data'],
    queryFn: GetMessageData,
  })

  const { data: requestData, error: requestError, isPending: requestPending } = useQuery({
    queryKey: ['requests-data'],
    queryFn: GetRecentRequestData,
  })

  if (messageError || requestError) {
    toast.error("Error fetching data")
  }

  const messageClick = async (item: Message) => {
    setOpenModal(true)
    setSelectedItem(item)

    const result = await updateMessageView(selectedItem?.id as string)

    if (result.status === false) {
      toast.error(result.message)
    }
  }

  return (
    <div className="h-full w-full flex flex-col space-y-1">
      <div className="flex-1 min-h-0 h-1/2">
        {messagePending ? (
          <RecentsLoading />
        ) : (
          <MessageDataTable
            columns={messageColumns}
            data={messageData || []}
            onRowClick={messageClick}
          />
        )}
      </div>
      <div className="flex-1 min-h-0 h-1/2">
        {requestPending ? (
          <RecentsLoading/>
        ) : (
          <BookingDataTable
            columns={requestColumns}
            data={requestData || []}
            pageSize={6}
          />
        )}
      </div>

      <Modal 
        header="Message"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <MessageModalContent message={selectedItem as Message}/>
      </Modal>
    </div>
  )
}
