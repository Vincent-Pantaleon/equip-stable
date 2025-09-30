import { ColumnDef } from "@tanstack/react-table";
import { Capitalize } from "../handlers/capitalize";

import Button from "@/components/button";
import { Trash2, Pencil } from "lucide-react";

interface ProfilesActionsProps {
    onUpdate: (profile: Profile) => void
    onDelete: (profile: Profile) => void
}

export const profilesColumns = ({ onUpdate, onDelete }: ProfilesActionsProps): ColumnDef<Profile>[] => [
    {
        id: "name",
        header: "Name",
        accessorFn: (row) => `${row.first_name} ${row.last_name}`
        
    },
    {
        header: "School ID",
        accessorKey: "school_id"
    },
    {
        header: "Role",
        accessorKey: "role"
    },
    {
        header: "Status",
        accessorKey: "is_online",
        cell: ({ row }) => {
            const status = row.original.is_online ? "Online" : "Offline"
            const color = row.original.is_online ? "text-green-400" : "text-red-500"
            return (
                <span className={`${color} font-semibold`}>
                    {status}
                </span>
            )
        },
    },
    {
        id: "assigned_office",
        header: "Assigned Office",
        accessorFn: (row) => row.office.office
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const profile = row.original; // access row data

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={Pencil}
                        className="px-2 py-1 rounded hover:bg-blue-60"
                        iconColor="text-slate-500"
                        onClick={() => onUpdate(profile)}
                    />
                    
                    <Button
                        Icon={Trash2}
                        className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                        buttonColor="bg-red-500"
                        iconColor="text-red-300"
                        onClick={() => onDelete(profile)}
                    />
                </div>
            );
        },
        minSize: 100
    }
]