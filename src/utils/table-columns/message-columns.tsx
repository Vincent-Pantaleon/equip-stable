import { ColumnDef } from "@tanstack/react-table"
import { formatCreatedAt, formatLabel } from "../handlers/capitalize";

export const messageColumns: ColumnDef<Messages>[] = [
  {
    header: "Sender",
    accessorKey: "sender",
    size: 100,
    cell: ({ row }) => {
      const name = `${row.original.sender.first_name} ${row.original.sender.last_name}`;
      const isViewed = true;

      return (
        <div className="flex items-center gap-2">
          {/* The Dot container - fixed width ensures names align even if dot is hidden */}
          <div className="flex-shrink-0 w-3 h-3">
            {isViewed && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full w-3 h-3 bg-blue-500"></span>
              </span>
            )}
          </div>
          
          {/* The Name */}
          <span className={isViewed ? "font-semibold text-black" : "text-gray-600"}>
            {name}
          </span>
        </div>
      )
    }
  },
  {
    header: "Subject",
    accessorKey: "subject",
    size: 100,
  },
  {
    header: "Message",
    accessorKey: "message",
    size: 400,
    cell: ({ row }) => (
      <div className="truncate overflow-hidden whitespace-nowrap max-w-[300px]">
        {row.original.message}
      </div>
    )
  },
  {
    id: "created_at",
    header: "Received On",
    accessorFn: (row) => {
        const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
        return { formatted_date, formatted_time }; // return raw object
    },
    cell: ({ getValue }) => {
        const { formatted_date, formatted_time } = getValue() as {
            formatted_date: string;
            formatted_time: string;
        };

        return (
            <div>
                <p>{formatted_date}</p>
                <p className="text-sm text-gray-500">{formatted_time}</p>
            </div>
        );
    },
  },
]
