'use server'

import { formatLabel } from "../handlers/capitalize";
import { createClient } from "../supabase/server"
import formatDate from "../handlers/format-date";

interface EquipmentCount {
    type_name: string; // Changed from 'type' to 'type_name'
    count: number;
}

const GetDashboardCounts = async () => {
    const supabase = await createClient()

    const { data: equipmentCount, error: equipmentCountError } = await supabase
    .rpc('get_equipment_count_by_type')

    const { data: venueCount, error: venueCountError } = await supabase
    .rpc('get_venue_count_by_type')

    const { data: bookingCount, error: bookingError } = await supabase
    .rpc('get_monthly_booking_counts')

    const { data: releasesCount, error: releasesError } = await supabase
    .rpc('get_release_count_by_item')

    if (equipmentCountError || venueCountError || bookingError || releasesError) {
        return { status: false, message: "Error fetching data" }
    }

    // Calculate Total Equipment Count
    const totalEquipmentCount = equipmentCount.reduce((sum: any, item: { count_by_type: any; }) => sum + item.count_by_type, 0);

    // Calculate Total Venue Count
    const totalVenueCount = venueCount.reduce((sum: any, item: { count_by_type: any; }) => sum + item.count_by_type, 0);

    // Calculate Total Booking Count
    const totalBookingCount = bookingCount.reduce((sum: any, item: { booking_count: any; }) => sum + item.booking_count, 0);

    // Calculate Total Releases Count
    const totalReleasesCount = releasesCount.reduce((sum: any, item: { release_count: any; }) => sum + item.release_count, 0);

    // Normalize equipmentCount
    const normalizeEquipmentData = equipmentCount.map(({ type_name, count_by_type }: { type_name: string, count_by_type: number}) => ({
        name: formatLabel(type_name),
        count: count_by_type
    }));

    // Normalize venueCount
    const normalizeVenueData = venueCount.map(({ type_name, count_by_type }: { type_name: string, count_by_type: number}) => ({
        name: formatLabel(type_name),
        count: count_by_type
    }));

    return { 
        status: true, 
        data: { 
            totalEquipmentCount, 
            totalVenueCount,
            totalBookingCount,
            totalReleasesCount,
            normalizeEquipmentData, 
            normalizeVenueData,
            bookingCount,
            releasesCount
        }, 
        message: "Data fetched successfully" 
    };
}

export { GetDashboardCounts }