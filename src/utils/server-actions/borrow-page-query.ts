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
      equipmentRes
    ] = await Promise.all([
      supabase.from("department").select("name"),
      supabase.from("designation").select("name"),
      supabase.from("grade_level").select("department: department(name), level"),
      supabase.from("type_of_request").select("name"),
      supabase.from("place_of_use").select("department: department(name), room, number"),
      supabase.from("location_of_use").select("name"),
      supabase.from("subject").select("department: department(name), name"),
      supabase.from("purpose").select("name"),
      supabase.from("equipment_type").select("type")
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
      console.error({
        dept: deptRes.error,
        designation: designationRes.error,
        grade: gradeRes.error,
        requestType: requestTypeRes.error,
        place: placeRes.error,
        location: locationRes.error,
        subject: subjectRes.error,
        purpose: purposeRes.error,
        equipment: equipmentRes.error
      })
      return null
    }

    // 🔧 Helpers to normalize into {label, value}
    const normalize = (rows: any[], formatter: (item: any) => string): OptionType[] =>
      Array.isArray(rows) ? rows.map((item) => ({
        label: formatLabel(formatter(item)),
        value: LowercaseAll(formatter(item)), // fallback if no id
        department: item.department?.name ? item.department.name : undefined,
      })) : []

    return {
      department: normalize(deptRes.data, (i) => i.name),
      designation: normalize(designationRes.data, (i) => i.name),
      gradeLevel: normalize(gradeRes.data, (i) => `${i.level}`),
      typeOfRequest: normalize(requestTypeRes.data, (i) => i.name),
      placeOfUse: normalize(placeRes.data, (i) => `${i.room} ${i.number}`),
      locationOfUse: normalize(locationRes.data, (i) => `${i.name} Campus`),
      subject: normalize(subjectRes.data, (i) => `${i.name} `),
      purpose: normalize(purposeRes.data, (i) => i.name),
      equipment: normalize(equipmentRes.data, (i) => i.type)
    }
}
