import { ColumnDef } from "@tanstack/react-table";
import { formatCreatedAt, formatLabel } from "../handlers/capitalize";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/button";
import formatDate, { formatTime } from "../handlers/format-date";

interface ReleaseActionsProps {
    onUpdate: (venueType: Release) => void
    onDelete: (venueType: Release) => void
}

export const EquipmentReleaseListColumns = ({ onUpdate, onDelete }: ReleaseActionsProps): ColumnDef<Release>[] => [
    {
        header: "Equipment/Venue",
        accessorKey: 'request_type',
        cell: ({ row }) => {
            const type = row.original.request_type;

            if (type === 'equipment') {
                return <div className="font-semibold">{formatLabel(row.original.equipment.item_name as string)}</div>
            } else {
                return <div className="font-semibold">{formatLabel(row.original.venue.venue_name as string)}</div>
            }
        }
    },
    {
        header: "Time Released",
        accessorKey: "time_released",
        cell: ({ row }) => (
            <div className="text-gray-500">
                <p>
                    {formatCreatedAt(row.original.time_released).formatted_date}
                </p>
                <p>
                    {formatCreatedAt(row.original.time_released).formatted_time}
                </p>
            </div>
        )
    },
    {
        header: "Time Returned",
        accessorKey: "time_returned",
        cell: ({ row }) => {
            const time = row.original.time_returned as string

            return (
                <p className="text-gray-500">{time ? formatTime(time) : ""}</p>
            )
        }
    },
    {
        id: "accepted_by",
        header: "Accepted By",
        accessorFn: (row) => row.accepted_profiles,
        cell: ({ row }) => {
            const acceptedBy_fn = row.original.accepted_profiles?.first_name;
            const acceptedBy_ln = row.original.accepted_profiles?.last_name;

            return (
                <div className="text-gray-500">
                    {`${acceptedBy_fn ?? 'Not Returned'} ${acceptedBy_ln ?? ''}`}
                </div>
            )
        }
    },
    {
        id: "released_by",
        header: "Released By",
        accessorFn: (row) => row.profiles,
        cell: ({ row }) => {
            const releasedBy_fn = row.original.profiles?.first_name;
            const releasedBy_ln = row.original.profiles?.last_name;

            return (
                <div className="font-semibold text-gray-500">
                    {`${releasedBy_fn ?? 'N/A'} ${releasedBy_ln ?? ''}`}
                </div>
            )
        }
    },
    {
        header: "Is Item Returned",
        accessorKey: "is_returned",
        cell: ({ getValue }) => {
            const value = getValue()

            return (
                <div className={value ? "text-green-500" : "text-red-500"}>{value ? "Yes" : "No"}</div>
            )
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
    }
]