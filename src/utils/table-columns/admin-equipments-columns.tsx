import { ColumnDef } from "@tanstack/react-table";
import formatDate from "../handlers/format-date";
import { Capitalize } from "../handlers/capitalize";

export const adminEquipmentTypeColumns: ColumnDef<EquipmentTypeType>[] = [
    {
        header: "Created at",
        accessorKey: "created_at",
        cell: ({ getValue }) => {
            const value = getValue<string>() // get raw cell value
            return formatDate(value)
        }
    },
    {
        header: "Id",
        accessorKey: "id"
    },
    {
        header: "Type",
        accessorKey: "type",
        cell: ({ getValue }) => {
            const value = getValue<string>()
            return Capitalize(value)
        }
    },
    {
        header: "Total Count",
        accessorKey: "total_count",
    },
    {
        header: "Available Count",
        accessorKey: "available_count"
    }
]

export const adminEquipmentColumns: ColumnDef<Equipments>[] = [
    {
        header: "Created at",
        accessorKey: "created_at",
        cell: ({ getValue }) => {
            const value = getValue<string>() // get raw cell value
            return formatDate(value)
        },
    },
    {
        header: "Id",
        accessorKey: "id"
    },
    {
        header: "Item Name",
        accessorKey: "item_name"
    },
    {
        header: "Date Acquired",
        accessorKey: "date_acquired"
    },
    {
        header: "Type",
        accessorFn: (row) => Capitalize(row.type.type), // 👈 grab nested field
        id: "type", // give it an ID since accessorFn doesn't auto-generate one
    },
    {
        header: "Reference",
        accessorKey: "reference"
    },
    {
        header: "Code",
        accessorKey: "code"
    },
    {
        header: "Serial Number",
        accessorKey: "serial_number"
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
            const value = getValue<string>()
            return Capitalize(value)
        }
    }
]