'use client'

import { DataTable } from "../data-table"
import { messageColumns } from "@/utils/data/message-columns"
import { requestColumns } from "@/utils/data/request-columns"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { GetRequestData } from "@/utils/server-actions/request-query"
import GetMessageData from "@/utils/server-actions/message-query"
import { toast } from "sonner"

export default function Recents() {
  const { data: messageData, error: messageError, isPending: messagePending } = useQuery({
    queryKey: ['messages-data'],
    queryFn: GetMessageData,
    staleTime: 1000 * 60 * 5, // 5 minutes,
    placeholderData: (prev) => prev,
  })

  const { data: requestData, error: requestError, isPending: requestPending } = useQuery({
    queryKey: ['requests-data'],
    queryFn: GetRequestData,
    staleTime: 1000 * 60 * 5, // 5 minutes,
    placeholderData: (prev) => prev,
  })

  if (messageError || requestError) {
    toast.error("Error fetching data")
  }

  const isLoading = messagePending || requestPending

  return (
    <>
      <div className="overflow-auto h-60 md:h-1/2">
        <DataTable
          columns={messageColumns}
          data={messageData || []}
          caption="Your recent Messages"
          tableType="messages"
          isLoading={isLoading}
        />
      </div>
      <div className="overflow-auto h-60 md:h-1/2">
        <DataTable
          columns={requestColumns}
          data={requestData || []}
          caption="Your recent Requests"
          tableType="requests"
          isLoading={isLoading}
        />
      </div>
    </>
  )
}
