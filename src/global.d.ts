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

    // Select Input Interface
    interface SectionProps {
      children: React.ReactNode;
      header: string;
    }
    
    // Base option
    interface BaseOption {
      label: string; // what is shown in the dropdown
      value: string; // the actual value (id, slug, etc.)
    }

    // Office options
    interface OfficeOptions extends BaseOption {
        kind: "office"
    }

    // Role options
    interface RoleOptions extends BaseOption {
        kind: "role"
    }
    
    //Gender options
    interface GenderOptions extends BaseOption {
      kind: "gender"
    }
    
    // Specific options
    interface AdminOption extends BaseOption {
      kind: "admin";
      id: string;
      name: string;
    }
    
    interface DepartmentOption extends BaseOption {
      kind: "department";
      department: string;
      level: string;
    }
    
    interface RoomOption extends BaseOption {
      kind: "room";
      room: string;
      number: string;
    }
    
    interface TypeOption extends BaseOption {
      kind: "type";
      type: string;
    }
    
    // Union type
    type OptionType = AdminOption | DepartmentOption | RoomOption | TypeOption | GenderOptions | RoleOptions | OfficeOptions; 
}
