'use client'

import { DataTable } from "../data-table"
import { messageColumns } from "@/utils/table-columns/message-columns"
import GetMessageData from "@/utils/server-actions/message-query"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function Messages() {

    const {data, error, isPending} = useQuery({
        queryKey: ['messages-data'],
        queryFn: GetMessageData,
    })

    if (error) {
        toast.error("Error fetching data")
    }

    return (
        <div className="flex flex-col h-full">
            <Link href={'/messages/send-message'} className="button-animation w-full bg-hover-color py-2 rounded-xl transition-colors duration-200 hover:bg-form-input-color hover:cursor-pointer ">Send a message</Link>
            <div className="grow mt-4">
                <DataTable 
                    caption="Your Recent Messages" 
                    columns={messageColumns}
                    data={data || []}
                    tableType="messages"
                    paginate={false}
                    isLoading={isPending}
                />
            </div>
        </div>
    )
}