"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    ColumnFiltersState,
    getPaginationRowModel
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { use, useState } from "react"
import { TableFilter } from "../table-filter"
import { PaginationButtons } from "./pagination-buttons"
import { useInfo } from "@/utils/hooks/user-context"
import { usePathname } from "next/navigation"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize: number
    offices?: {
        label: string
        value: string
    }[]
    role?: string
}

const options = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Declined", value: "declined" },
    { label: "Completed", value: "completed" },
]

export function BookingDataTable<TData, TValue>({
    columns,
    data,
    pageSize,
    offices,
    role
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,  // starts on page 1 (index 0)
        pageSize: pageSize,  // show 10 rows per page
    })
    const [globalFilter, setGlobalFilter] = useState("")
    const user = useInfo()
    const url = usePathname()
    
    const table = useReactTable({
        data,
        columns,
        state: { 
            columnFilters, 
            pagination,
            globalFilter
        },
        onColumnFiltersChange: (updater) => {
            setColumnFilters(updater),
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    return (
        <div className="rounded-md h-full flex flex-col min-h-0">
            <div className="flex items-center justify-between">
                <h1 className="text-lg">Bookings</h1>

                <div className="flex gap-2 items-center overflow-auto ml-10 text-sm">
                    {((user?.role === 'superadmin' || user?.role === 'administrator') && url.includes('admin')) && (
                        <>
                            <label htmlFor="global-search">Name Search:</label>
                            <div className="border-1 rounded-lg p-2 w-fit"> 
                                <input
                                    id="global-search"
                                    value={globalFilter ?? ''}
                                    onChange={e => setGlobalFilter(e.target.value)}
                                    placeholder="Search all columns..."
                                />
                            </div>
                        </>
                    )}
                    

                    <TableFilter
                        name="status_filter"
                        onChange={(e) => table.getColumn("status")?.setFilterValue(e.target.value || undefined)}
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                        options={options}
                        label="Status:"
                    />

                    <label htmlFor="date_filter">Date:</label>
                    <div className="border-1 rounded-lg p-2 w-fit">
                        <input
                            type="date"
                            name="date_filter"
                            value={(table.getColumn("date_of_use")?.getFilterValue() as string) ?? ""}
                            onChange={(e) => {
                                // Setting it to undefined removes the filter when the input is cleared
                                table.getColumn("date_of_use")?.setFilterValue(e.target.value || undefined);
                            }}
                        />
                    </div>
                    

                    {role === 'superadmin' && (
                        <>
                            <TableFilter
                                name="office_filter"
                                onChange={(e) => table.getColumn("offices")?.setFilterValue(e.target.value || undefined)}
                                value={(table.getColumn("offices")?.getFilterValue() as string) ?? ""}
                                options={offices || []}
                                label="Office:"
                            />
                        </>
                    )}
                </div>
            </div>
            
            <div className="flex-1 overflow-auto text-sm min-h-0 relative">
                <Table className="table-fixed w-full border-seperate">
                    <TableHeader className="sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead 
                                    key={header.id} 
                                    style={{ width: `${header.getSize()}px`, whiteSpace: 'nowrap' }}
                                >
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </TableHead>
                                )
                            })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={(row.original as Requests).id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="truncate max-w-0">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    
                </Table>
            </div>

            <PaginationButtons table={table}/>
        </div>
    )
}