'use client'

import Button from "../button"
import { Send } from "lucide-react"

import { useRouter } from "next/navigation"
import { Button as UIButton } from "../ui/button"

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
import { SelectInput } from "../input"
import { TableFilter } from "../table-filter"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const options = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" }
]

export function MessageDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 8
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
        <div className="flex flex-col overflow-hidden rounded-md border h-full p-2">
            <div className="flex mb-2 items-center justify-between">
                <h1 className="text-lg">Messages</h1>
                
                <div className="flex gap-3 items-center">
                    <TableFilter
                        name="filter"
                        onChange={(e) => {
                            const dir = e.target.value === "newest" ? "desc" : "asc";
                            table.setSorting([{ id: "created_at", desc: dir === "desc" }]);
                        }}
                        options={options}
                    />
                    
                    <Button
                        label="Send Message"
                        className="px-2"
                        Icon={Send}
                        onClick={() => router.push('/recents/send-message')}
                    />
                </div>
            </div>
            
            <div className="grow">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
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

            <div className="flex items-center justify-end space-x-2 mt-2">
                <UIButton
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </UIButton>
                <UIButton
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </UIButton>
            </div>
        </div>
    )
}