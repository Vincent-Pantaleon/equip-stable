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

const FormValuesTableList = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openDelUpModal, setOpenDelUpModal] = useState(false)
    const [action, setAction] = useState<string | null>(null)
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [tableName, setTableName] = useState<string>('')

    const queryClient = useQueryClient()

    const handleAction = (actionType: string, item: any, table: string) => {
        setAction(actionType)
        setSelectedItem(item)
        setOpenDelUpModal(true)
        setTableName(table)
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
        <div className="space-y-4 flex flex-col h-full">
            <div className="mt-4 mb-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Borrow Form Values</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Add or remove data to be shown in the dropdowns for the borrow form
                </p>
            </div>

            <div>
                <Button
                    Icon={PlusCircle}
                    label="Add New Entry"
                    onClick={() => setOpenModal(true)}
                    className="px-2"
                />
            </div>

            <div className="overflow-auto space-y-2 flex flex-col h-full">
                {isPending ? (
                    <div className="grow flex flex-col items-center justify-center animate-pulse">
                        <Image alt="equip_icon" src="/equip_logo_2.svg" width={250} height={250} />
                        <p className="text-xl">Fetching Important Details</p>
                    </div>
                ) : (
                tables.map((table, index) => (
                    <div className="min-h-[400px]" key={index}>
                        <BorrowFormValuesDataTable
                            columns={table.columns}
                            data={table.data}
                            header={table.label}
                        />
                    </div>
                ))
                )}
            </div>

            <Modal header="Add New Entry" isOpen={openModal} onClose={() => setOpenModal(false)}>
                <div className="space-y-4">
                    <AddNewValueForm onClose={() => setOpenModal(false)} />
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