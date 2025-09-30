import { Capitalize, CapitalizeAll } from "@/utils/handlers/capitalize";
import { Input } from "./input";
import Button from "./button";
import formatDate, { formatTime } from "@/utils/handlers/format-date";
import { useInfo } from "@/utils/hooks/user-context";

// Message Modal Content
export function MessageModalContent({ message }: { message: Messages }) {
  const senderName =
    message.sender.first_name || message.sender.last_name
      ? `${Capitalize(message.sender.first_name || "")} ${Capitalize(message.sender.last_name || "")}`
      : "Unknown Sender";

  return (
    <div className="max-h-[60vh] overflow-y-auto pr-2">
      <div className="flex flex-col gap-6 text-sm text-gray-800">
        {/* Sender */}
        <div>
          <h3 className="text-gray-500">Sender</h3>
          <p className="font-bold">{senderName}</p>
        </div>
        {/* Time and Date Sent */}
        <div>
          <h3 className="text-gray-500">Time and Date Sent</h3>
          <p className="font-bold">
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p className="font-bold">
            {new Date(message.created_at).toLocaleDateString()}
          </p>
        </div>
        {/* Subject */}
        <div>
          <h3 className="text-gray-500">Subject</h3>
          <p className="font-bold">{message.subject}</p>
        </div>
        {/* Message Content */}
        <div>
          <h3 className="text-gray-500 mb-1">Message</h3>
          <div className="border rounded-2xl p-4 bg-slate-50">
            <p className="font-bold whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Request Modal Content

// Equipment Modal Content
export function EquipmentModalContent({ equipment }: { equipment: EquipmentTypeType }) {
  return (
    <div className="max-h-[60vh] overflow-y-auto pr-2">
      <div className="flex flex-col gap-6 text-sm text-gray-800">
        <div>
          <h3 className="text-gray-500">Equipment Name</h3>
          <p className="font-bold">{Capitalize(equipment.type)}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Equipment ID</h3>
          <p className="font-bold">{equipment.id}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Total Count</h3>
          <p className="font-bold">{equipment.total_count ?? 0}</p>
        </div>
      </div>
    </div>
  );
}

// Venue Modal Content
export function VenueModalContent({ venue }: { venue: Venues }) {
  return (
    <div className="max-h-[60vh] overflow-y-auto pr-2">
      <div className="flex flex-col gap-6 text-sm text-gray-800">
        <div>
          <h3 className="text-gray-500">Venue Name</h3>
          <p className="font-bold">{Capitalize(venue.name)}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Venue ID</h3>
          <p className="font-bold">{venue.id}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Total Capacity</h3>
          <p className="font-bold">{venue.total_capacity ?? 0}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Total Count</h3>
          <p className="font-bold">{venue.total_count ?? 0}</p>
        </div>
      </div>
    </div>
  );
}

// Profile Modal Content
export function ProfileModalContent({ profile }: { profile: Profile }) {
  return (
    <div className="max-h-[60vh] overflow-y-auto pr-2">
      <div className="flex flex-col gap-6 text-sm text-gray-800">
        <div>
          <h3 className="text-gray-500">ID</h3>
          <p className="font-bold">{profile.id}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Name</h3>
          <p className="font-bold">{profile.first_name} {profile.last_name}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Gender</h3>
          <p className="font-bold">{profile.gender}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Email</h3>
          <p className="font-bold">{profile.email}</p>
        </div>
        <div>
          <h3 className="text-gray-500">School ID</h3>
          <p className="font-bold">{profile.school_id}</p>
        </div>
        <div>
          <h3 className="text-gray-500">Role</h3>
          <p className="font-bold">{profile.role}</p>
        </div>
      </div>
    </div>
  );
}

// Date Check Form
export function DateCheckForm() {
  return (
    <div className="flex flex-col gap-y-3 border p-2 rounded-xl mt-4">
      <div className="text-lg font-bold">Check for Availability</div>
      <Input id="date" label="Enter date" name="date" type="date" />
      <Input id="time" label="Enter Time" name="time" type="time" />
      <Button label="Submit" />
    </div>
  );
}