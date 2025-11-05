import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, CapitalizeAll, formatCreatedAt, formatLabel } from "../handlers/capitalize";

import Button from "@/components/button";
import { Pencil, Trash2 } from "lucide-react";

interface DesignationProps {
    onDelete: (item: Designation) => void;
    onUpdate: (item: Designation) => void
}

export const DesignationColumns = ({ onDelete, onUpdate }: DesignationProps): ColumnDef<Designation>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        header: "Designation",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return Capitalize(value)
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const booking = row.original; // access row data

            return (
                <div className="flex gap-2">
                    <Button
                        Icon={Pencil}
                        className="px-2 py-1 rounded hover:bg-blue-60"
                        iconColor="text-slate-500"
                        onClick={() => onUpdate(booking)}
                    />
                    <Button
                        Icon={Trash2}
                        className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                        buttonColor="bg-red-500"
                        iconColor="text-red-300"
                        onClick={() => onDelete(booking)}
                    />
                </div>
            );
        },
        minSize: 100
    }
]

interface DepartmentProps {
    onDelete: (item: Department) => void;
    onUpdate: (item: Department) => void;
}

export const DepartmentColumns = ({ onDelete, onUpdate }: DepartmentProps): ColumnDef<Department>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        header: "Department",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return formatLabel(value)
        }
    },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original; // access row data
    
                return (
                    <div className="flex gap-2">
                        <Button
                            Icon={Pencil}
                            className="px-2 py-1 rounded hover:bg-blue-60"
                            iconColor="text-slate-500"
                            onClick={() => onUpdate(booking)}
                        />
                        <Button
                            Icon={Trash2}
                            className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                            buttonColor="bg-red-500"
                            iconColor="text-red-300"
                            onClick={() => onDelete(booking)}
                        />
                    </div>
                );
            },
            minSize: 100
        }
]

interface PurposeProps {
    onDelete: (item: Purpose) => void;
    onUpdate: (item: Purpose) => void;
}

export const PurposeColumns = ({ onDelete, onUpdate }: PurposeProps): ColumnDef<Purpose>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        header: "Purpose",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return Capitalize(value)
        }
    },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original; // access row data
    
                return (
                    <div className="flex gap-2">
                        <Button
                            Icon={Pencil}
                            className="px-2 py-1 rounded hover:bg-blue-60"
                            iconColor="text-slate-500"
                            onClick={() => onUpdate(booking)}
                        />
                        <Button
                            Icon={Trash2}
                            className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                            buttonColor="bg-red-500"
                            iconColor="text-red-300"
                            onClick={() => onDelete(booking)}
                        />
                    </div>
                );
            },
            minSize: 100
        }
]

interface TypeOfRequestProps {
    onDelete: (item: TypeOfRequest) => void;
    onUpdate: (item: TypeOfRequest) => void;
}

export const TypeOfRequestColumns = ({ onDelete, onUpdate }: TypeOfRequestProps): ColumnDef<TypeOfRequest>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        header: "Type",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return formatLabel(value)
        }
    },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original; // access row data
    
                return (
                    <div className="flex gap-2">
                        <Button
                            Icon={Pencil}
                            className="px-2 py-1 rounded hover:bg-blue-60"
                            iconColor="text-slate-500"
                            onClick={() => onUpdate(booking)}
                        />
                        <Button
                            Icon={Trash2}
                            className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                            buttonColor="bg-red-500"
                            iconColor="text-red-300"
                            onClick={() => onDelete(booking)}
                        />
                    </div>
                );
            },
            minSize: 100
        }
]

interface PlaceOfUseProps {
    onDelete: (item: PlaceOfUse) => void;
    onUpdate: (item: PlaceOfUse) => void;
}

