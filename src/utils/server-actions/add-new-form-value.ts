'use server'

import { formatSpaceToUnderscore } from "../handlers/capitalize"
import { createClient } from "../supabase/server"

interface ActionProps {
    table: 'department' | 'designation' | 'purpose' | 'type_of_request' | 'location_of_use' | 'grade_level' | 'place_of_use' | 'subject' | null,
    form: FormData
}

const AddNewValue = async ({ table, form }: ActionProps) => {
    if (table === null) {
        return { status: false, message: "Error table does not exist" }
    }
    
    const supabase = await createClient()

    const formData = {
        name: form.get('name') as string,
        department: form.get('department') as string,
        level: form.get('level') as string,
        room: form.get('room') as string,
        number: form.get('number') as string,
        subject: form.get('subject') as string,
    }

    switch (table) {
        case "department":
            const { error: departmentError } = await supabase
            .from('department')
            .insert({
                name: formatSpaceToUnderscore(formData.name)
            })

            if (departmentError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        case "designation":
            const { error: designationError } = await supabase
            .from('designation')
            .insert({
                name: formatSpaceToUnderscore(formData.name)
            })

            if (designationError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        case "purpose":
            const { error: purposeError } = await supabase
            .from('purpose')
            .insert({
                name: formatSpaceToUnderscore(formData.name)
            })

            if (purposeError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        case "type_of_request":
            const { error: typeError } = await supabase
            .from('type_of_request')
            .insert({
                name: formatSpaceToUnderscore(formData.name)
            })

            if (typeError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        case "location_of_use":
            const { error: locationError } = await supabase
            .from('location_of_use')
            .insert({
                name: formatSpaceToUnderscore(formData.name)
            })

            if (locationError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        case "grade_level":
            const { error: gradeError } = await supabase
            .from('grade_level')
            .insert({
                department: formData.department,
                level: formData.level
            })

            if (gradeError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        case "place_of_use": 
            const { error: placeError } = await supabase
            .from('place_of_use')
            .insert({
                department: formData.department,
                room: formData.room,
                number: formData.number
            })

            if (placeError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        case "subject":
            const { error: subjectError } = await supabase
            .from('subject')
            .insert({
                department: formData.department,
                name: formatSpaceToUnderscore(formData.subject),
            })

            if (subjectError) {
                return { status: false, message: "Error adding new value"}
            }
            break;

        default: 
            return { status: false, message: "Not a valid table"}
    }

    return {  status: true, message: "New value added successfully" }
}

export { AddNewValue }