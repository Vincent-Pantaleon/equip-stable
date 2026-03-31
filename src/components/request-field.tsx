'use client'

import { useState } from "react";
import { Input, SelectInput } from "./input";
import { formatLabel } from "@/utils/handlers/capitalize";

type VenueItemType = {
    id: string;
    venue_name: string;
}

type EquipmentItemType = {
    id: string;
    type_name: string;
}

interface VenueFieldProps {
    initialVenues: VenueItemType[]
    venueOptions: OptionType[]
}

interface EquipmentFieldProps {
    initialItems: EquipmentItemType[]
    equipmentOptions: OptionType[]
}

type FormEdit = {
    department: OptionType[];
    designation: OptionType[];
    gradeLevel: OptionType[];
    typeOfRequest: OptionType[];
    placeOfUse: OptionType[];
    locationOfUse: OptionType[];
    subject: OptionType[];
    purpose: OptionType[];
    equipment: OptionType[];
    office: OptionType[];
    venue: OptionType[];
} | null | undefined

const VenueField = ({ initialVenues, venueOptions }: VenueFieldProps) => {
    const [venues, setVenues] = useState<VenueItemType[]>(initialVenues || []);

    const handleAdd = (selectedId: string) => {
        if (venues.find(v => v.id === selectedId)) return;
        const option = venueOptions.find(opt => opt.value === selectedId);
        if (option) {
            setVenues(prev => [...prev, { id: option.value, venue_name: option.label }]);
        }
    };

    const handleRemove = (id: string) => {
        setVenues(prev => prev.filter(v => v.id !== id));
    };

    return (
        <div className="space-y-4">
            {/* Hidden inputs — one per selected venue, all named "venue_ids" */}
            {venues.map(venue => (
                <input key={venue.id} type="hidden" name="venue_ids" value={venue.id} />
            ))}

            <SelectInput
                label="Select Venues"
                name="_venue_picker"  // underscore so it's ignored by FormData
                options={venueOptions || []}
                onChange={(e) => handleAdd(e.target.value)}
                value=""
                required={false}
            />

            <div className="space-y-2">
                <p className="text-sm font-medium">Selected Venues:</p>
                {venues.map((venue) => (
                    <div key={venue.id} className="flex items-center justify-between p-2 border rounded bg-white shadow-sm">
                        <span className="text-sm font-medium">{formatLabel(venue.venue_name)}</span>
                        <button
                            type="button"
                            onClick={() => handleRemove(venue.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                {venues.length === 0 && (
                    <p className="text-gray-400 italic text-sm">No venues selected.</p>
                )}
            </div>
        </div>
    );
};

const EquipmentField = ({ initialItems, equipmentOptions }: EquipmentFieldProps) => {
    const [equipments, setEquipments] = useState<EquipmentItemType[]>(initialItems || []);

    const handleAdd = (selectedId: string) => {
        if (equipments.find(item => item.id === selectedId)) return;
        const option = equipmentOptions.find(opt => opt.value === selectedId);
        if (option) {
            setEquipments(prev => [...prev, { id: option.value, type_name: option.label }]);
        }
    };

    const handleRemove = (id: string) => {
        setEquipments(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-2">
            {/* Hidden inputs — one per selected equipment, all named "equipment_ids" */}
            {equipments.map(equipment => (
                <input key={equipment.id} type="hidden" name="equipment_ids" value={equipment.id} />
            ))}

            <SelectInput
                label="Select Equipments"
                name="_equipment_picker"
                options={equipmentOptions || []}
                onChange={(e) => handleAdd(e.target.value)}
                value=""
                required={false}
            />

            <p className="text-sm font-medium">Selected Equipments:</p>
            {equipments.map((equipment) => (
                <div key={equipment.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{formatLabel(equipment.type_name)}</span>
                    <button
                        type="button"
                        onClick={() => handleRemove(equipment.id)}
                        className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
            ))}
            {equipments.length === 0 && <p className="text-gray-400 italic">No equipment selected.</p>}
        </div>
    );
};

export const FIELD_MAP: Partial<Record<keyof AdminRequests, (request: AdminRequests, editFormData: FormEdit) => React.ReactNode>> = {
    first_name: (request) => (
        <div className="grid grid-cols-2 gap-4">
            <Input 
                label="First Name" 
                name="fname"
                id="fname"
                type="text"
                defaultValue={request.first_name} 
            />
            <Input
                label="Last Name" 
                name="lname" 
                defaultValue={request.last_name} 
                id="lname"
                type="text"
            />
        </div>
    ),
    department: (request, editFormData) => (
        <div>
            <SelectInput
                label="Select a Department"
                name="department"
                options={editFormData?.department || []}
                defaultValue={request.department?.id}
            />
        </div>
    ),
    grade_level: (request, editFormData) => (
        <div>
            <SelectInput
                label="Select Grade Level"
                name="level"
                options={editFormData?.gradeLevel || []}
                defaultValue={request.grade_level?.id}
            />
        </div>
    ),
    time_of_start: (request) => (
        <div className="grid grid-cols-2 gap-4">
            <Input
                id="time_of_start"
                label="Time of Start"
                name="time_of_start"
                type="time"
                defaultValue={request.time_of_start}
            />
            <Input
                id="time_of_end"
                label="Time of End"
                name="time_of_end"
                type="time"
                defaultValue={request.time_of_end}
            />
        </div>
    ),
    office: (request, editFormData) => (
        <div>
            <SelectInput
                label="Select Office"
                name="office"
                options={editFormData?.office || []}
                defaultValue={request.office?.id}
            />
        </div>
    ),
    place_of_use: (request, editFormData) => (
        <div>
            <SelectInput
                label="Class Room"
                name="room"
                options={editFormData?.placeOfUse || []}
                defaultValue={request.place_of_use?.id}
            />

        </div>
    ),
    contact_number: (request) => (
        <div>
            <Input
                id="contact_number"
                label="Contact Number"
                name="contact_number"
                type="text"
                defaultValue={request.contact_number}
            />
        </div>
    ),
    designation: (request, editFormData) => (
        <div>
            <SelectInput
                label="Select Designation"
                name="designation"
                options={editFormData?.designation || []}
                defaultValue={request.designation?.id}
            />
        </div>
    ),
    date_of_use: (request) => (
        <div>
            <Input
                label="Date of Use"
                id="date_of_use"
                name="date_of_use"
                type="date"
                defaultValue={request.date_of_use}
            />
        </div>
    ),
    purpose: (request, editFormData) => (
        <div>
            <SelectInput
                label="Activity"
                name="purpose"
                options={editFormData?.purpose || []}
                defaultValue={request.purpose?.id}
            />
        </div>
    ),
    location_of_use: (request, editFormData) => (
        <div>
            <SelectInput
                label="Location of Use"
                name="location_of_use"
                options={editFormData?.locationOfUse || []}
                defaultValue={request.location_of_use?.id}
            />
        </div>
    ),
    venue: (request, editFormData) => (
        <VenueField initialVenues={request.venue} venueOptions={editFormData?.venue || []}/>
    ),
    equipment: (request, editFormData) => (
        <EquipmentField initialItems={request.equipment} equipmentOptions={editFormData?.equipment || []} />
    )
};