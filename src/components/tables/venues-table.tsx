"use client"

import { Button as UIButton } from "../ui/button"

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

import { Plus } from "lucide-react"

import Button from "../button"
import { Capitalize } from "@/utils/handlers/capitalize"
import { useState } from "react"
import Modal from "../modal"
import { AddVenueForm } from "../page-components/add-venue-form"
import { AddVenueTypeForm } from "../page-components/add-venue-type-form"
import { TableFilter } from "../table-filter"
import { useInfo } from "@/utils/hooks/user-context"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    header: string;
    tableType: string;
    isAdminLayout: boolean;
    options: {
        label: string
        value: string
    }[];
    pageSize:number;
    isInventory: boolean;
}

export function VenuesDataTable<TData, TValue>({
    columns,
    data,
    header,
    tableType,
    isAdminLayout = false,
    options,
    pageSize,
    isInventory
}: DataTableProps<TData, TValue>) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    })
    const user = useInfo();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnFilters,
            pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    return (
        <div className="overflow-hidden flex flex-col rounded-md border p-2 h-full">
            <div className="flex mb-2 items-center justify-between gap-2">
                <h1 className="text-lg">{header}</h1>

                <div className="flex gap-2">
                    {(user?.role === 'superadmin' || isInventory) && (
                        <TableFilter
                            name="filter"
                            onChange={(e) => table.getColumn("officeFilter")?.setFilterValue(e.target.value || undefined)}
                            value={(table.getColumn("officeFilter")?.getFilterValue() as string) ?? ""}
                            options={options}
                        />
                    )}

                    {isAdminLayout && (
                        <div>
                            <Button 
                                Icon={Plus}
                                label={`Add ${Capitalize(tableType)}`}
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
            </div>

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

            <div className="flex items-center justify-end space-x-2 ">
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