import type { Database as db } from "../database.types";

declare global {    
    type Messages = {
        id: number;
        sender: {
            email: string;
            first_name: string;
            last_name: string;
        };
        message: string;
        subject: string;
        created_at: string;
        is_viewed: boolean;
    }

    type RecentsData = {
        messageData: Messages[];
        requestData: Requests[];
    }

    type Requests = db['public']['Tables']['requests']['Row']

    type Equipments = {
        code: string | null;
        created_at: string;
        date_acquired: string | null;
        id: number;
        item_name: string | null;
        reference: string;
        serial_number: string | null;
        status: db["public"]["Enums"]["equipment_status"];
        type: {
            type: string;
        };
    }

    type VenuesType = db['public']['Tables']['venue_type']['Row']

    type Venues = {
        created_at: string;
        id: number;
        reference: string;
        status: db["public"]["Enums"]["venue_status"];
        type: {
            name: string;
            id: number;
        };
    }

    type InventoryType = {
        equipments: Equipments[];
        venues: Venues[];
    }

    type DepartmentType = {
        name: string;
    }

    type DesignationType = {
        name: string;
    }

    type GradeLevelType = {
        department: {
            name: string;
        },
        level: string;
    }

    type TypeOfRequestType = {
        name: string;
    }

    type PlaceOfUseType = {
        department: {
            name: string
        },
        room: string;
        number: string;
    }

    type LocationOfUseType = {
        name: string;
    }

    type SubjectType = {
        department: {
            name: string;
        },
        name: string;
    }

    type PurposeType = {
        name: string;
    }
    
    type BorrowFormType = {
        department: DepartmentType[];
        designation: DesignationType[];
        gradeLevel: GradeLevelType[];
        typeOfRequest: TypeOfRequestType[];
        placeOfUse: PlaceOfUseType[];
        locationOfUse: LocationOfUseType[];
        subject: SubjectType[];
        purpose: PurposeType[];
        equipment: EquipmentType[];
    }
    
    type ScheduleGroupedDataType = {
        [date: string]: Requests[]
    }

    type Profile = {
        avatar_url: string | null
        email: string
        first_name: string | null
        id: string
        is_online: boolean
        last_name: string | null
        office_assigned: string | null
        role: Database["public"]["Enums"]["app_role"] | null
        school_id: string | null
        updated_at: string | null
        website: string | null
        office: {
            office: string;
        }
    }


    type EquipmentTypeType = db['public']['Tables']['equipment_type']['Row']

    type Office = {
        created_at: string;
        id: string;
        in_charge: {
            first_name: string;
            last_name: string;
            id: string;
        }
        office: string;
    }

    interface SectionProps {
      children: React.ReactNode;
      header?: string;
      className?: string;
    }
    
    // TODO: Create a better Type for options
    type OptionType = {
        value: string
        label: string
        group?: string
        office?: string 
    }

    type Designation = db['public']['Tables']['designation']['Row']

    type Department = db['public']['Tables']['department']['Row']

    type Purpose = db['public']['Tables']['purpose']['Row']

    type TypeOfRequest = db['public']['Tables']['type_of_request']['Row']

    type PlaceOfUse = {
        created_at: string;
        department: {
            name: string;
        };
        id: number;
        number: string;
        room: db["public"]["Enums"]["room_enums"];
    }

    type LocationOfUse = db['public']['Tables']['location_of_use']['Row']

    type Subject = {
        created_at: string;
        department: {
            name: string;
        };
        id: number;
        name: string;
    }

    type GradeLevel = {
        created_at: string;
        department: {
            name: string;
        };
        id: number;
        level: string;
    }

    type Release = {
        id: string,
        bookings: db['public']['Tables']['requests']['Row']
        time_released: string,
        time_returned: string | null,
        profiles: { 
            last_name: string, 
            first_name: string 
        } | null,
        accepted_profiles: { 
            last_name: string, 
            first_name: string 
        } | null,
        is_returned: boolean,
        venue: db['public']['Tables']['venue']['Row'],
        equipment: db['public']['Tables']['equipment']['Row'],
        request_type: 'venue' | 'equipment'
    }
}
