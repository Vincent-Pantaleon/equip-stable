import { ColumnDef } from "@tanstack/react-table"

export const messageColumns: ColumnDef<Messages>[] = [
  {
    header: "Sender",
    accessorKey: "sender",
    size: 200,
    cell: ({ row }) => {

      let user;

      if (row.original.sender.first_name && row.original.sender.last_name) {
        user = row.original.sender.first_name + ' ' + row.original.sender.last_name
      } else {
        user = "Unknown Sender"
      }

      const isViewed = row.original.is_viewed

      return (
        <div className="flex items-center">
          {/* Pulsing dot */}
          {!isViewed && (
            <span className="absolute left-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          )}
          {user}
        </div>
      )
    }
  },
  {
    header: "Subject",
    accessorKey: "subject"
  },
  {
    header: "Message",
    accessorKey: "message",
    size: 300,
    cell: ({ row }) => (
      <div className="truncate overflow-hidden whitespace-nowrap max-w-[300px]">
        {row.original.message}
      </div>
    )
  },
  {
    id: "messageTime",
    header: "Time",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.created_at)
      return createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    }
  },
  {
    id: "messageDate",
    header: "Date",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.created_at)
      return createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",  // "June"
        day: "numeric"  // "9"
      })
    }
  }
]
