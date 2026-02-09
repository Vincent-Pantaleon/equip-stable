'use server'

import { createClient } from "../supabase/server";

const normalizeRelation = (value: any) => {
    if (Array.isArray(value)) return value[0] ?? null;
    return value;
};

const deepNormalize = (obj: any) => {
    if (!obj || typeof obj !== "object") return obj;

    const normalized: any = {};

    for (const key in obj) {
        const val = obj[key];

        if (Array.isArray(val)) {
            normalized[key] = val.length ? deepNormalize(val[0]) : null;
        } else if (typeof val === "object") {
            normalized[key] = deepNormalize(val);
        } else {
            normalized[key] = val;
        }
    }
    return normalized;
};

const normalizeRequest = (request: any) => {
    const relationFields = [
        "designation",
        "department",
        "grade_level",
        "purpose",
        "type_of_request",
        "location_of_use",
        "place_of_use",
        "equipment",
        "subject",
        "venue",
        "office",
    ];

    const normalized = { ...request };

    relationFields.forEach((field) => {
        if (normalized[field]) {
            normalized[field] = deepNormalize(
                normalizeRelation(normalized[field])
            );
        }
    });

    return normalized;
};

const normalizeRequestArray = (arr: any[]) =>
    arr.map((item) => normalizeRequest(item));



export default async function GetApprovedRequests() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user.error) return null;

    const { data, error } = await supabase
        .from("bookings")
        .select(`
            id,
            user_id,
            created_at,
            first_name,
            last_name,
            designation: designation_id(designation_name),
            department: department_id(department_name),
            contact_number,
            grade_level: grade_level_id(grade_level, department: department_id(department_name)),
            purpose: purpose_id(purpose_name),
            type_of_request: type_of_request_id(type_name),
            location_of_use: location_of_use_id(location_name),
            place_of_use: place_of_use_id(room, number, department: department_id(department_name)),
            equipment: equipment_id(type_name),
            subject: subject_id(subject_name, department: department_id(department_name)),
            date_of_use,
            time_of_start,
            time_of_end,
            status,
            is_active,
            venue: venue_id(id, venue_name),
            office: office_id(id, office_name)    
        `)
        .eq("status", "approved")
        .eq("user_id", user.data.user?.id)
        .order("date_of_use", { ascending: false })

    if (error || !data || data.length === 0) return null;

    return normalizeRequestArray(data);

}
