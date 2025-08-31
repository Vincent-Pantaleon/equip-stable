import { ColumnDef } from "@tanstack/react-table";
import { Capitalize } from "../handlers/capitalize";

export const equipmentColumns: ColumnDef<Equipments>[] = [
    {
        header: "Equipment",
        accessorKey: "name",
        cell: ({ row }) => {
            return (
                <p>{Capitalize(row.original.name)}</p>
            )

        }
    },
    {
        header: "Total Count",
        accessorKey: "total_count"
    }
]