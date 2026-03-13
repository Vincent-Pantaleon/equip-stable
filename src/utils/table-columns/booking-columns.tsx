import { ColumnDef } from "@tanstack/react-table";
import { CapitalizeAll, formatLabel,  } from "../handlers/capitalize";

export const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "declined":
      return "bg-red-100 text-red-800";
    case "out":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-blue-200 text-blue-600";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export const requestColumns: ColumnDef<RecentRequests>[] = [
    {
        header: "Activity",
        accessorKey: "purpose", 
        size: 100,
        cell: ({ row }) => {
            const value = row.original.purpose

            return (
                <span className="font-semibold">
                    {formatLabel(value)}
                </span> 
            )
        },
    }, 
    {
        id: "equipment",
        header: "Equipment", // or whichever field you primarily use
        cell: ({ row }) => {
            const equipments = row.original.equipment

            if (equipments.length === 0) return "No Equipment"

            return (
                <div className="flex overflow-x-auto whitespace-nowrap scrollbar-thin py-1">
                    {equipments.map((item, index) => (
                        <span key={index} className="font-semibold flex-shrink-0">
                            {formatLabel(item.type_name)}
                            {index < equipments.length - 1 && <span className="font-semibold">,&nbsp;&nbsp;</span>}
                        </span>
                    ))}
                </div>
            );
        },
        size: 200
    },
    {
        id: "venue",
        header: "Venue",
        cell: ({ row }) => {
            const venues = row.original.venue;

            if (!venues || venues.length === 0) return "No Venues"

            return (
                <div className="flex overflow-x-auto whitespace-nowrap scrollbar-thin py-1">
                    {venues.map((item, index) => (
                        <span key={index} className="font-semibold flex-shrink-0">
                            {formatLabel(item.venue_name)}
                            {index < venues.length - 1 && <span className="font-semibold">,&nbsp;&nbsp;</span>}
                        </span>
                    ))}
                </div>
            );
        },
        size: 200
    },
    {
        header: "Subject",
        accessorKey: "subject",
        cell: ({ row }) => {
            const value = row.original.subject;

            if (value === null) return "No Subject"

            return formatLabel(value);
        },
        size: 100
    },
    {
        header: "Date of Use",
        accessorKey: "date_of_use",
        cell: ({ getValue }) => {
            const value = getValue<string>();
            const date = new Date(value);
            const formatted = date.toLocaleDateString("en-PH", {
                year: "numeric",
                month: "long",  // "June"
                day: "numeric"  // "9"
            }); // dd/mm/yyyy format
            return formatted;
        },
        size: 100
    },
    {
        header: "Room",
        accessorKey: "place_of_use",
        cell: ({ row }) => {
            const value = row.original.place_of_use;

            if (value === null) return 'No Room'

            return `${CapitalizeAll(value.room)} ${value.number}`;
        },
        size: 150
    },
    {
        header: "Time",
        id: "time_range", // required for accessorFn
        accessorFn: row => {
            const formatTime = (value: string) => {
            const [hourStr, minuteStr] = value.split(":");
            const hours = parseInt(hourStr);
            const ampm = hours >= 12 ? "PM" : "AM";
            const hour12 = hours % 12 === 0 ? 12 : hours % 12;
            return `${hour12}:${minuteStr} ${ampm}`;
            };

            return `${formatTime(row.time_of_start)} - ${formatTime(row.time_of_end)}`;
        },
        size: 120 
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusClass = getStatusStyles(status);

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                    {formatLabel(status)} {/* Capitalize */}
                </span>
            );
        },
        size: 100
    }
]