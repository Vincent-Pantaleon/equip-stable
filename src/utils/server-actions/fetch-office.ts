'use server'

import { createClient } from "../supabase/server"
import { formatLabel } from "../handlers/capitalize"

const FetchOfficeOptions = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('offices')
    .select('id, office_name')

    if (error) {
        return { status: false, message: "Error fetching office options" }
    }

        const normalizeData = [
            { label: "All Offices", value: "" }, // 👈 blank = no filter
                ...data.map((item) => ({
                    label: formatLabel(item.office_name),
                    value: item.id,
            })),
        ]

    return { status: true, message: "Office options fetched successfully", data: normalizeData}
}

export { FetchOfficeOptions }