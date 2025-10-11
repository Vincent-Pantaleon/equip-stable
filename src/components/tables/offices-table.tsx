"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function OfficesDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="overflow-hidden rounded-md border p-2 h-full">
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