export const PlaceOfUseColumns = ({ onDelete, onUpdate }: PlaceOfUseProps): ColumnDef<PlaceOfUse>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        id: "department",
        header: "Department",
        accessorFn: (row) => {
            const value = row.department.name

            return formatLabel(value)
        }
    },
    {
        id: "room_number",
        header: "Room Number",
        accessorFn: (row) => `${CapitalizeAll(row.room)} ${row.number}`,
    },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original; // access row data
    
                return (
                    <div className="flex gap-2">
                        <Button
                            Icon={Pencil}
                            className="px-2 py-1 rounded hover:bg-blue-60"
                            iconColor="text-slate-500"
                            onClick={() => onUpdate(booking)}
                        />
                        <Button
                            Icon={Trash2}
                            className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                            buttonColor="bg-red-500"
                            iconColor="text-red-300"
                            onClick={() => onDelete(booking)}
                        />
                    </div>
                );
            },
            minSize: 100
        }
]

interface LocationOfUseProps {
    onDelete: (item: Department) => void;
    onUpdate: (item: Department) => void;
}

export const LocationOfUseColumns = ({ onDelete, onUpdate }: LocationOfUseProps): ColumnDef<LocationOfUse>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        header: "Location",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return `${formatLabel(value)}`
        }
    },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original; // access row data
    
                return (
                    <div className="flex gap-2">
                        <Button
                            Icon={Pencil}
                            className="px-2 py-1 rounded hover:bg-blue-60"
                            iconColor="text-slate-500"
                            onClick={() => onUpdate(booking)}
                        />
                        <Button
                            Icon={Trash2}
                            className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                            buttonColor="bg-red-500"
                            iconColor="text-red-300"
                            onClick={() => onDelete(booking)}
                        />
                    </div>
                );
            },
            minSize: 100
        }
]

interface SubjectProps {
    onDelete: (item: Subject) => void;
    onUpdate: (item: Subject) => void;
}

export const SubjectColumns = ({ onDelete, onUpdate }: SubjectProps): ColumnDef<Subject>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        id: "department",
        header: "Department",
        accessorFn: (row) => {
            const value = row.department.name

            return formatLabel(value)
        }
    },
    {
        header: "Subject",
        accessorKey: "name",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            return formatLabel(value)
        }
    },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original; // access row data
    
                return (
                    <div className="flex gap-2">
                        <Button
                            Icon={Pencil}
                            className="px-2 py-1 rounded hover:bg-blue-60"
                            iconColor="text-slate-500"
                            onClick={() => onUpdate(booking)}
                        />
                        <Button
                            Icon={Trash2}
                            className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                            buttonColor="bg-red-500"
                            iconColor="text-red-300"
                            onClick={() => onDelete(booking)}
                        />
                    </div>
                );
            },
            minSize: 100
        }
]

interface GradeLevelProps {
    onDelete: (item: GradeLevel) => void;
    onUpdate: (item: GradeLevel) => void;
}

export const GradeLevelColumns = ({ onUpdate, onDelete }: GradeLevelProps): ColumnDef<GradeLevel>[] => [
    {
        id: "created_at",
        header: "Created At",
        accessorFn: (row) => {
            const { formatted_date, formatted_time } = formatCreatedAt(row.created_at);
            return { formatted_date, formatted_time }; // return raw object
        },
        cell: ({ getValue }) => {
            const { formatted_date, formatted_time } = getValue() as {
                formatted_date: string;
                formatted_time: string;
            };

            return (
                <div>
                    <p>{formatted_date}</p>
                    <p className="text-sm text-gray-500">{formatted_time}</p>
                </div>
            );
        },
    },
    {
        id: "department",
        header: "Department",
        accessorFn: (row) => {
            const value = row.department.name

            return formatLabel(value)
        }
    },
    {
        header: "Level",
        accessorKey: "level"
    },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original; // access row data
    
                return (
                    <div className="flex gap-2">
                        <Button
                            Icon={Pencil}
                            className="px-2 py-1 rounded hover:bg-blue-60"
                            iconColor="text-slate-500"
                            onClick={() => onUpdate(booking)}
                        />
                        <Button
                            Icon={Trash2}
                            className="px-2 py-1 text-slate-500 rounded hover:bg-blue-60"
                            buttonColor="bg-red-500"
                            iconColor="text-red-300"
                            onClick={() => onDelete(booking)}
                        />
                    </div>
                );
            },
            minSize: 100
        }
]