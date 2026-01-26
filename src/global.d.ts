import { StringToBoolean } from "class-variance-authority/types";
import type { Database as db } from "../database.types";
import { OfficeList } from "./components/page-components/offices-list";

declare global {    
    type Message = {
        id: string;
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
        messageData: Message[];
        requestData: Requests[];
    }

    type Requests = {
        id: string;
        created_at: string;
        user_id: string;
        first_name: string;
        last_name: string;
        designation: {
            id: string;
            designation_name: string;
        };
        department: {
            id: string;
            department_name: string;
        };
        contact_number: string;
        grade_level: {
            id: string;
            grade_level: string;
            department: {
                department_name: string;
            };
        };
        purpose: {
            id: string;
            purpose_name: string;
        };
        type_of_request: {
            id: string;
            type_name: string;
        };
        location_of_use: {
            id: string;
            location_name: string;
        };
        place_of_use: {
            id: string;
            room: string;
            number: string;
            department: {
                department_name: string;
            }
        };
        equipment: {
            id: string;
            type_name: string;
        };
        subject: {
            id: string;
            subject_name: string;
            department: {
                department_name: string;
            }
        };
        date_of_use: string;
        time_of_start: string;
        time_of_end: string;
        status: string;
        is_active: boolean;
        venue: {
            id: string;
            venue_name: string;
        };
        office: {
            id: string;
            office_name: string;
        };
    }

    type Equipments = {
        property_code: string | null;
        created_at: string;
        date_acquired: string | null;
        id: number;
        item_name: string | null;
        reference_number: string;
        serial_number: string | null;
        status: db["public"]["Enums"]["equipment_status"];
        type: {
            type_name: string;
        };
        office: {
            id: string
            office_name: string
        }
    }

    type Venues = {
        created_at: string;
        id: string;
        venue_name: string;
        status: db["public"]["Enums"]["venue_status"];
        venue_type: {
            venue_name: string;
            id: number;
        };
        office: {
            id: string;
            office_name;
        }
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
        id: string;
        school_id: string;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        office: {
            office_name: string;
        };
    }


    type EquipmentTypeType = {
        type_name: string;
        office: {
            id: string;
            office_name: string;
        }
        is_public: boolean;
        count: number
    }

    type VenuesType = {
        venue_name: string;
        total_capacity: number;
        office: {
            id: string;
            office_name: string;
        }
        is_public: boolean;
        count: number;
    }

    type Office = {
        id: string;
        office_name: string;
        created_at: string;
        profile: {
            id: string;
            first_name: string;
            last_name: string;
        };
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
            department_name: string;
        };
        id: number;
        number: string;
        room: db["public"]["Enums"]["room_enums"];
    }

    type LocationOfUse = db['public']['Tables']['location_of_use']['Row']

    type Subject = {
        created_at: string;
        department: {
            department_name: string;
        };
        id: number;
        name: string;
    }

    type GradeLevel = {
        created_at: string;
        department: {
            department_name: string;
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
