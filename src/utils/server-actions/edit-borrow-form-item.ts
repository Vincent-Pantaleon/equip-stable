'use server'

import { createClient } from "../supabase/server"
import { formatSpaceToUnderscore } from "../handlers/capitalize"

interface ActionProps {
    table: string
    form: FormData | null
    item: any
}

const EditFormItem = async ({ table, form, item }: ActionProps) => {
    if (!form || !item) return;
    
    const supabase = await createClient()

    const formData = {
        name: form.get('name') as string,
        department: form.get('department') as string,
        level: form.get('level') as string,
        room: form.get('room') as string,
        subject: form.get('subject') as string,
        number: form.get('number') as string
    }

    switch (table) {
        case "department":
            const { error: departmentError } = await supabase
            .from('department')
            .update({
                department_name: formatSpaceToUnderscore(formData.name)
            })
            .eq('id', item.id)

            if (departmentError) {
                console.log(departmentError)
                return { status: false, message: "Error updating value"}
            }
            break;

        case "designation":
            const { error: designationError } = await supabase
            .from('designation')
            .update({
                designation_name: formatSpaceToUnderscore(formData.name)
            })
            .eq('id', item.id)

            if (designationError) {
                console.log(designationError)
                return { status: false, message: "Error updating value"}
            }
            break;

        case "purpose":
            const { error: purposeError } = await supabase
            .from('purpose')
            .update({
                purpose_name: formatSpaceToUnderscore(formData.name)
            })
            .eq('id', item.id)

            if (purposeError) {
                return { status: false, message: "Error updating value"}
            }
            break;

        case "type_of_request":
            const { error: typeError } = await supabase
            .from('type_of_request')
            .update({
                type_name: formatSpaceToUnderscore(formData.name)
            })
            .eq('id', item.id)

            if (typeError) {
                return { status: false, message: "Error updating value"}
            }
            break;

        case "location_of_use":
            const { error: locationError } = await supabase
            .from('location_of_use')
            .update({
                location_name: formatSpaceToUnderscore(formData.name)
            })
            .eq('id', item.id)

            if (locationError) {
                return { status: false, message: "Error updating value"}
            }
            break;

        case "grade_level":
            const { error: gradeError } = await supabase
            .from('grade_level')
            .update({
                department_id: formData.department,
                grade_level: formData.level
            })
            .eq('id', item.id)

            if (gradeError) {
                return { status: false, message: "Error updating value"}
            }
            break;

        case "place_of_use": 
            const { error: placeError } = await supabase
            .from('place_of_use')
            .update({
                department_id: formData.department,
                room: formData.room,
                number: formData.number
            })
            .eq('id', item.id)

            if (placeError) {
                return { status: false, message: "Error updating value"}
            }
            break;

        case "subject":
            const { error: subjectError } = await supabase
            .from('subject')
            .update({
                department_id: formData.department,
                subject_name: formatSpaceToUnderscore(formData.subject),
            })
            .eq('id', item.id)

            if (subjectError) {
                return { status: false, message: "Error updating value"}
            }
            break;

        default: 
            return { status: false, message: "Not a valid table"}
    }

    return { status: true, message: "Item updated successfully" }
}   

export { EditFormItem }