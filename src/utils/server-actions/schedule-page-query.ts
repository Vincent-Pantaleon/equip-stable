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

interface Equipment {
    id: string;
    type_name: string;
}

interface Venue {
    id: string;
    venue_name: string;
}

export default async function GetApprovedRequests() {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();

    if (authErr || !user) return { status: false, message: "User not authenticated" };

    // 1. Fetch the base booking data
    const { data: requestData, error: requestError } = await supabase
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
            grade_level: grade_level_id(grade_level),
            purpose: purpose_id(purpose_name),
            type_of_request: type_of_request_id(type_name),
            location_of_use: location_of_use_id(location_name),
            place_of_use: place_of_use_id(room, number),
            equipment_id,
            subject: subject_id(subject_name),
            date_of_use,
            time_of_start,
            time_of_end,
            status,
            is_active,
            venue_id,
            office: office_id(id, office_name)    
        `)
        .eq("status", "approved")
        .eq("user_id", user.id)
        .order("date_of_use", { ascending: false });

    if (requestError) {
        return { status: false, message: "Error Fetching Your Approved Requests" };
    }

    if (!requestData || requestData.length === 0) return { status: true, data: [] };

    // 2. Extract Unique IDs for Equipment and Venues
    const allEqIds = [...new Set(requestData.flatMap(r => r.equipment_id).filter(Boolean))];
    const allVnIds = [...new Set(requestData.flatMap(r => r.venue_id).filter(Boolean))];

    // 3. Parallel Fetch for related lookup data
    const [{ data: eqLookup }, { data: vnLookup }] = await Promise.all([
        allEqIds.length > 0 
            ? supabase.from('equipment_type').select('id, type_name').in('id', allEqIds) 
            : { data: [] },
        allVnIds.length > 0 
            ? supabase.from('venue_type').select('id, venue_name').in('id', allVnIds) 
            : { data: [] }
    ]);

    // 4. Create Maps for O(1) lookup
    const eqMap = Object.fromEntries((eqLookup ?? []).map((e: Equipment )=> [e.id, e]));
    const vnMap = Object.fromEntries((vnLookup ?? []).map((v: Venue) => [v.id, v]));

    // 5. Enrich the data
    const enrichedData: Request[] = requestData.map((row: any) => ({
        ...row,
        equipment: (row.equipment_id || [])
            .map((id: string) => eqMap[id])
            .filter(Boolean),
        venue: (row.venue_id || [])
                .map((id: string) => vnMap[id])
                .filter(Boolean),
        designation: row.designation?.designation_name || null,
        department: row.department?.department_name || null,
        purpose: row.purpose?.purpose_name || null,
        location_of_use: row.location_of_use?.location_name || null,
        office: row.office?.office_name || null
    }));

    return { 
        status: true, 
        message: "Fetched Approved Requests Successfully", 
        data: enrichedData 
    };
}
