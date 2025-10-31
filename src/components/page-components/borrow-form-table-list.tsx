'use client'

import { BorrowFormValuesDataTable } from "../tables/borrow-form-table";
import { useQuery } from "@tanstack/react-query";
import { GetAllBorrowFormData } from "@/utils/server-actions/borrow-page-query";

import { 
    DesignationColumns,
    DepartmentColumns,
    LocationOfUseColumns,
    PlaceOfUseColumns,
    PurposeColumns,
    SubjectColumns,
    TypeOfRequestColumns,
    GradeLevelColumns,
    EquipmentColumns
} from "@/utils/table-columns/borrow-form-values-column";

import { toast } from "sonner";


const FormValuesTableList = () => {

    const { data, error, isPending } = useQuery({
        queryKey: ['borrow-form-values'],
        queryFn: GetAllBorrowFormData,
        staleTime: 1000 * 60 * 5
    })
    
    const TablesList = [
        { label: "Department", columns: DepartmentColumns, data: data?.deptRes.data },
        { label: "Designation", columns: DesignationColumns, data: data?.designationRes.data },
        { label: "Purpose", columns: PurposeColumns, data: data?.purposeRes.data },
        { label: "Type of Request", columns: TypeOfRequestColumns, data: data?.requestTypeRes.data },
        { label: "Location of Use", columns: LocationOfUseColumns, data: data?.locationRes.data },
        { label: "Grade Level", columns: GradeLevelColumns, data: data?.gradeRes.data },
        { label: "Place of Use", columns: PlaceOfUseColumns, data: data?.placeRes.data },
        { label: "Subject", columns: SubjectColumns, data: data?.subjectRes.data }
    ]

    if (error) {
        toast.error('Error fetching form data')
    }

    return (
        <div className="space-y-4">
            <div className="mt-4 mb-4 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Borrow Form Values</h1>
                <p className="mt-1 text-gray-600 text-sm">
                    Add or remove data to be shown in the dropdowns for the borrow form
                </p>
            </div>
            
            {isPending ? (
                <div>
                    Fetching data...
                    {/* replace with proper loading skeleton/animation */}
                </div>
            ) : (
                TablesList.map((item, index) => (
                        <BorrowFormValuesDataTable
                            columns={item.columns}
                            data={item.data ?? []}
                            header={item.label}
                            key={index}
                        />
                ))
            )}
        </div>
    )
} 

export { FormValuesTableList }