'use client'

import Button from "../button"
import { Send } from "lucide-react"

import { useRouter } from "next/navigation"
import { Button as UIButton } from "../ui/button"
import { updateMessageView } from "@/utils/server-actions/update-message-view"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getPaginationRowModel
} from "@tanstack/react-table"

import { useState } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TableFilter } from "../table-filter"
import { PaginationButtons } from "./pagination-buttons"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
}

const options = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" }
]

export function MessageDataTable<TData, TValue>({
    columns,
    data,
    onRowClick
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20
    })
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination
        },
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    const router = useRouter()

    return (
        <div className="w-full rounded-md h-full flex flex-col min-h-0">
            <div className="flex gap-2 mb-2 md:flex-row md:items-center justify-between h-fit overflow-auto text-sm">
                <h1 className="text-lg">Messages</h1>

                <div className="flex gap-2 items-center ml-10">
                    <TableFilter
                        name="filter"
                        onChange={(e) => {
                            const dir = e.target.value === "newest" ? "desc" : "asc";
                            table.setSorting([{ id: "created_at", desc: dir === "desc" }]);
                        }}
                        options={options}
                        label="Sort:"
                    />

                    <Button
                        label="Send Message"
                        className="px-2 whitespace-nowrap"
                        Icon={Send}
                        onClick={() => router.push('/recents/send-message')}
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
                                <TableHead key={header.id} style={{ width: `${header.getSize()}px`, padding: '10px' }}>
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
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
                                    // On row click, open a modal with message details
                                    onClick={() => onRowClick?.(row.original)}
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

            <PaginationButtons table={table}/>
        </div>
    )
}