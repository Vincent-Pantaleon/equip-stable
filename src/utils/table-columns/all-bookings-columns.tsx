import { ColumnDef } from "@tanstack/react-table";
import { Capitalize } from "../handlers/capitalize";
import { getStatusStyles } from "./booking-columns";

import { 
    Pencil,
    Trash2
} from "lucide-react";

interface AllRequestColumnsProps {
    onUpdate: (booking: Requests) => void
    onDelete: (booking: Requests) => void
}


export const allRequestColumns = ({ onUpdate, onDelete }: AllRequestColumnsProps): ColumnDef<Requests>[] => [
    {
        id: "filers_name",
        header: "Filer's Name",
        accessorFn: row => `${Capitalize(row.first_name)} ${Capitalize(row.last_name)}`,
        cell: ({ getValue }) => getValue(),
        minSize: 100
    },
    {
        header: "Activity",
        accessorKey: "purpose", 
        cell: (row) => {
            const value = row.getValue<string>();
            return Capitalize(value);
        },
        minSize: 100
    }, 
    {
        header: "Equipment Needed",
        accessorKey: "equipment",
        cell: (row) => {
            const value = row.getValue<string>();
            return Capitalize(value);
        },
        minSize: 150
    },
    {
        header: "Subject",
        accessorKey: "subject",
        cell: (row) => {
            const value = row.getValue<string>();
            return Capitalize(value);
        },
        minSize: 100
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
        minSize: 100
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
        minSize: 100 
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;          
            const statusClass = getStatusStyles(status);

            return (
                <div className={`${statusClass} rounded-md w-fit px-1`}>
                    {Capitalize(status)}
                </div>
            );
        },
        minSize: 100
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const booking = row.original; // access row data

            return (
                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => onUpdate(booking)}
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => onDelete(booking)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            );
        },
        minSize: 100
    }

]