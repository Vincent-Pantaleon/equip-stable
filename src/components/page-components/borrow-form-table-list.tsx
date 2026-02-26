'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'

import Button from '../button'
import Modal from '../modal'
import { BorrowFormValuesDataTable } from '../tables/borrow-form-table'
import { AddNewValueForm } from './add-value-form'

import { useFormDataValues } from '@/utils/data/borrow-form-values-list'
import { CancelConfirmButtons } from '../cancel-confirm'
import { EditBorrowFormItem } from './edit-borrow-form-item-form'
import { DeleteFormValue } from '@/utils/server-actions/delete-form-value'

import { useQueryClient } from '@tanstack/react-query'
import { SelectInput } from '../input'
import { Skeleton } from '../ui/skeleton'

const tableNames = [
    { label: "Department", value: "department" },
    { label: "Designation", value: "designation" },
    { label: "Purpose", value: "purpose" },
    { label: "Type of Request", value: "type_of_request" },
    { label: "Location of Use", value: "location_of_use" },
    { label: "Grade Level", value: "grade_level" },
    { label: "Place of Use", value: "place_of_use" },
    { label: "Subject", value: "subject" },
]

type tableType = "department" | "designation" | "purpose" | "type_of_request" | "location_of_use" | "grade_level" | "place_of_use" | "subject"

const FormValuesTableList = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openDelUpModal, setOpenDelUpModal] = useState(false)
    const [action, setAction] = useState<string | null>(null)
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [tableName, setTableName] = useState<tableType>('department')

    const queryClient = useQueryClient()

    const handleAction = (actionType: string, item: any, table: string) => {
        setAction(actionType)
        setSelectedItem(item)
        setOpenDelUpModal(true)
    }

    const { isPending, error, tables } = useFormDataValues(handleAction)

    if (error) {
        return <p className="text-red-500">Error fetching data</p>
    }

    const handleDelete = async () => {
        const result = await DeleteFormValue(selectedItem, tableName)

        if (!result.status) {
            toast.error(result.message)
        } else {
            setOpenDelUpModal(false)
            queryClient.invalidateQueries({ queryKey: ['borrow-form-values']})
            toast.success(result.message)
        }
    }

    return (
        <div className="space-y-2 flex flex-col h-full">
            <div className="border-b">
                <h1 className="text-2xl font-semibold text-gray-800">Borrow Form Values</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Add or remove data to be shown in the dropdowns for the borrow form
                </p>
            </div>
            {isPending ? (
                <div className='flex justify-between items-center'>
                    <Skeleton className="w-32 h-10" />
                    <Skeleton className="w-56 h-14" />
                </div>
            ) : (
                <div className='flex justify-between items-center'>
                    <Button
                        Icon={PlusCircle}
                        label="Add New Entry"
                        onClick={() => setOpenModal(true)}
                        className="px-2"
                    />

                    <SelectInput
                        label='Select Table'
                        name='table'
                        options={tableNames}
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value as tableType)}
                    />
                </div>
            )}

            <div className="overflow-auto space-y-2 flex flex-col h-full">
                {isPending ? (
                    <div className="grow flex flex-col items-center justify-center animate-pulse">
                        <Image alt="equip_icon" src="/equip_logo_2.svg" width={250} height={250} />
                        <p className="text-xl">Fetching Important Details</p>
                    </div>
                ) : (
                    // Render tables based on the selected table name
                    (() => {
                        // 1. Find the matching label from your tableNames array based on the selected value
                        const selectedTableOption = tableNames.find(t => t.value === tableName)
                        
                        // 2. Find the corresponding table data from the hook
                        const activeTable = tables.find(t => t.label === selectedTableOption?.label)

                        // 3. Render the table, or a placeholder if nothing is selected yet
                        if (!activeTable) {
                            return (
                                <div className="grow flex items-center justify-center text-gray-500">
                                    Please select a table from the dropdown above to view its data.
                                </div>
                            )
                        }

                        return (
                            <BorrowFormValuesDataTable
                                header={activeTable.label}
                                columns={activeTable.columns}
                                data={activeTable.data} 
                            />
                        )
                    })()
                )}
            </div>

            <Modal header="Add New Entry" isOpen={openModal} onClose={() => setOpenModal(false)}>
                <div className="space-y-4">
                    <AddNewValueForm onClose={() => setOpenModal(false)} table={tableName} />
                </div>
            </Modal>

            <Modal
                header={
                action?.includes('delete')
                    ? 'Delete Entry'
                    : action?.includes('update')
                    ? 'Update Entry'
                    : 'Action'
                }
                isOpen={openDelUpModal}
                onClose={() => setOpenDelUpModal(false)}
            >
                {action?.includes('delete') ? (
                    <div>
                        <p>
                            Are you sure you want to delete <strong>{selectedItem?.name}</strong>?
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                            <CancelConfirmButtons
                                onCancel={() => setOpenDelUpModal(false)}
                                onConfirm={handleDelete}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <EditBorrowFormItem item={selectedItem} table={tableName} onClose={() => setOpenDelUpModal(false)}/>
                    </div>
                )}
            </Modal>
        </div>
)}

export { FormValuesTableList }