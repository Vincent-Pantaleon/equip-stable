import { ColumnDef } from "@tanstack/react-table";

export const venuesColumns: ColumnDef<Venues>[] = [
    {
        header: "Venue",
        accessorKey: 'name'
    },
    {
        header: "Total Capacity",
        accessorKey: "total_capacity",
        cell: ({ row }) => {
            const value = row.original.total_capacity;
            return value ?? "N/A"; // fallback to 0 if null or undefined
        }
    },
    {
        header: "Total Count",
        accessorKey: "total_count"
    }
]