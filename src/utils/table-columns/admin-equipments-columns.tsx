import { ColumnDef } from "@tanstack/react-table";
import formatDate from "../handlers/format-date";
import { Capitalize, formatCreatedAt, formatLabel } from "../handlers/capitalize";

import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/button";

interface EquipmentActionProps {
    onUpdate: (item: Equipments) => void;
    onDelete: (item: Equipments) => void;
}

interface TypeActionProps {
    onUpdate: (item: EquipmentTypeType) => void;
    onDelete: (item: EquipmentTypeType) => void;
}

export const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "returned":
        return "bg-yellow-100 text-yellow-800";
    case "stored":
        return "bg-green-100 text-green-800";
    case "out":
        return "bg-red-100 text-red-800";
    case "maintenance":
        return "bg-gray-200 text-gray-700"
    default:
        return "bg-gray-200 text-gray-700";
  }
};

export const adminEquipmentTypeColumns = ({ onUpdate, onDelete }: TypeActionProps): ColumnDef<EquipmentTypeType>[] => [
    // {
    //     header: "Id",
    //     accessorKey: "id",
    //     maxSize: 80
    // },
    // {
    //     header: "Created at",
    //     accessorKey: "created_at",
    //     accessorFn: (row) => {
    //         const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
    //         return { formatted_date, formatted_time }; // return raw object
    //     },
    //     cell: ({ getValue }) => {
    //         const { formatted_date, formatted_time } = getValue() as {
    //             formatted_date: string;
    //             formatted_time: string;
    //         };

    //         return (
    //             <div>
    //                 <p>{formatted_date}</p>
    //                 <p className="text-sm text-gray-500">{formatted_time}</p>
    //             </div>
    //         );
    //     },
    // },
    {
        header: "Type",
        accessorKey: "type_name",
        cell: ({ getValue }) => {
            const value = getValue<string>()
            return (
                <p className="font-semibold">{formatLabel(value)}</p>
            )
        }
    },
    // {
    //     header: "Total Count",
    //     accessorKey: "total_count",
    // },
    {
        header: "Public",
        accessorKey: "is_public",
        cell: ({ getValue }) => {
            const value = getValue<boolean>()
            const label = value ? "Yes" : "No"

            return <p className="font-semibold">{label}</p>
        }
    },
    {
        
        header: "Office",
        id: "officeFilter",
        accessorFn: (row) => row.office?.id, // value used for filtering
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true; // no filter, show all
            return row.getValue(columnId) === filterValue;
        },
        cell: ({ row }) => formatLabel(row.original.office.office_name as string) // display office name in table
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            const equipment = row.original;

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={Pencil}
                        className="px-2 py-1 rounded hover:bg-blue-60"
                        iconColor="text-slate-500"
                        onClick={() => onUpdate(equipment)}
                    />
                    
                    <Button
                        Icon={Trash2}
                        className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                        buttonColor="bg-red-500"
                        iconColor="text-red-300"
                        onClick={() => onDelete(equipment)}
                    />
                </div>
            )
        }
    }
]

export const adminEquipmentColumns = ({ onUpdate, onDelete } : EquipmentActionProps): ColumnDef<Equipments>[] => [
    // {
    //     header: "Id",
    //     accessorKey: "id",
    //     maxSize: 80
    // },
    // {
    //     id: "created_at",
    //     header: "Created At",
    //     accessorFn: (row) => {
    //         const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
    //         return { formatted_date, formatted_time }; // return raw object
    //     },
    //     cell: ({ getValue }) => {
    //         const { formatted_date, formatted_time } = getValue() as {
    //             formatted_date: string;
    //             formatted_time: string;
    //         };

    //         return (
    //             <div>
    //                 <p>{formatted_date}</p>
    //                 <p className="text-sm text-gray-500">{formatted_time}</p>
    //             </div>
    //         );
    //     },
    // },
    {
        header: "Date Acquired",
        accessorKey: "date_acquired",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return formatDate(value)
        }
    },
    {
        id: 'type',
        header: "Type",
        accessorFn: (row) => Capitalize(row.type.type_name),
        cell: ({ getValue }) => (
            <p className="font-semibold">{formatLabel(getValue() as string)}</p>
        ),
    },
    {
        header: "Item Name",
        accessorKey: "item_name",
        cell: ({ getValue }) => (
            <p className="font-semibold">{formatLabel(getValue() as string)}</p>
        ),
    },
    {
        header: "Reference",
        accessorKey: "reference_number"
    },
    {
        header: "Property Code",
        accessorKey: "property_code"
    },
    {
        header: "Serial Number",
        accessorKey: "serial_number"
    },
    {
        
        header: "Office",
        id: "officeFilter",
        accessorFn: (row) => row.office?.id, // value used for filtering
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true; // no filter, show all
            return row.getValue(columnId) === filterValue;
        },
        cell: ({ row }) => formatLabel(row.original.office.office_name as string) // display office name in table
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusClass = getStatusStyles(status);

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                    {Capitalize(status)} {/* Capitalize */}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            const equipment = row.original;

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={Pencil}
                        className="px-2 py-1 rounded hover:bg-blue-60"
                        iconColor="text-slate-500"
                        onClick={() => onUpdate(equipment)}
                    />
                    
                    <Button
                        Icon={Trash2}
                        className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                        buttonColor="bg-red-500"
                        iconColor="text-red-300"
                        onClick={() => onDelete(equipment)}
                    />
                </div>
            )
        }
    }
]