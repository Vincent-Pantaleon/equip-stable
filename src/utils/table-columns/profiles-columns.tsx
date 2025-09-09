import { ColumnDef } from "@tanstack/react-table";
import { Capitalize } from "../handlers/capitalize";

const profilesColumns: ColumnDef<Profile>[] = [
    {
        header: "Name",
        accessorFn: (row) => `${row.first_name} ${row.last_name}`
        
    },
    {
        header: "Gender",
        accessorKey: "gender"
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
        header: "Assigned Office"
    },
    {
        header: "Actions",

    }
]

export { profilesColumns }