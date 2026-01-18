import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, formatLabel } from "../handlers/capitalize";
import formatDate from "../handlers/format-date";
import Button from "@/components/button";
import { formatCreatedAt } from "../handlers/capitalize";

import { Pencil, Trash2 } from "lucide-react";

interface TypeActionProps {
    onUpdate: (item: Office) => void;
    onDelete: (item: Office) => void;
}

export const OfficeTableColumns = ({ onUpdate, onDelete }: TypeActionProps): ColumnDef<Office>[] => [
    {
        header: "Created at",
        accessorFn: (row) => row.created_at,
        cell: ({ getValue }) => {
            const value = getValue<string>() // get raw cell value
            return (
                <div className="text-gray-500">
                    <p>
                        {formatCreatedAt(value).formatted_date}
                    </p>
                    <p>
                        {formatCreatedAt(value).formatted_time}
                    </p>
                </div>
            )
        }
    },
    {
        header: "Office Name",
        accessorFn: (row) => row.office_name,
        cell: ({ getValue }) => {
            const value = getValue()

            return <p className="font-semibold">{formatLabel(value as string)}</p>
        },
        size: 200
    },
    {
        header: "Person In Charge",
        accessorFn: row => {
            const fname = row.profile.first_name || ""
            const lname = row.profile.last_name || ""

            const full = Capitalize(fname) + " " + Capitalize(lname)

            return full ?? "Unknown User"
        },
        size: 200
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