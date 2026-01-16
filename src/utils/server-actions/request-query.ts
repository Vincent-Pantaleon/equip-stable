'use server'

import { createClient } from "../supabase/server"
import { GetUserInfo } from "../data/decode";
import { formatLabel } from "../handlers/capitalize";

// ------------------------------
// 🔧 NORMALIZER HELPERS (Top of file)
// ------------------------------
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



// TODO: DO THIS BRUH
const GetRecentRequestData = async () => {
    const supabase = await createClient()

    const { data: currentUser, error: AuthErr } = await supabase.auth.getUser();
    const user = currentUser.user?.id;

    if ( !user || AuthErr ) {
        return null
    }

    const { data: requestData, error: requestError } = await supabase
        .from('bookings')
        .select(`
            id,
            user_id,
            created_at,
            first_name,
            last_name,
            designation: designation_id(id, designation_name),
            department: department_id(id, department_name),
            contact_number,
            grade_level: grade_level_id(id, grade_level, department: department_id(department_name)),
            purpose: purpose_id(id, purpose_name),
            type_of_request: type_of_request_id(id, type_name),
            location_of_use: location_of_use_id(id, location_name),
            place_of_use: place_of_use_id(id, room, number, department: department_id(department_name)),
            equipment: equipment_id(id, type_name),
            subject: subject_id(id, subject_name, department: department_id(department_name)),
            date_of_use,
            time_of_start,
            time_of_end,
            status,
            is_active,
            venue: venue_id(id, venue_name),
            office: office_id(id, office_name)    
        `)
        .eq('user_id', user)
        .order('created_at', { ascending: false })

    if (requestError) {
        console.log(requestError)
        return null
    }   
    
    return requestData ? normalizeRequestArray(requestData) : null;
}

const GetAdminRequestData = async () => {
    const supabase = await createClient()

    const user = await GetUserInfo()
    
    if(!user) {
        return null
    }
    // TODO: FIX THIS SHIT, why is the administrator and moderator condition not working

    let requestData: any[] | null = null;
    let requestError: any | null = null;
 
    // Adjust this shit
    if (user.role === "administrator" || user.role === "moderator") {
        const { data, error } = await supabase
        .from('bookings')
        .select(`
            id,
            user_id,
            created_at,
            first_name,
            last_name,
            designation: designation_id(id, designation_name),
            department: department_id(id, department_name),
            contact_number,
            grade_level: grade_level_id(id, grade_level, department: department_id(department_name)),
            purpose: purpose_id(id, purpose_name),
            type_of_request: type_of_request_id(id, type_name),
            location_of_use: location_of_use_id(id, location_name),
            place_of_use: place_of_use_id(id, room, number, department: department_id(department_name)),
            equipment: equipment_id(id, type_name),
            subject: subject_id(id, subject_name, department: department_id(department_name)),
            date_of_use,
            time_of_start,
            time_of_end,
            status,
            is_active,
            venue: venue_id(id, venue_name),
            office: office_id(id, office_name)    
        `)
        .order('created_at', { ascending: false })
        .eq('office', user.office_id)

        requestData = data;
        requestError = error;

    } else {
        const { data, error } = await supabase
        .from('bookings')
        .select(`
            id,
            user_id,
            created_at,
            first_name,
            last_name,
            designation: designation_id(id, designation_name),
            department: department_id(id, department_name),
            contact_number,
            grade_level: grade_level_id(id, grade_level, department: department_id(department_name)),
            purpose: purpose_id(id, purpose_name),
            type_of_request: type_of_request_id(id, type_name),
            location_of_use: location_of_use_id(id, location_name),
            place_of_use: place_of_use_id(id, room, number, department: department_id(department_name)),
            equipment: equipment_id(id, type_name),
            subject: subject_id(id, subject_name, department: department_id(department_name)),
            date_of_use,
            time_of_start,
            time_of_end,
            status,
            is_active,
            venue: venue_id(id, venue_name),
            office: office_id(id, office_name)    
        `)
        .order('created_at', { ascending: false })
    

        requestData = data;
        requestError = error;
    }

    const { data: officeData, error: officeError } = await supabase
    .from('offices')
    .select('office_name, id')

    if (officeError || requestError) {
        console.log("Request Error: ", requestError)
        return null;
    }

    const normalizeData = [
        { label: "All Offices", value: "" }, // 👈 blank = no filter
            ...officeData.map((item) => ({
                label: formatLabel(item.office_name) as string,
                value: item.id as string,
        })),
    ]

    return { 
        requestData: normalizeRequestArray(requestData ?? []), 
        officeData: normalizeData 
    };
}


export { GetRecentRequestData, GetAdminRequestData }