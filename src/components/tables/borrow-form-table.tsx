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
import Button from "../button"

import Modal from "../modal"

import { Plus } from "lucide-react"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header: string
}

export function BorrowFormValuesDataTable<TData, TValue>({
  columns,
  data,
  header,
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
            <h1 className="text-md">{header}</h1>

            <Button
                Icon={Plus}
                className="px-4"
                label="Add"
                onClick={() => setOpenModal(prev => !prev)}
            />
        </div>
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
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
                header="Add"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div>
                    Hello
                </div>
            </Modal>
        )}
    </div>
    )
}