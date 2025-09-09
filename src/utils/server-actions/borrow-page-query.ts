'use server'

import { createClient } from "@/utils/supabase/server"

interface Option {
  label: string;
  value: string;
}

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
    supabase.from("department").select("id, name"),
    supabase.from("designation").select("id, name"),
    supabase.from("grade_level").select("id, department: department(name), level"),
    supabase.from("type_of_request").select("id, name"),
    supabase.from("place_of_use").select("id, department: department(name), room, number"),
    supabase.from("location_of_use").select("id, name"),
    supabase.from("subject").select("id, department: department(name), name"),
    supabase.from("purpose").select("id, name"),
    supabase.from("equipment").select("id, type: type(type)")
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
  const normalize = (rows: any[], formatter: (item: any) => string): Option[] =>
    Array.isArray(rows) ? rows.map((item) => ({
      label: formatter(item),
      value: item.id ?? formatter(item) // fallback if no id
    })) : []

  return {
    department: normalize(deptRes.data, (i) => i.name),
    designation: normalize(designationRes.data, (i) => i.name),
    gradeLevel: normalize(gradeRes.data, (i) => `${i.department?.name} ${i.level}`),
    typeOfRequest: normalize(requestTypeRes.data, (i) => i.name),
    placeOfUse: normalize(placeRes.data, (i) => `${i.department?.name} ${i.room} ${i.number}`),
    locationOfUse: normalize(locationRes.data, (i) => i.name),
    subject: normalize(subjectRes.data, (i) => `${i.department?.name} ${i.name}`),
    purpose: normalize(purposeRes.data, (i) => i.name),
    equipment: normalize(equipmentRes.data, (i) => i.type?.type)
  }
}
