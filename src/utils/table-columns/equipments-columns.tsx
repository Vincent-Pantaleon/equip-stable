import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, formatLabel } from "../handlers/capitalize";
import { EquipmentTypeNormalized } from "../server-actions/inventory-page-query";

export const equipmentColumns: ColumnDef<EquipmentTypeNormalized>[] = [
    {
        header: "Equipment",
        accessorKey: "name",
        cell: ({ row }) => <p className="font-semibold">{Capitalize(row.original.type_name)}</p>
    },
    {
        id: "officeFilter",
        header: "Office",
        accessorFn: (row) => row.office?.id, // value used for filtering
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true; // no filter, show all
            return row.getValue(columnId) === filterValue;
        },
        cell: ({ row }) => formatLabel(row.original.office?.office_name as string) // display office name in table
    }
];
