import { ColumnDef } from "@tanstack/react-table";
import { Capitalize } from "../handlers/capitalize";

const getStatusStyles = (status: string) => {
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
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
};



export const requestColumns: ColumnDef<Requests>[] =[
    {
        header: "Activity",
        accessorKey: "purpose", 
        size: 90
    }, 
    {
        header: "Equipment Needed",
        accessorKey: "equipment",
    },
    {
        header: "Subject",
        accessorKey: "subject",
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
    },
    {
        header: "Time",
        id: "time_range", // required for accessorFn
        accessorFn: row => {
            const formatTime = (value: string) => {
            const [hourStr, minuteStr] = value.split(":");
            const hours = parseInt(hourStr);
            const ampm = hours >= 12 ? "pm" : "am";
            const hour12 = hours % 12 === 0 ? 12 : hours % 12;
            return `${hour12}:${minuteStr} ${ampm}`;
            };

            return `${formatTime(row.time_of_start)} - ${formatTime(row.time_of_end)}`;
        },
        size: 170 
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusClass = getStatusStyles(status);

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                    {Capitalize(status)} {/* Capitalize */}
                </span>
            );
        },
        size: 100
    }
]

export const allRequestColumns: ColumnDef<Requests>[] =[
    {
      header: "Filer's Name",
      accessorFn: row => `${Capitalize(row.first_name)} ${Capitalize(row.last_name)}`,
      cell: ({ getValue }) => getValue(),
      size: 150
    },
    {
        header: "Activity",
        accessorKey: "purpose", 
        size: 90
    }, 
    {
        header: "Equipment Needed",
        accessorKey: "equipment",
    },
    {
        header: "Subject",
        accessorKey: "subject",
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
    },
    {
        header: "Time",
        id: "time_range", // required for accessorFn
        accessorFn: row => {
            const formatTime = (value: string) => {
            const [hourStr, minuteStr] = value.split(":");
            const hours = parseInt(hourStr);
            const ampm = hours >= 12 ? "pm" : "am";
            const hour12 = hours % 12 === 0 ? 12 : hours % 12;
            return `${hour12}:${minuteStr} ${ampm}`;
            };

            return `${formatTime(row.time_of_start)} - ${formatTime(row.time_of_end)}`;
        },
        size: 170 
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusClass = getStatusStyles(status);

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                    {Capitalize(status)} {/* Capitalize */}
                </span>
            );
        },
        size: 100
    }

]