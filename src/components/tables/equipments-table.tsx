"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button as UIButton } from "../ui/button"
import Button from "../button"
import { Plus } from "lucide-react"
import { AddEquipmentForm } from "../page-components/add-equipment-form"
import { AddEquipmentTypeForm } from "../page-components/add-equipment-type-form"
import { useInfo } from "@/utils/hooks/user-context"

import { useState } from "react"
import Modal from "../modal"
import { TableFilter } from "../table-filter"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isEquipmentType: boolean
    isAdminLayout?: boolean
    pageSize: number;
    offices: {
        label: string;
        value: string;
    }[];
    isInventory: boolean
}

export function EquipmentsDataTable<TData, TValue>({
    columns,
    data,
    isEquipmentType = false,
    isAdminLayout = false,
    pageSize,
    offices,
    isInventory
}: DataTableProps<TData, TValue>) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
   
    const user = useInfo()

    // FIX FILTERING ISSUES
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: { 
            pagination, 
            columnFilters
        },
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel()
    })

    return (
        <div className="overflow-hidden flex flex-col rounded-md border p-2 h-full">
            <div className="flex mb-2 items-center justify-between">
                <h1 className="text-lg">{isEquipmentType ? "Equipment Types" : "Equipments"}</h1>

                <div className="flex gap-2">
                    {(user?.role === 'superadmin' || isInventory) && (
                        <TableFilter
                            name="filter"
                            onChange={(e) => table.getColumn('officeFilter')?.setFilterValue(e.target.value || undefined)}
                            value={(table.getColumn("officeFilter")?.getFilterValue() as string) ?? ""}
                            options={offices}
                        />
                    )}

                    {isAdminLayout && (
                        <div>
                            <Button
                                Icon={Plus}
                                label={isEquipmentType ? "Add Equipment Type" : "Add Equipment"}
                                className="px-2"
                                onClick={() => setOpenModal(true)}
                            />
                        </div>
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
            </div>

            {openModal && (
                <Modal
                    header={isEquipmentType ? "Add New Equipment Type": "Add New Equipment"}
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <div className="text-black">
                        {isEquipmentType ? <AddEquipmentTypeForm/> : <AddEquipmentForm/>}
                    </div>
                </Modal>
            )}

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