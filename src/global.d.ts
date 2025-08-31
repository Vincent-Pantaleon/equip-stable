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

    type Equipments = db['public']['Tables']['equipment_table']['Row']

    type Venues = db['public']['Tables']['venue_table']['Row']

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

    type EquipmentType = {
        equipment_name: string;
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

    type Profile = db['public']['Tables']['profiles']['Row']
}
