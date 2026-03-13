'use server'

import { createClient } from "../supabase/server"
import { GetUserInfo } from "../data/decode";
import { CapitalizeAll, formatLabel } from "../handlers/capitalize";

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

interface Equipment {
    id: string;
    type_name: string;
}

interface Venue {
    id: string;
    venue_name: string;
}

const GetRecentRequestData = async () => {
    const supabase = await createClient()

    const { data: currentUser, error: AuthErr } = await supabase.auth.getUser();
    const user = currentUser.user?.id;

    if (!user || AuthErr) {
        return {status: false, message: "User Not Found!"}
    };

    const { data: requestData, error: requestError } = await supabase
        .from('bookings')
        .select(`
            id,
            purpose: purpose_id(purpose_name),
            equipment_id,
            venue_id,
            subject: subject_id(subject_name),
            date_of_use,
            place_of_use: place_of_use_id(room, number),
            time_of_start,
            time_of_end,
            status
        `)
        .eq('user_id', user)
        .order("date_of_use", { ascending: true })

    if (requestError) {
        return { status: false, message: "Error Fetching Your Recent Requests" }
    }

    // Collect all unique IDs across all bookings
    const allEquipmentIds = [...new Set(requestData.flatMap(r => r.equipment_id).filter(Boolean))]
    const allVenueIds     = [...new Set(requestData.flatMap(r => r.venue_id).filter(Boolean))]

    // Fetch equipment and venues in bulk (adjust table/column names as needed)
    const [{ data: equipmentData }, { data: venueData }] = await Promise.all([
        allEquipmentIds.length > 0
            ? supabase.from('equipment_type').select('id, type_name').in('id', allEquipmentIds)
            : { data: [] },
        allVenueIds.length > 0
            ? supabase.from('venue_type').select('id, venue_name').in('id', allVenueIds)
            : { data: [] },
    ])

    // Build lookup maps for O(1) access
    const equipmentMap = Object.fromEntries((equipmentData ?? []).map((e: Equipment) => [e.id, e]))
    const venueMap     = Object.fromEntries((venueData ?? []).map((v: Venue) => [v.id, v]))

    // Enrich each booking with the resolved records
    const enrichedData: RecentRequests[] = requestData.map((row: any) => {
        return {
            id: row.id,
            date_of_use: row.date_of_use,
            time_of_start: row.time_of_start,
            time_of_end: row.time_of_end,
            status: row.status,
            // Map arrays and handle potential nulls
            equipment: (row.equipment_id || [])
                .map((id: string) => equipmentMap[id])
                .filter(Boolean),
            venue: (row.venue_id || [])
                .map((id: string) => venueMap[id])
                .filter(Boolean),
            // Safely access nested joined objects
            purpose: row.purpose?.[0]?.purpose_name ?? row.purpose?.purpose_name ?? null,
            subject: row.subject?.[0]?.subject_name ?? row.subject?.subject_name ?? null,
            place_of_use: row.place_of_use ? {
                room: row.place_of_use[0]?.room ?? row.place_of_use?.room ?? null,
                number: row.place_of_use[0]?.number ?? row.place_of_use?.number ?? null
            } : null
        };
    });

    return { status: true, message: "Fetched Recent Requests Successfully" , data: enrichedData }
}

const GetAdminRequestData = async () => {
    const supabase = await createClient()
    const user = await GetUserInfo()

    const today = new Date().toISOString().split('T')[0];
    
    if(!user) return null

    // 1. Build the base query
    let query = supabase
        .from('bookings')
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

    // 2. Apply Role-based filtering
    // If they ARE admin/mod, filter by their specific office
    if (user.role === "administrator" || user.role === "moderator") {
        query = query.eq('office_id', user.office_id).order('date_of_use', { ascending: true }).order('time_of_start', { ascending: true }) // Ensure this matches your DB column name
    }

    // 3. APPLY THE SORTING (Crucial Part)
    // We sort by Date first (ascending), then Time (ascending)
    // This puts the soonest appointment at the very top.
    const { data: requestData, error: requestError } = await query
        .order('date_of_use', { ascending: true })
        .order('time_of_start', { ascending: true })

    // 4. Fetch Office List
    const { data: officeData, error: officeError } = await supabase
        .from('offices')
        .select('office_name, id')

    if (officeError || requestError) {
        console.error("Request Error: ", requestError || officeError)
        return null;
    }

    // ! TODO: FIX THIS PARA MAS CLEANER ANG OBJECT NA IRETURN
    // ✅ Added: Bulk fetch equipment and venues — same pattern as GetRecentRequestData
    const allEquipmentIds = [...new Set((requestData ?? []).flatMap(r => r.equipment_id).filter(Boolean))]
    const allVenueIds     = [...new Set((requestData ?? []).flatMap(r => r.venue_id).filter(Boolean))]

    const [{ data: equipmentData }, { data: venueData }] = await Promise.all([
        allEquipmentIds.length > 0
            ? supabase.from('equipment_type').select('id, type_name').in('id', allEquipmentIds)
            : { data: [] },
        allVenueIds.length > 0
            ? supabase.from('venue_type').select('id, venue_name').in('id', allVenueIds)
            : { data: [] },
    ])

    const equipmentMap = Object.fromEntries((equipmentData ?? []).map((e: Equipment) => [e.id, e]))
    const venueMap     = Object.fromEntries((venueData ?? []).map((v: Venue) => [v.id, v]))

    // ✅ Added: Enrich each booking row with resolved equipment and venue objects
    const enriched: AdminRequests[] = (requestData ?? []).map((row: any) => ({
        id: row.id,
        created_at: row.created_at,
        user_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        contact_number: row.contact_number,
        date_of_use: row.date_of_use,
        time_of_start: row.time_of_start,
        time_of_end: row.time_of_end,
        status: row.status,
        is_active: row.is_active,
        designation: row.designation?.designation_name ?? null,
        department: row.department?.department_name ?? null,
        grade_level: row.grade_level?.grade_level ?? null,
        purpose: row.purpose?.purpose_name ?? null,
        location_of_use: row.location_of_use?.location_name ?? null,
        place_of_use: row.place_of_use
            ? { room: row.place_of_use.room ?? null, number: row.place_of_use.number ?? null }
            : null,
        subject: row.subject?.subject_name ?? null,
        office: row.office?.office_name ?? null,
        equipment: (row.equipment_id || []).map((id: string) => equipmentMap[id]).filter(Boolean),
        venue: (row.venue_id || []).map((id: string) => venueMap[id]).filter(Boolean),
    }));

    const sorted = (enriched ?? []).sort((a, b) => {
        const aIsPast = a.date_of_use < today;
        const bIsPast = b.date_of_use < today;

        // If one is past and the other isn't, non-past comes first
        if (aIsPast !== bIsPast) return aIsPast ? 1 : -1;

        // Both in same group → sort by date then time ascending
        const dateCompare = a.date_of_use.localeCompare(b.date_of_use);
        if (dateCompare !== 0) return dateCompare;
        return a.time_of_start.localeCompare(b.time_of_start);
    });

    const normalizeData = [
        { label: "All Offices", value: "" },
        ...officeData.map((item) => ({
            label: formatLabel(item.office_name) as string,
            value: item.id as string,
        })),
    ]

    return { 
        requestData: sorted, 
        officeData: normalizeData 
    };
}


export { GetRecentRequestData, GetAdminRequestData }