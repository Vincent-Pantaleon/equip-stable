import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, formatLabel } from "../handlers/capitalize";

import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/button";

interface VenueActionsProps {
    onUpdate: (venue: Venues) => void
    onDelete: (venue: Venues) => void
}

interface VenueTypeActionsProps {
    onUpdate: (venueType: VenuesType) => void
    onDelete: (venueType: VenuesType) => void
}

export const venuesColumns = ({ onUpdate, onDelete }: VenueActionsProps ): ColumnDef<Venues>[] => [
    {
        id: "venue_type",
        header: "Type",
        accessorFn: (row) => {
            const value = row.type.name

            return value;
        },
        cell: ({ getValue }) => <p className="font-semibold">{formatLabel(getValue<string>())}</p>
    },
    {
        header: "Reference",
        accessorKey: "reference"
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return <p className="font-semibold">{value ? Capitalize(value) : "N/A"}</p>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const venue = row.original; // access row data

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={Pencil}
                        className="px-2 py-1 rounded hover:bg-blue-60"
                        iconColor="text-slate-500"
                        onClick={() => onUpdate(venue)}
                    />
                    
                    <Button
                        Icon={Trash2}
                        className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                        buttonColor="bg-red-500"
                        iconColor="text-red-300"
                        onClick={() => onDelete(venue)}
                    />
                </div>
            );
        },
        minSize: 100
    }
]

export const venueTypesColumns = ({ onUpdate, onDelete }: VenueTypeActionsProps): ColumnDef<VenuesType>[] => [
    {
        header: "Name",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = formatLabel(getValue<string>())

            return <p className="font-semibold">{value}</p>
        } 
    },
    {
        header: "Total Capacity",
        accessorKey: "total_capacity"
    },
    {
        header: "Total Count",
        accessorKey: "total_count"
    },
    {
        header: "Public",
        accessorKey: "is_public",
        cell: ({ getValue }) => {
            const value = getValue<boolean>() ? "Yes" : "No";

            return <p className="font-semibold">{value}</p>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const venueType = row.original; // access row data

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={Pencil}
                        className="px-2 py-1 rounded hover:bg-blue-60"
                        iconColor="text-slate-500"
                        onClick={() => onUpdate(venueType)}
                    />
                    
                    <Button
                        Icon={Trash2}
                        className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                        buttonColor="bg-red-500"
                        iconColor="text-red-300"
                        onClick={() => onDelete(venueType)}
                    />
                </div>
            );
        },
        minSize: 100
    }
]

export const venueTypesColumnsNoActions: ColumnDef<VenuesType>[] = [
    {
        header: "Name",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = formatLabel(getValue<string>())

            return <p className="font-semibold">{value}</p>
        } 
    },
    {
        header: "Total Capacity",
        accessorKey: "total_capacity"
    },
    {
        header: "Total Count",
        accessorKey: "total_count"
    },
]