'use server'

import { createClient } from "../supabase/server"

const SendRequest = async (data: RequestData) => {
    const supabase = await createClient();

    // 1. Helper: Formats JS array into a Postgres Array Literal "{val1,val2}"
    // Also sorts them so [A, B] and [B, A] match the same record.
    const formatForPostgresArray = (arr: string[] | null | undefined) => {
        if (!arr || arr.length === 0) return null;
        const sorted = [...arr].sort();
        return `{${sorted.join(',')}}`;
    };

    // 2. Prepare Data
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    const equipmentList = formatForPostgresArray(data.equipment);
    const venueList = formatForPostgresArray(data.venue);

    // 3. DUPLICATE CHECK
    // We only flag a duplicate if the EXACT SAME SET is already booked for this time.
    let checkQuery = supabase
        .from('bookings')
        .select('id')
        .eq('date_of_use', data.date_of_use)
        .lt('time_of_start', data.time_of_end)
        .gt('time_of_end', data.time_of_start)
        .neq('status', 'declined');

    // Chaining .eq on arrays checks for total equality
    if (equipmentList) {
        checkQuery = checkQuery.eq('equipment_id', equipmentList);
    }
    if (venueList) {
        checkQuery = checkQuery.eq('venue_id', venueList);
    }

    const { data: existing, error: duplicateError } = await checkQuery;

    if (duplicateError) {
        console.error("Overlap Check Error:", duplicateError);
        return { status: false, message: "Error checking availability" };
    }

    if (existing && existing.length > 0) {
        return { 
            status: false, 
            message: "This exact combination of items is already reserved for this time slot." 
        };
    }

    // 4. INSERT RECORD
    const { error: requestError } = await supabase
        .from('bookings')
        .insert([{
            user_id: userId,
            first_name: data.first_name,
            last_name: data.last_name,
            designation_id: data.designation,
            department_id: data.department,
            contact_number: data.contact_number,
            grade_level_id: data.grade_level || null,
            purpose_id: data.purpose,
            location_of_use_id: data.location_of_use,
            type_of_request_id: data.type_of_request || null,
            place_of_use_id: data.place_of_use || null,
            equipment_id: equipmentList, // Sending formatted string "{uuid,uuid}"
            venue_id: venueList,         // Sending formatted string "{uuid,uuid}"
            subject_id: data.subject || null,
            date_of_use: data.date_of_use,
            time_of_start: data.time_of_start,
            time_of_end: data.time_of_end,
            office_id: data.office
        }]);

    if (requestError) {
        console.error("Insert Error:", requestError);
        return { status: false, message: "Error filing your request" };
    }

    return { status: true, message: "Request sent successfully" };
};

export { SendRequest }