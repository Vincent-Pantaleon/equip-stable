'use client'

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"
import { adminEquipmentColumns, adminEquipmentTypeColumns } from "@/utils/table-columns/admin-equipments-columns"
import { SelectEquipment, SelectEquipmentType } from "@/utils/server-actions/admin-equipments-actions"
import { EquipmentsDataTable } from "../tables/equipments-table"
import { TableLoadingSkeleton } from "../loading-skeletons/table-loading"
import { DeleteEquipment } from "@/utils/server-actions/delete-equipment"
import { Skeleton } from "../ui/skeleton"
import { getStatusStyles } from "@/utils/table-columns/admin-equipments-columns"

import { EquipmentUpdateForm, EquipmentTypeUpdateForm } from "../modal-content/admin-equipment-modal-content"

import Modal from "../modal"
import { CancelConfirmButtons } from "../cancel-confirm"

import { 
    CardContent,
    CardContainer,
    CardDescription,
    CardWrapper
} from "../card"

type EquipmentStatusCount = {
    total: number;
    stored: number;
    out: number;
    returned: number;
    maintenance: number;
};

type EquipmentTypeStatusCount = {
  total: number;
  public: number;
}

const AdminEquipments = () => {   
  
  // States
  const [isEquipmentTypeVisible, setIsEquipmentTypeVisible] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState<"equipment-update" | "equipment-delete" | "type-update" | "type-delete" | null>(null)
  const [selectedItem, setSelectedItem] = useState<EquipmentTypeType | Equipments | null>(null)
  
  // Counts 
  const [statusCount, setStatusCount] = useState<EquipmentStatusCount>({
      total: 0,
      stored: 0,
      out: 0,
      returned: 0,
      maintenance: 0,
  });
  const [typeStatusCount, setTypeStatusCount] = useState<EquipmentTypeStatusCount>({
    total: 0,
    public: 0,
  })

  // Query Client
  const queryClient = useQueryClient()

  // Data Queries
  const { data: typeData, error: typeError, isPending: typePending } = useQuery({
    queryKey: ['equipment-type-data'],
    queryFn: SelectEquipmentType,
    staleTime: 1000 * 60 * 5
  })

  if (typeError) toast.error(typeError.message)

  const { data: equipmentData, error: equipmentError, isPending: equipmentPending } = useQuery({
    queryKey: ['equipment-data'],
    queryFn: SelectEquipment,
    staleTime: 1000 * 60 * 5
  })

  if (equipmentError) toast.error(equipmentError.message)

  const isLoading = typePending || equipmentPending

  // Handlers
  const handleAction = (actionType: typeof action, item: EquipmentTypeType | Equipments) => {
    setSelectedItem(item)
    setAction(actionType)
    setOpenModal(true)
  }

  const handleDelete = async (table: "equipment" | "equipment_type") => {
    if (!selectedItem) return

    const result = await DeleteEquipment({table: table, item: selectedItem})

    if (!result.status) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
      if (table === 'equipment') {
        queryClient.invalidateQueries({ queryKey: ["equipment-data"] })
      } else if (table === 'equipment_type') {
        queryClient.invalidateQueries({ queryKey: ["equipment-type-data"] })
      }
      
      setOpenModal(false)
    }
  } 

  useEffect(() => {
      if (!equipmentData?.data) return;
      if (!typeData?.data) return;

      const newTypeCounts: EquipmentTypeStatusCount = {
        total: typeData.data.length,
        public: 0,
      }

      const newCounts: EquipmentStatusCount = {
          total: equipmentData.data.length,
          stored: 0,
          out: 0,
          returned: 0,
          maintenance: 0,
      };

    equipmentData.data.forEach((req) => {
          if (req.status in newCounts) {
          newCounts[req.status as keyof EquipmentStatusCount] += 1;
          }
      });

      typeData.data.forEach((req: EquipmentTypeType) => {
        if (req.is_public) {
          newTypeCounts.public += 1;
        }
      })

      setStatusCount(newCounts);
      setTypeStatusCount(newTypeCounts);
  }, [equipmentData, typeData]);

  // Render modal content
  const renderModalContent = () => {
    if (!action || !selectedItem) return null

    switch (action) {
      case "equipment-update":
        return <EquipmentUpdateForm equipment={selectedItem as Equipments} onClose={() => setOpenModal(false)}/>

      case "equipment-delete":
        return (
          <div>
            <p>Are you sure you want to delete this equipment?</p>
            <CancelConfirmButtons
              onCancel={() => setOpenModal(false)}
              onConfirm={() => handleDelete('equipment')}
            />
          </div>
        )

      case "type-update":
        return <EquipmentTypeUpdateForm equipmentType={selectedItem as EquipmentTypeType} onClose={() => setOpenModal(false)}/>

      case "type-delete":
        return (
          <div>
            <p>Are you sure you want to delete this equipment type?</p>
            <CancelConfirmButtons
              onCancel={() => setOpenModal(false)}
              onConfirm={() => handleDelete('equipment_type')}
            />
          </div>
        )

      default:
        return null
    }
  }

  // Component
  return (
    <div className="flex flex-col gap-y-4 h-full">
      <div className="col-span-2 mt-4 border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Equipment inventory</h1>
        <p className="mt-1 text-gray-600 text-sm">
          Manage the list of available equipment and update their quantities.
        </p>
      </div>

      {/* Counter */}
      {isEquipmentTypeVisible ? (
        <CardWrapper>
          {Object.entries(typeStatusCount).map(([status, count], index) => (
              isLoading ? (
                  <Skeleton key={index} className="h-20 flex-1"/>
              ) : (
                  <CardContainer key={index}>
                      <CardContent>
                          <p className="text-2xl font-bold text-center">{count as number}</p>
                      </CardContent>
                      <CardDescription>
                          <h3 className={`text-sm  text-center px-1 rounded-xl capitalize ${getStatusStyles(status)}`}>{status === 'total' ?  `Total no. of equipment type` : status}</h3>
                      </CardDescription>
                  </CardContainer>
              )
          ))}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {Object.entries(statusCount).map(([status, count], index) => (
              isLoading ? (
                  <Skeleton key={index} className="h-20 flex-1"/>
              ) : (
                  <CardContainer key={index}>
                      <CardContent>
                          <p className="text-2xl font-bold text-center">{count as number}</p>
                      </CardContent>
                      <CardDescription>
                          <h3 className={`text-sm  text-center px-1 rounded-xl capitalize ${getStatusStyles(status)}`}>{status === 'total' ?  `Total no. of equipment` : status}</h3>
                      </CardDescription>
                  </CardContainer>
              )
          ))}
        </CardWrapper>
      )}

      {/* Toggle to change between equipments table and equipment types table */}
        {isLoading ? (
          <div className="flex justify-end">
            <Skeleton className="h-10 w-1/5"/>
          </div>
        ) : (
          <div className="flex justify-end">
            <div className="flex w-fit rounded-lg border-1 p-1 text-sm text-nowrap">
              <button 
                className={`flex-1 py-1 px-2 rounded-lg hover:cursor-pointer ${!isEquipmentTypeVisible ? 'bg-blue-100 text-slate-700 border-gray-400' : 'text-slate-400' }`}
                onClick={() => setIsEquipmentTypeVisible(false)}
                >
                Equipments
              </button>
              <button 
                className={`flex-1 py-1 px-2 rounded-lg hover:cursor-pointer ${isEquipmentTypeVisible ? 'bg-blue-100 text-slate-700 border-gray-400' : 'text-slate-400' }`}
                onClick={() => setIsEquipmentTypeVisible(true)}
              >
                Equipment Types
              </button>
            </div>
          </div>
        )}
      
      <div className="grow">
        {isLoading ? (
          <TableLoadingSkeleton/>
        ) : !isEquipmentTypeVisible ? (
          <EquipmentsDataTable
            columns={adminEquipmentColumns({ 
              onUpdate: (item) => handleAction('equipment-update', item), 
              onDelete: (item) => handleAction('equipment-delete', item)
            })}
            data={equipmentData?.data || []}
            isEquipmentType={isEquipmentTypeVisible}
            isAdminLayout={true}
            pageSize={7}
          />
        ) : (
          <EquipmentsDataTable
            columns={adminEquipmentTypeColumns({ 
              onUpdate: (item) => handleAction('type-update', item), 
              onDelete: (item) => handleAction('type-delete', item) 
            })}
            data={typeData?.data || []}
            isEquipmentType={isEquipmentTypeVisible}
            isAdminLayout={true}
            pageSize={7}
          />
        )}
      </div>
      
      {openModal && (
        <Modal 
          header={
            action === "equipment-update" ? "Update Equipment" :
            action === "equipment-delete" ? "Delete Equipment" :
            action === "type-update" ? "Update Type" :
            action === "type-delete" ? "Delete Type" :
            ""
          }
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        >
          {renderModalContent()}
        </Modal>
      )}
    </div>
  )
}

export { AdminEquipments }