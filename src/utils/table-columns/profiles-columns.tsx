import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, formatLabel } from "../handlers/capitalize";

import Button from "@/components/button";
import { Trash2, View } from "lucide-react";

interface ProfilesActionsProps {
    onUpdate: (profile: Profile) => void
    onDelete: (profile: Profile) => void
}

export const profilesColumns = ({ onUpdate, onDelete }: ProfilesActionsProps): ColumnDef<Profile>[] => [
    {
        header: "Name",
        id: "name",
        accessorFn: (row) => {
            let name = `${row.first_name} ${row.last_name}`
            
            return name;
        },
        cell: ({getValue}) => {
            const value = getValue()

            return <p className="font-semibold">{value as string}</p>
        }
    },
    {
        header: "Office Assigned",
        id: "office_name",
        accessorFn: (row) => {
            const office = row.office.office_name

            return office
        },
        cell: ({getValue}) => {
            const value = getValue()

            return <p>{formatLabel(value as string)}</p>
        }
    },
    {
        header: "Email",
        id: "email",
        accessorFn: (row) => {
            const email = row.email

            return email;
        }
    },
    {
        header: "Role",
        id: "role",
        accessorFn: (row) => {
            const role = row.role

            return role;
        },
        cell: ({getValue}) => {
            const value = getValue()

            return <p className="font-semibold">{value as string}</p>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const profile = row.original; // access row data

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={View}
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