"use client"

import { useState } from "react"

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
import { Plus } from "lucide-react"
import Modal from "../modal"
import { AddNewOfficeForm } from "../page-components/add-office-form"
import { PaginationButtons } from "./pagination-buttons"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function OfficesDataTable<TData, TValue>({
    columns,
    data,
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

    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="rounded-md h-full flex flex-col border p-2 min-h-0">
            <div className="flex mb-2 items-center justify-between">
                <h1 className="text-lg">Office</h1>

                <div>
                    <Button 
                        Icon={Plus}
                        label="Add New Office"
                        className="px-2"
                        onClick={() => setOpenModal(true)}
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
                                        <TableHead key={header.id} style={{ width: `${header.getSize()}px`, whiteSpace: 'nowrap' }}>
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

            <PaginationButtons table={table}/>

            <Modal
                header="Add New Office"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <AddNewOfficeForm/>
            </Modal>
        </div>
    )
}