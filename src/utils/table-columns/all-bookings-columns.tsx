import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, formatLabel } from "../handlers/capitalize";
import { getStatusStyles } from "./booking-columns";

import { 
    Pencil,
    Trash2
} from "lucide-react";
import Button from "@/components/button";

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
        size: 200
    },
    {
        header: "Activity",
        accessorKey: "purpose", 
        cell: ({ row }) => {
            const value = row.original.purpose;
            return formatLabel(value.purpose_name);
        },
        minSize: 100
    }, 
    {
        id: "equipment/venue",
        header: "Equipment/Venue", // or whichever field you primarily use
        cell: ({ row }) => {
            const request = row.original;

            return (
                <span>
                    {request.type_of_request.type_name === "equipment" ? formatLabel(request.equipment.type_name as string) : formatLabel(request.venue.venue_name as string)}
                </span>
            );
        }
    },
    {
        header: "Subject",
        accessorKey: "subject",
        cell: ({ row }) => {
            const value = row.original.subject;
            return formatLabel(value.subject_name);
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
        minSize: 100,
        filterFn: "equalsString"
    },
    {
        id: "offices",
        header: "Office",
        accessorFn: ( row ) => row.office.id,
        cell: ({ row }) => {
            const value = row.original.office.office_name

            return formatLabel(value) ?? "Error"
        },
        filterFn: "equalsString"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const booking = row.original; // access row data

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={Pencil}
                        className="px-2 py-1 rounded hover:bg-blue-60"
                        iconColor="text-slate-500"
                        onClick={() => onUpdate(booking)}
                    />
                    <Button
                        Icon={Trash2}
                        className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                        buttonColor="bg-red-500"
                        iconColor="text-red-300"
                        onClick={() => onDelete(booking)}
                    />
                </div>
            );
        },
        minSize: 100
    },
]