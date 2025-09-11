'use client'

import { MessageDataTable } from "../messages-table"
import { messageColumns } from "@/utils/table-columns/message-columns"
import GetMessageData from "@/utils/server-actions/message-query"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import MessageLoading from "@/app/(app)/messages/loading"

export default function Messages() {

    const {data, error, isPending} = useQuery({
        queryKey: ['messages-data'],
        queryFn: GetMessageData,
        staleTime: 1000 * 60 * 5,
    })

    if (error) {
        toast.error("Error fetching data")
    }

    return (
        <div className="flex flex-col h-full">
            <div className="grow">
                {isPending ? (
                    <MessageLoading />
                ) : (
                    <MessageDataTable
                        columns={messageColumns}
                        data={data || []}
                        sendMessage={true}
                    />
                )}
            </div>
        </div>
    )
}