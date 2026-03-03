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
import Button from "../button"

import { useState } from "react"
import { PaginationButtons } from "./pagination-buttons"

import { SquareArrowOutUpRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    setOpenModalAction: () => void
}

export function ReleaseDataTable<TData, TValue>({
    columns,
    data,
    setOpenModalAction
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,  // starts on page 1 (index 0)
        pageSize: 20,  // show 10 rows per page
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
        <div className="h-full flex flex-col  min-h-0">
            <div className="text-lg mb-2 flex justify-between">
                Releases

                <div>
                    <Button
                        Icon={SquareArrowOutUpRight}
                        label="Release"
                        className="px-2"
                        onClick={setOpenModalAction}
                    />
                </div>
            </div>
            
            <div className="flex-1 overflow-auto text-sm min-h-0 relative">
                <Table className="table-fixed w-full border-seperate">
                    <TableHeader className="sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
                                            {header.isPlaceholder ? null : flexRender(
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
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            
            <PaginationButtons table={table} />
        </div>
    )
}