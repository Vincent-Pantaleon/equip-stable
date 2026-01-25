'use server'

import { createClient } from "../supabase/server"
import formatDate from "../handlers/format-date"
import { formatTime } from "../handlers/format-date"
import { Capitalize, formatLabel } from "../handlers/capitalize"

const GetReleases = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('releases')
    .select(`
        id,
        is_returned, 
        request_type,
        bookings: booking_id( *, department: department_id( department_name ), designation: designation_id( designation_name ), subject: subject_id( subject_name ), type_of_request: type_of_request_id( type_name ), grade_level: grade_level_id( grade_level ), equipment: equipment_id( type_name ), venue: venue_id( venue_name ), purpose: purpose_id( purpose_name ), place_of_use: place_of_use_id( room, number ), location_of_use: location_of_use_id( location_name ), office: office_id( office_name ), date_of_use, time_of_start, time_of_end, first_name, last_name, contact_number ),
        time_released, 
        time_returned, 
        profiles: 
        released_by( first_name, last_name ), 
        accepted_profiles: accepted_by( first_name, last_name ), 
        venue: venue_id(venue_name), 
        equipment: equipment_id(item_name)
    `)

    if (error) {
        console.log(error)
        return { status: false, message: "Error fetching releases data" }
    }

    return { status: true, message: "Releases data fetch successful", data: data }
}

const GetBookings = async () => {
    const supabase = await createClient()

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
    .from('bookings')
    .select('id, first_name, last_name, date_of_use, time_of_start, time_of_end, equipment:equipment_id(type_name), venue:venue_id(venue_name), type: type_of_request_id(type_name), office: office_id(office_name)')
    .eq('is_active', false).eq('status', 'approved') // .eq('date_of_use', today)

    if (error) {
        console.log("HERE!",error)
        return { status: false, message: "Error fetching bookings" }
    }

    // label: `${formatDate(item.date_of_use)}, ${formatTime(item.time_of_start)} - ${formatTime(item.time_of_end)}, ${item.type_of_request === 'equipment' ? formatLabel(item.equipment) : formatLabel(item.venue)}, ${Capitalize(item.first_name)} ${Capitalize(item.last_name)}`,  
    // value: item.id,
    // type: item.type_of_request,
    // group: item.equipment,
    // office: item.office
        
    // console.log("Normalized Booking Data: ", normalizedData)
    const normalizedData = (data ?? []).map((item) => {
        // 1. SAFELY HANDLE TYPE
        // If it's an array, take the first item. If it's an object, take it directly.
        const typeObj = Array.isArray(item.type) ? item.type[0] : item.type;
        const typeString = typeObj?.type_name ?? null; // "equipment"

        // 2. SAFELY HANDLE EQUIPMENT / VENUE
        // We check the specific property based on the type we found above
        let entityName = 'N/A';
        
        if (typeString === 'equipment') {
            const equipObj = Array.isArray(item.equipment) ? item.equipment[0] : item.equipment;
            entityName = equipObj?.type_name ?? 'N/A';
        } else if (typeString === 'venue') {
            const venueObj = Array.isArray(item.venue) ? item.venue[0] : item.venue;
            entityName = venueObj?.venue_name ?? 'N/A';
        }

        // 3. SAFELY HANDLE OFFICE
        const officeObj = Array.isArray(item.office) ? item.office[0] : item.office;
        const officeName = officeObj?.office_name ?? null;

        return {
            // Now using the clean variables we extracted above
            label: `${formatDate(item.date_of_use)}, ${formatTime(item.time_of_start)} - ${formatTime(item.time_of_end)}, ${formatLabel(entityName)}, ${Capitalize(item.first_name)} ${Capitalize(item.last_name)}`,
            value: item.id,
            group: entityName,
            type: typeString,
            office: officeName
        };
    });

    return { status: true, message: "Successfully fetched bookings", data: normalizedData }

}

type EquipmentRecord = {
    id: number;
    item_name: string;
    equipment_type: {
        id: string;
        type_name: string;
    };
    office: {
        office_name: string;
    }
};

const GetEquipments = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("equipment")
    .select('id, equipment_type: equipment_type_id(id, type_name), item_name, office: office_id(office_name)')
    .in('status', ['stored', 'returned'])
    .overrideTypes<EquipmentRecord[]>() 

    if (error) {
        return { status: false, message: "Error fetching equipments" }
    }

    const normalizedData = (data ?? []).map((item) => ({
        label: `${formatLabel(item.item_name)} - ${formatLabel(item.equipment_type.type_name)}`,  
        value: String(item.id),
        group: String(item.equipment_type.type_name),
        office: item.office.office_name
    }))
    
    return { status: true, message: "Successfully fetched equipments", data: normalizedData }
}

type VenueRecord = {
    id: number;
    venue_name: string;
    venue_type: {
        venue_name: string;

    };
    office: {
        office_name: string;
    }
};

const GetVenues = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("venue")
    .select('id, venue_type: venue_type(id, venue_name), venue_name, office: office_id(office_name)')
    .in('status', ['available'])
    .overrideTypes<VenueRecord[]>() 

    if (error) {
        console.log("GetVenues Error: ", error)
        return { status: false, message: "Error fetching venues" }
    }

    const normalizedData = (data ?? []).map((item) => ({
        label: `${formatLabel(item.venue_type.venue_name) ?? "Unknown"} - ${formatLabel(item.venue_name)}`,  
        value: String(item.id),
        group: String(item.venue_type.venue_name),
        office: item.office.office_name
    }))

    return { status: true, message: "Successfully fetched venues", data: normalizedData }
}


export { GetReleases, GetBookings, GetEquipments, GetVenues }