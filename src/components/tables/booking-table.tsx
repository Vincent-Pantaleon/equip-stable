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

import { Button } from "../ui/button"

import { useState } from "react"
import { TableFilter } from "../table-filter"

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
    
    const table = useReactTable({
        data,
        columns,
        state: { columnFilters, pagination },
        onColumnFiltersChange: (updater) => {
            setColumnFilters(updater),
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    return (
        <div className="rounded-md flex flex-col border h-full p-2">
            <div className="flex mb-2 items-center justify-between">
                <h1 className="text-lg">Bookings</h1>

                <div className="flex gap-2 items-center">
                    <label htmlFor="status_filter">Status:</label>
                    <TableFilter
                        name="status_filter"
                        onChange={(e) => table.getColumn("status")?.setFilterValue(e.target.value || undefined)}
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                        options={options}
                    />

                    {role === 'superadmin' && (
                        <>
                            <label htmlFor="office_filter">Office:</label>
                            <TableFilter
                                name="office_filter"
                                onChange={(e) => table.getColumn("offices")?.setFilterValue(e.target.value || undefined)}
                                value={(table.getColumn("offices")?.getFilterValue() as string) ?? ""}
                                options={offices || []}
                            />
                        </>
                    )}
                </div>
            </div>
            
            <div className="flex-1 overflow-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead key={header.id} style={{ width: `${header.getSize()}px`, padding: '10px' }}>
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
                                        <TableCell key={cell.id}>
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
            
            <div className="flex items-center justify-end space-x-2 ">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}