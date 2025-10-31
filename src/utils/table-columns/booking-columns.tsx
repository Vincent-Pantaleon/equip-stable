import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, CapitalizeAll, formatLabel,  } from "../handlers/capitalize";

import { Pencil, Trash2 } from "lucide-react";

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

export const requestColumns: ColumnDef<Requests>[] = [
    {
        header: "Activity",
        accessorKey: "purpose", 
        size: 90,
        cell: ({ row }) => {
            const value = row.getValue<string>("purpose");
            return Capitalize(value);
        },
    }, 
    {
        id: "equipment/venue",
        header: "Equipment/Venue", // or whichever field you primarily use
        cell: ({ row }) => {
            const request = row.original;

            return (
                <span>
                    {request.type_of_request === "equipment" ? formatLabel(request.equipment as string) : formatLabel(request.venue as string)}
                </span>
            );
        }
    },
    {
        header: "Subject",
        accessorKey: "subject",
        cell: ({ row }) => {
            const value = row.getValue<string>("subject");
            return (value);
        },
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
        header: "Room",
        accessorKey: "place_of_use",
        cell: ({ row }) => {
            const value = row.getValue<string>("place_of_use");
            return formatLabel(value);
        },
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