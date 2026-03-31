'use server'

import { createClient } from "../supabase/server"

const SendRequest = async (data: RequestData) => {
    const supabase = await createClient();

    // 1. Prepare Data
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    const equipmentList = data.equipment?.length ? [...data.equipment].sort() : null;
    const venueList = data.venue?.length ? [...data.venue].sort() : null;

    // 2. DUPLICATE CHECK — block only if every field is identical
    const { data: existing, error: duplicateError } = await supabase
        .from('bookings')
        .select('id, equipment_id, venue_id')
        .eq('first_name', data.first_name)
        .eq('last_name', data.last_name)
        .eq('date_of_use', data.date_of_use)
        .eq('time_of_start', data.time_of_start)
        .eq('time_of_end', data.time_of_end)
        .neq('status', 'declined');

    if (duplicateError) {
        console.error("Duplicate Check Error:", duplicateError);
        return { status: false, message: "Error checking for duplicates" };
    }

    if (existing && existing.length > 0) {
        // Also verify equipment and venue match in JS since they're arrays
        const isDuplicate = existing.some(booking => {
            const bookedEquipment: string[] = Array.isArray(booking.equipment_id)
                ? [...booking.equipment_id].sort()
                : [];
            const bookedVenues: string[] = Array.isArray(booking.venue_id)
                ? [...booking.venue_id].sort()
                : [];

            const equipmentMatch =
                JSON.stringify(bookedEquipment) === JSON.stringify(equipmentList ?? []);
            const venueMatch =
                JSON.stringify(bookedVenues) === JSON.stringify(venueList ?? []);

            return equipmentMatch && venueMatch;
        });

        if (isDuplicate) {
            return {
                status: false,
                message: "An identical booking already exists.",
            };
        }
    }

    // 3. INSERT RECORD
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
            equipment_id: equipmentList,
            venue_id: venueList,
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