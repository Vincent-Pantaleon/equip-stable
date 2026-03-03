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
import { AddUserForm } from "../page-components/add-user-form"
import { PaginationButtons } from "./pagination-buttons"
import { TableFilter } from "../table-filter"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const filterOptions = [
    { label: "All", value: "" },
    { label: "User", value: "user" },
    { label: "Moderator", value: "moderator" },
    { label: "Administrator", value: "administrator" },
    { label: "Super Admin", value: "superadmin" },
]

export function ProfilesDataTable<TData, TValue>({
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
        <div className="h-full flex flex-col min-h-0">
            <div className="flex mb-2 items-center justify-between">
                <h1 className="text-lg">Profiles</h1>

                <div className="flex items-center gap-x-4">
                    <TableFilter
                        options={filterOptions || []}
                        name="table_filter"
                        label="Role:"
                        onChange={(e) => table.getColumn("role")?.setFilterValue(e.target.value || undefined)}
                        value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
                    />
                    
                    <Button 
                        Icon={Plus}
                        label="Add Profile"
                        className="px-2"
                        type="button"
                        onClick={() => setOpenModal(true)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto text-sm min-h-0 relative">
                <Table className="table-fixed w-full ">
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

            {openModal && (
                <Modal
                    header="Add New Profile"
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <div>
                        <AddUserForm onClose={() => setOpenModal(false)}/>
                    </div>
                </Modal>
            )}
        </div>
    )
}