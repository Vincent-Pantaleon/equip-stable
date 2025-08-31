'use server'

import { createClient } from "@/utils/supabase/server"

export async function GetBorrowFormData() {
    const supabase = await createClient()

    const [deptRes, designationRes, gradeRes, requestTypeRes, placeRes, locationRes, subjectRes, purposeRes, equipmentRes] = await Promise.all([
      supabase.from('department').select('name'),
      supabase.from('designation').select('name'),
      supabase.from('grade_level').select('department: department(name), level'),
      supabase.from('type_of_request').select('name'),
      supabase.from('place_of_use').select('department: department(name), room, number'),
      supabase.from('location_of_use').select('name'),
      supabase.from('subject').select('department: department(name), name'),
      supabase.from('purpose').select('name'),
      supabase.from('equipment').select('type: type(name)')
    ]);

    if ( 
        deptRes.error || 
        designationRes.error || 
        gradeRes.error || 
        requestTypeRes.error || 
        placeRes.error ||
        locationRes.error ||
        subjectRes.error ||
        purposeRes.error ||
        equipmentRes.error
    ) {
        console.log(deptRes.error)
        console.log(designationRes.error)
        console.log(gradeRes.error)
        console.log(requestTypeRes.error)
        console.log(placeRes.error)
        console.log(locationRes.error)
        console.log(subjectRes.error)
        console.log(purposeRes.error)
        console.log(equipmentRes.error)
        return null
    }

    const normalizeData = (data: any[]) => {
        return Array.isArray(data)
            ? data.map((item) => ({
                ...item,
                department: Array.isArray(item.department) ? item.department[0] : item.department,
            }))
            : [];
    };

    return {
        department: deptRes.data, 
        designation: designationRes.data, 
        gradeLevel: normalizeData(gradeRes.data), 
        typeOfRequest: requestTypeRes.data,
        placeOfUse: normalizeData(placeRes.data),
        locationOfUse: locationRes.data,
        subject: normalizeData(subjectRes.data),
        purpose: purposeRes.data,
        equipment: normalizeData(equipmentRes.data)
    }
}