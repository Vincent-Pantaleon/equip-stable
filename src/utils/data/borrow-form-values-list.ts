'use client'

import { useQuery } from '@tanstack/react-query'
import { GetAllBorrowFormData } from '@/utils/server-actions/borrow-page-query'

import {
  DesignationColumns,
  DepartmentColumns,
  LocationOfUseColumns,
  PlaceOfUseColumns,
  PurposeColumns,
  SubjectColumns,
  TypeOfRequestColumns,
  GradeLevelColumns,
} from '@/utils/table-columns/borrow-form-values-column'

import { toast } from 'sonner'

// Define a shared handler type
type ActionHandler<T> = (item: T) => void

export const useFormDataValues = (
    handleAction: (actionType: string, item: any, table: string) => void
) => {
    const { data, error, isPending } = useQuery({
        queryKey: ['borrow-form-values'],
        queryFn: GetAllBorrowFormData,
        staleTime: 1000 * 60 * 5,
    })

    if (error) {
        toast.error('Error fetching form data')
    }

    console.log(data)

    // Provide reusable table configurations
    const tables = [
        {
            label: 'Department',
            columns: DepartmentColumns({
                onDelete: (item) => handleAction('delete-department', item, 'department'),
                onUpdate: (item) => handleAction('update-department', item, 'department'),
            }),
            data: data?.deptRes.data ?? [],
        },
        {
            label: 'Designation',
            columns: DesignationColumns({
                onDelete: (item) => handleAction('delete-designation', item, 'designation'),
                onUpdate: (item) => handleAction('update-designation', item, 'designation'),
            }),
            data: data?.designationRes.data ?? [],
        },
        {
            label: 'Purpose',
            columns: PurposeColumns({
                onDelete: (item) => handleAction('delete-purpose', item, 'purpose'),
                onUpdate: (item) => handleAction('update-purpose', item, 'purpose'),
            }),
            data: data?.purposeRes.data ?? [],
        },
        {
            label: 'Type of Request',
            columns: TypeOfRequestColumns({
                onDelete: (item) => handleAction('delete-request', item, 'type_of_request'),
                onUpdate: (item) => handleAction('update-request', item, 'type_of_request'),
            }),
            data: data?.requestTypeRes.data ?? [],
        },
        {
            label: 'Location of Use',
            columns: LocationOfUseColumns({
                onDelete: (item) => handleAction('delete-location', item, 'location_of_use'),
                onUpdate: (item) => handleAction('update-location', item, 'location_of_use'),
            }),
            data: data?.locationRes.data ?? [],
        },
        {
            label: 'Grade Level',
            columns: GradeLevelColumns({
                onDelete: (item) => handleAction('delete-grade', item, 'grade_level'),
                onUpdate: (item) => handleAction('update-grade', item, 'grade_level'),
            }),
            data: data?.gradeRes.data ?? [],
        },
        {
            label: 'Place of Use',
            columns: PlaceOfUseColumns({
                onDelete: (item) => handleAction('delete-place', item, 'place_of_use'),
                onUpdate: (item) => handleAction('update-place', item, 'place_of_use'),
            }),
            data: data?.placeRes.data ?? [],
        },
        {
            label: 'Subject',
            columns: SubjectColumns({
                onDelete: (item) => handleAction('delete-subject', item, 'subject'),
                onUpdate: (item) => handleAction('update-subject', item, 'subject'),
            }),
            data: data?.subjectRes.data ?? [],
        },
    ]

    return { isPending, error, tables }
}
