'use client'

import { MessageDataTable } from "../tables/messages-table"
import { BookingDataTable } from "../tables/booking-table"
import { toast } from "sonner"
import RecentsLoading from "@/app/(app)/recents/loading"
import { useInfo } from "@/utils/hooks/user-context"

import { messageColumns } from "@/utils/table-columns/message-columns"
import { requestColumns } from "@/utils/table-columns/booking-columns"
import { useQuery } from "@tanstack/react-query"
import { GetRecentRequestData } from "@/utils/server-actions/request-query"
import GetMessageData from "@/utils/server-actions/message-query"

export default function Recents() {
  const { data: messageData, error: messageError, isPending: messagePending } = useQuery({
    queryKey: ['messages-data'],
    queryFn: GetMessageData,
  })

  const user = useInfo()

  const { data: requestData, error: requestError, isPending: requestPending } = useQuery({
    queryKey: ['requests-data'],
    queryFn: GetRecentRequestData,
  })

  if (messageError || requestError) {
    toast.error("Error fetching data")
  }

  return (
    <div className="h-full flex flex-col gap-y-1">
      <div className="overflow-auto h-60 md:h-1/2">
        {messagePending ? (
          <RecentsLoading />
        ) : (
          <MessageDataTable
            columns={messageColumns}
            data={messageData || []}
          />
        )}
      </div>
      <div className="overflow-auto h-60 md:h-1/2">
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
    </div>
  )
}
