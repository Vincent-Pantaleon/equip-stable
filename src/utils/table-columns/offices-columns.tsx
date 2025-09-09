import { ColumnDef } from "@tanstack/react-table";
import { Capitalize } from "../handlers/capitalize";
import formatDate from "../handlers/format-date";

export const OfficeTableColumns: ColumnDef<Office>[] = [
    {
        header: "Office ID",
        accessorKey: "id",
    },

    {
        header: "Created at",
        accessorKey: "created_at",
        cell: ({ getValue }) => {
            const value = getValue<string>() // get raw cell value
            return formatDate(value)
        }
    },
    {
        header: "Office",
        accessorKey: "office",
        size: 200
    },
    {
        header: "Person In Charge",
        accessorFn: row => {
            const fname = row.in_charge.first_name
            const lname = row.in_charge.last_name

            const full = Capitalize(fname) + " " + Capitalize(lname)

            return full ?? "Unknown User"
        },
        size: 200
    }
]