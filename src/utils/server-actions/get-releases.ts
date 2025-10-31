'use server'

import { createClient } from "../supabase/server"
import formatDate from "../handlers/format-date"
import { formatTime } from "../handlers/format-date"
import { Capitalize, formatLabel } from "../handlers/capitalize"

const GetReleases = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from('releases')
    .select(' id, is_returned, request_type, bookings: booking_id( * ), time_released, time_returned, profiles:released_by ( first_name, last_name ), accepted_profiles:accepted_by ( first_name, last_name ), venue: venue_id(reference), equipment: equipment_id(item_name)')

    if (error) {
        console.log(error)
        return { status: false, message: "Error fetching releases data" }
    }

    console.log(data)
    return { status: true, message: "Releases data fetch successful", data: data }
}

const GetBookings = async () => {
    const supabase = await createClient()

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
    .from('requests')
    .select('id, first_name, last_name, date_of_use, time_of_start, time_of_end, equipment, venue, type_of_request, office')
    .eq('is_active', false).eq('status', 'approved') // .eq('date_of_use', today)

    if (error) {
        console.log(error)
        return { status: false, message: "Error fetching bookings" }
    }

    const normalizedData = (data ?? []).map((item) => ({
        label: `${formatDate(item.date_of_use)}, ${formatTime(item.time_of_start)} - ${formatTime(item.time_of_end)}, ${item.type_of_request === 'equipment' ? formatLabel(item.equipment) : formatLabel(item.venue)}, ${Capitalize(item.first_name)} ${Capitalize(item.last_name)}`,  
        value: item.id,
        type: item.type_of_request,
        group: item.equipment,
        office: item.office
    }))

    return { status: true, message: "Successfully fetched bookings", data: normalizedData }
}

type EquipmentRecord = {
    id: number;
    item_name: string;
    type: {
        type: string;
    };
    office_assigned: {
        office: string;
    }
};

const GetEquipments = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("equipment")
    .select('id, type: type(type), item_name, office_assigned: office_assigned(office)')
    .in('status', ['stored', 'returned'])
    .overrideTypes<EquipmentRecord[]>() 

    if (error) {
        return { status: false, message: "Error fetching equipments" }
    }

    const normalizedData = (data ?? []).map((item) => ({
        label: `${formatLabel(item.type.type as string)} - ${formatLabel(item.item_name)}`,  
        value: String(item.id),
        group: String(item.type.type),
        office: item.office_assigned.office
    }))

    return { status: true, message: "Successfully fetched equipments", data: normalizedData }
}

type VenueRecord = {
    id: number;
    reference: string;
    type: {
        name: string;
    };
    office: {
        office: string;
    }
};

const GetVenues = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("venue")
    .select('id, type: type(name), reference, office: office(office)')
    .in('status', ['available', 'open'])
    .overrideTypes<VenueRecord[]>() 

    if (error) {
        console.log(error)
        return { status: false, message: "Error fetching venues" }
    }

    const normalizedData = (data ?? []).map((item) => ({
        label: `${formatLabel(item.type.name) ?? "Unknown"} - ${item.reference}`,  
        value: String(item.id),
        group: String(item.type.name),
        office: item.office.office
    }))

    return { status: true, message: "Successfully fetched venues", data: normalizedData }
}


export { GetReleases, GetBookings, GetEquipments, GetVenues }