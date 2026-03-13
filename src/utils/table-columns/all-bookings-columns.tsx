import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, CapitalizeAll, formatLabel } from "../handlers/capitalize";
import { getStatusStyles } from "./booking-columns";

import { 
    Pencil,
    Trash2
} from "lucide-react";
import Button from "@/components/button";

interface AllRequestColumnsProps {
    onUpdate: (booking: AdminRequests) => void
    onDelete: (booking: AdminRequests) => void
}

// ! TODO: FIX THIS SHIT PARA MAS HINLO ANG IDISPLAY SA TABLE
export const allRequestColumns = ({ onUpdate, onDelete }: AllRequestColumnsProps): ColumnDef<AdminRequests>[] => [
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
            return formatLabel(value);
        },
        minSize: 180
    },
    {
        header: "Location of Use",
        accessorFn: row => row.location_of_use,
        cell: ({ row }) => {
            const value = row.original.location_of_use;
            return `${formatLabel(value)}`;
        },
        size: 180
    },
    {
        header:"Room",
        accessorFn: row => row.place_of_use,
        cell: ({ row }) => {
            const value = row.original.place_of_use;

            if (!value) return "No Room";

            return `${CapitalizeAll(value.room)} ${formatLabel(value.number)}`;
        },
        size: 200
    },
    {
        id: "equipment",
        header: "Equipment", // or whichever field you primarily use
        cell: ({ row }) => {
            // ✅ Force it to always be an array, whatever shape it arrives in
            const equipments = row.original.equipment

            if (equipments.length === 0) {
                return <span className="text-muted-foreground">None</span>;
            }

            return (
                <div className="flex overflow-x-auto whitespace-nowrap scrollbar-thin py-1 gap-1">
                    {equipments.map((item, index) => (
                        <span key={index} className="font-semibold flex-shrink-0">
                            {formatLabel(item.type_name)}
                            {index < equipments.length - 1 && <span className="font-semibold">,&nbsp;&nbsp;</span>}
                        </span>
                    ))}
                </div>
            );
        },
        size: 300
    },
    {
        id: "venue",
        header: "Venue", // or whichever field you primarily use
        cell: ({ row }) => {
            // ✅ Force it to always be an array, whatever shape it arrives in
            const venues = row.original.venue

            if (venues.length === 0) {
                return <span className="text-muted-foreground">None</span>;
            }

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
        size: 300
    },
    {
        header: "Subject",
        accessorKey: "subject",
        cell: ({ row }) => {
            const value = row.original.subject; 

            if(!value) return "No Subject"

            return formatLabel(value);
        },
        size: 150
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
        size: 180
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
        size: 180 
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;          
            const statusClass = getStatusStyles(status);

            return (
                <div className={`${statusClass} rounded-md w-fit px-1`}>
                    {formatLabel(status)}
                </div>
            );
        },
        size: 150,
        filterFn: "equalsString"
    },
    {
        id: "offices",
        header: "Office",
        accessorFn: ( row ) => row.office,
        cell: ({ row }) => {
            const value = row.original.office

            return formatLabel(value)
        },
        filterFn: "equalsString",
        size: 200
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
        size: 100
    },
]