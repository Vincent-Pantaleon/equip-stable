'use server'

import { createClient } from "@/utils/supabase/server"
import { formatLabel, LowercaseAll, CapitalizeAll } from "../handlers/capitalize";


export async function GetBorrowFormData() {
    const supabase = await createClient()

    const [
      deptRes,
      designationRes,
      gradeRes,
      requestTypeRes,
      placeRes,
      locationRes,
      subjectRes,
      purposeRes,
      equipmentRes,
      officeRes,
      venueRes
    ] = await Promise.all([
      supabase.from("department").select("id, department_name"),
      supabase.from("designation").select("id, designation_name"),
      supabase.from("grade_level").select("id, department: department_id(id), grade_level"),
      supabase.from("type_of_request").select("id, type_name"),
      supabase.from("place_of_use").select("id, department: department_id(id), room, number"),
      supabase.from("location_of_use").select("id, location_name"),
      supabase.from("subject").select("id, department: department_id(id), subject_name"),
      supabase.from("purpose").select("id, purpose_name"),
      supabase.from("equipment_type").select("id, type_name, office: office_id(id)").eq('is_public', true),
      supabase.from("offices").select("id, office_name"),
      supabase.from("venue_type").select("id, venue_name, office: office_id(id)").eq('is_public', true)
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
      equipmentRes.error || 
      officeRes.error ||
      venueRes.error
    ) {
      console.error({
        dept: deptRes.error,
        designation: designationRes.error,
        grade: gradeRes.error,
        requestType: requestTypeRes.error,
        place: placeRes.error,
        location: locationRes.error,
        subject: subjectRes.error,
        purpose: purposeRes.error,
        equipment: equipmentRes.error,
        office: officeRes.error,
        venue: venueRes.error
      })
      return null
    }

    // 🔧 Helpers to normalize into {label, value}
    const normalize = (rows: any[], formatter: (item: any) => string): OptionType[] =>
      Array.isArray(rows) ? rows.map((item) => ({
        label: formatLabel(formatter(item)),
        value: item.id.toString(),
        group: item.department?.id?.toString() ?? item.office?.id?.toString() ?? null,
    })) : []

    const data = {
      department: normalize(deptRes.data, (i) => i.department_name),
      designation: normalize(designationRes.data, (i) => i.designation_name),
      gradeLevel: normalize(gradeRes.data, (i) => `Grade ${i.grade_level}`),
      typeOfRequest: normalize(requestTypeRes.data, (i) => i.type_name),
      placeOfUse: normalize(placeRes.data, (i) => `${i.room} ${i.number}`),
      locationOfUse: normalize(locationRes.data, (i) => `${i.location_name}`),
      subject: normalize(subjectRes.data, (i) => `${i.subject_name}`),
      purpose: normalize(purposeRes.data, (i) => i.purpose_name),
      equipment: normalize(equipmentRes.data, (i) => i.type_name),
      office: normalize(officeRes.data, (i) => i.office_name),
      venue: normalize(venueRes.data, (i) => i.venue_name)
    }

    return data
}

export async function GetAllBorrowFormData() {
    const supabase = await createClient()

    const [
      deptRes,
      designationRes,
      gradeRes,
      requestTypeRes,
      placeRes,
      locationRes,
      subjectRes,
      purposeRes,
    ] = await Promise.all([
      supabase.from("department").select("*").order('created_at', { ascending: false }),
      supabase.from("designation").select("*").order('created_at', { ascending: false }),
      supabase.from("grade_level").select("*, department: department_id(id, department_name)").order('created_at', { ascending: false }),
      supabase.from("type_of_request").select("*").order('created_at', { ascending: false }),
      supabase.from("place_of_use").select("*, department: department_id(id, department_name)").order('created_at', { ascending: false }),
      supabase.from("location_of_use").select("*").order('created_at', { ascending: false }),
      supabase.from("subject").select("*, department: department_id(id, department_name)").order('created_at', { ascending: false }),
      supabase.from("purpose").select("*").order('created_at', { ascending: false }),
    ]);

    if (
      deptRes.error ||
      designationRes.error ||
      gradeRes.error ||
      requestTypeRes.error ||
      placeRes.error ||
      locationRes.error ||
      subjectRes.error ||
      purposeRes.error
    ) {
      console.error({
        dept: deptRes.error,
        designation: designationRes.error,
        grade: gradeRes.error,
        requestType: requestTypeRes.error,
        place: placeRes.error,
        location: locationRes.error,
        subject: subjectRes.error,
        purpose: purposeRes.error,
      })
      return null
    }

    return {
      deptRes,
      designationRes,
      gradeRes,
      requestTypeRes,
      placeRes,
      locationRes,
      subjectRes,
      purposeRes,
    }
}