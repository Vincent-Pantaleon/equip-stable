'use client'

import { InsertNewEquipmentType } from "@/utils/server-actions/admin-equipments-actions"
import { toast } from "sonner"
import Button from "../button"
import { Input, SelectInput } from "../input"
import Modal from "../modal"
import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FetchOfficeOptions } from "@/utils/server-actions/fetch-office"
import { useInfo } from "@/utils/hooks/user-context"

const AddEquipmentTypeForm = () => {
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)

  const {data: officeList, error: officeError } = useQuery({
    queryKey: ['office-list'],
    queryFn: FetchOfficeOptions
  })

  if (officeError) {
    toast.error(officeError.message)
  }

  const queryClient = useQueryClient()
  const user = useInfo()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    setFormData(data)
    setOpenModal(true)
  }

  const handleConfirm = async () => {
    if (!formData) return

    const result = await InsertNewEquipmentType(formData)

    if (result.status === false) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
      setOpenModal(false)
      queryClient.invalidateQueries({ queryKey: ["equipment-type-data"] })
    }
  }

  // IF THE PERSON IS A SUPERADMIN ASK FOR OFFICE SELECTION, IF NOT HIDE THE OFFICE SELECTION AND AUTOMATICALLY ASSIGN THE OFFICE BASED ON THE USER'S OFFICE ID
  return (
    <>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4"
      >
        <Input
          label="Type"
          id="type"
          name="type"
          type="text"
          required
          divStyle="col-span-2"
        />

        {user?.role === 'superadmin' && (
          <SelectInput 
            label="Office"
            name="office_name"
            options={officeList?.data ?? []}
          />
        )}

        <Button
          label="Submit"
          className="col-span-2"
          type="submit"
        />
      </form>

      {openModal && (
        <Modal
          header="Confirm Add New Equipment Type"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        >
          Please confirm adding a new equipment type

          <div className="text-black flex justify-end gap-2 mt-4">
            <Button
              label="Cancel"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setOpenModal(false)}
            />
            <Button
              label="Confirm"
              className="px-4 py-2"
              onClick={handleConfirm} // ✅ call function directly
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export { AddEquipmentTypeForm }