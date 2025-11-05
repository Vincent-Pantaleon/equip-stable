'use server'

import { createClient } from "../supabase/server"
import { formatLabel } from "../handlers/capitalize"

const FetchDepartmentOptions = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('department')
    .select('id, name')

    if (error) {
        return { status: false, message: "Error fetching departments" }
    }

    const departmentData = data.map((item) => (
        {
            label: formatLabel(item.name),
            value: item.id
        }
    )) 

    return { status: true, message: "Successfully fetched departments", data: departmentData }
}

export { FetchDepartmentOptions }