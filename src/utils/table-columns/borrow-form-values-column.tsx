import { ColumnDef } from "@tanstack/react-table";
import { Capitalize, CapitalizeAll, formatCreatedAt, formatLabel } from "../handlers/capitalize";

export const DesignationColumns: ColumnDef<Designation>[] = [
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
    }
]

export const DepartmentColumns: ColumnDef<Department>[] = [
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
    }
]

export const PurposeColumns: ColumnDef<Purpose>[] = [
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
    }
]

export const TypeOfRequestColumns: ColumnDef<TypeOfRequest>[]= [
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

            return Capitalize(value)
        }
    }
]

export const PlaceOfUseColumns: ColumnDef<PlaceOfUse>[] = [
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
    }
]

export const LocationOfUseColumns: ColumnDef<LocationOfUse>[] = [
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

            return `${formatLabel(value)} Campus`
        }
    }
]

export const SubjectColumns: ColumnDef<Subject>[] = [
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

            return Capitalize(value)
        }
    }
]

export const GradeLevelColumns: ColumnDef<GradeLevel>[] = [
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
    }
]

export const EquipmentColumns: ColumnDef<EquipmentTypeType>[] = [
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
        id: "equipment",
        header: "Equipment",
        accessorFn: (row) => {
            const value = row.type

            return formatLabel(value)
        }
    },
    {
        header: "Total Count",
        accessorKey: "total_count"
    },
]