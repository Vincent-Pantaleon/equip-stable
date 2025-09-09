"use client"

import { useState, useRef } from "react"
import  { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableHeaderRow,
} from "@/components/ui/table"
import Modal from "./modal"
import { MessageModalContent, RequestModalContent, EquipmentModalContent, VenueModalContent, DateCheckForm, ProfileModalContent } from "./modal-content"
import { ReadMessage } from "@/utils/server-actions/message-send"
import Link from "next/link"

type TableType = "messages" | "requests" | "equipments" | "venues" | "profiles" | "offices"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  caption: string
  tableType: TableType
  isLoading: boolean
  paginate?: boolean
  isAdmin?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  caption,
  tableType,
  isLoading,
  paginate = true,
  isAdmin = false,
}: DataTableProps<TData, TValue>) {

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const router = useRouter();
  const pathname = usePathname();

  // Limit rows to 8 if paginate is false
  const displayedData = paginate ? data : data.slice(0, 8);

  const table = useReactTable({
    data: displayedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(paginate && { getPaginationRowModel: getPaginationRowModel() }),
    ...(paginate && {
      onPaginationChange: setPagination,
      state: { pagination }
    }),
  })

  // States for selected items on each table
  const [selectedMessage, setSelectedMessage] = useState<Messages | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<Requests | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipments | null>(null)
  const [selectedVenue, setSelectedVenue] = useState<Venues | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="rounded-md h-full flex flex-col">
      <div className="text-xl">{caption}</div>
      
      <div ref={tableContainerRef} className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableHeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const width = (header.column.columnDef).size ?? 'auto'

                  return (
                    <TableHead key={header.id} style={{ width }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableHeaderRow>
            ))}
          </TableHeader>                 
          <TableBody>
            {isLoading === true ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Fetching Data...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => {
                    if (tableType === "messages") {
                      //go to recents if the user clicks from recents page
                      // router.push(`/recents/message/${(row.original as Messages).id}`);
                      setSelectedMessage(row.original as Messages)
                    } else if (tableType === "requests") {
                      // go to recents if the user clicks from recents page
                      // router.push(`/recents/request/${(row.original as Requests).id}`);
                      setSelectedRequest(row.original as Requests)
                    } else if (tableType === "equipments") {
                      setSelectedEquipment(row.original as Equipments)
                    } else if (tableType === "venues") {
                      setSelectedVenue(row.original as Venues)
                    } else if (tableType === "profiles") {
                      setSelectedProfile(row.original as Profile)
                    }
                  }}
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

      {/* Only show pagination controls if paginate is true */}
      {paginate && !isLoading && data.length >= 6 && (
        <div className="flex gap-3 justify-end mt-auto px-3 py-1"> 
          <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
        </div>
      )}
      
      {selectedMessage && (
        <Modal
          header="Message Details"
          isOpen={isModalOpen}
          onClose={
            () => {
              setSelectedMessage(null)
              setIsModalOpen(false)
            }
          }
        >
          <MessageModalContent message={selectedMessage}/>
        </Modal>
      )}

      {selectedRequest && (
        <Modal
          header="Request Details"
          isOpen={isModalOpen}
          onClose={
            () => {
              setSelectedRequest(null)
              setIsModalOpen(false)
            }
          }
        >
          <RequestModalContent request={selectedRequest} isAdmin={isAdmin}/>
        </Modal>
      )}

      {selectedEquipment && (
        <Modal 
          header="Equipment Details"
          isOpen={isModalOpen}
          onClose={
            () => {
              setSelectedEquipment(null)
              setIsModalOpen(false)
            }
          }
        >
          <EquipmentModalContent equipment={selectedEquipment}/>
          <DateCheckForm/>
        </Modal>
      )}

      {selectedVenue && (
        <Modal 
          header="Venue Details"
          isOpen={isModalOpen}
          onClose={
            () => {
              setSelectedVenue(null)
              setIsModalOpen(false)
            }
          }
        >
          <VenueModalContent venue={selectedVenue}/>
          <DateCheckForm/>
        </Modal>
      )}

      {selectedProfile && (
        <Modal
          header="Profile Details"
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedProfile(null)
            setIsModalOpen(false)
          }}
        >
          <ProfileModalContent profile={selectedProfile}/>
        </Modal>
      )}
    </div>
  )
}