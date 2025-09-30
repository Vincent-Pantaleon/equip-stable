"use client"

import { useRouter } from "next/navigation"

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

import { Plus } from "lucide-react"

import Button from "../button"
import { Capitalize } from "@/utils/handlers/capitalize"
import { useState } from "react"
import Modal from "../modal"
import { CancelConfirmButtons } from "../cancel-confirm"
import { AddVenueForm } from "../page-components/add-venue-form"
import { AddVenueTypeForm } from "../page-components/add-venue-type-form"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    header: string;
    tableType: string;
}

export function VenuesDataTable<TData, TValue>({
    columns,
    data,
    header,
    tableType
}: DataTableProps<TData, TValue>) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-hidden rounded-md border p-2 h-full">
            <div className="flex mb-2 items-center justify-between">
                <h1 className="text-lg">{header}</h1>

                <div>
                    <Button 
                        Icon={Plus}
                        label={`Add ${Capitalize(tableType)}`}
                        className="px-2"
                        onClick={() => setOpenModal(true)}
                    />
                </div>
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} >
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

            {openModal && (
                <Modal
                    header={`Add ${Capitalize(tableType)}`}
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    {/* Add form */}
                    
                    {tableType === 'venues' ? (
                        <AddVenueForm />
                    ): (
                        <AddVenueTypeForm onClose={() => setOpenModal(false)}/>
                    )}
                </Modal>
            )}
        </div>
    )
}