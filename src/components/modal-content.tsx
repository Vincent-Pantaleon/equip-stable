import { Capitalize,CapitalizeAll } from "@/utils/handlers/capitalize";

import { Input } from "./input";

import Button from "./button";

import formatDate, {formatTime} from "@/utils/handlers/format-date";

import { useInfo } from "@/utils/hooks/user-context";



export function MessageModalContent({ message }: { message: Messages }) {

  return (

    <div className="max-h-[60vh] overflow-y-auto pr-2">

      <div className="flex flex-col gap-6 text-sm text-gray-800">

        {/* Sender */}

        <div>

          <h3 className="text-gray-500">Sender</h3>

          <p className="font-bold">{message.sender.first_name || message.sender.last_name

            ? `${Capitalize(message.sender.first_name || "")} ${Capitalize(message.sender.last_name || "")}`

            : "Unknown Sender"}</p>

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





export function RequestModalContent({ request, isAdmin = false }: { request: Requests, isAdmin?: boolean }) {

  return (

    <div className="max-h-[70vh] overflow-y-auto pr-2">

      <div className="flex flex-col gap-6 text-sm text-gray-800">

        {/* Top Section */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-auto">

          <div>

            <h3 className="text-gray-500">Request ID</h3>

            <p className="font-bold">{request.id}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Filer&apos;s Name</h3>

            <p className="font-bold">{Capitalize(request.first_name)} {Capitalize(request.last_name)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Contact Number</h3>

            <p className="font-bold">{request.contact_number}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Department</h3>

            <p className="font-bold">{Capitalize(request.department)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Designation</h3>

            <p className="font-bold">{Capitalize(request.designation)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Grade Level</h3>

            <p className="font-bold">{CapitalizeAll(request.grade_level)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Subject</h3>

            <p className="font-bold">{Capitalize(request.subject)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Type of Request</h3>

            <p className="font-bold">{Capitalize(request.type_of_request)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Date of Use</h3>

            <p className="font-bold">{formatDate(request.date_of_use)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Time of Use</h3>

            <p className="font-bold">

              {formatTime(request.time_of_start)} - {formatTime(request.time_of_end)}

            </p>

          </div>

          <div className="sm:col-span-2">

            <h3 className="text-gray-500">Purpose</h3>

            <p className="font-bold">{Capitalize(request.purpose)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Location of Use</h3>

            <p className="font-bold">{Capitalize(request.location_of_use)} Campus</p>

          </div>

          <div>

            <h3 className="text-gray-500">Place of Use</h3>

            <p className="font-bold">{CapitalizeAll(request.place_of_use)}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Equipment</h3>

            <p className="font-bold">{request.equipment}</p>

          </div>

          <div>

            <h3 className="text-gray-500">Created At</h3>

            <p className="font-bold">

              {new Date(request.created_at).toLocaleString()}

            </p>

          </div>

        </div>



        {/* Status Section */}

        <div>

          <h3 className="text-gray-500 mb-1">Status</h3>

          <div className="border rounded-2xl p-3 bg-slate-100 flex justify-between items-center">

            <p className="font-bold">{Capitalize(request.status)}</p>

            {useInfo()?.role === "moderator" || useInfo()?.role === 'administrator' && isAdmin === true && (

              <Button

                label="Update Status"

                className="w-fit px-4"

              />

            )}

          </div>

        </div>

      </div>

    </div>

  );

}



export function EquipmentModalContent({ equipment }: { equipment: Equipments }) {

  return (

    <div className="max-h-[60vh] overflow-y-auto pr-2">

      <div className="flex flex-col gap-6 text-sm text-gray-800">

        <div>

          <h3 className="text-gray-500">Equipment Name</h3>

          <p className="font-bold">{Capitalize(equipment.name)}</p>

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

  )

}



export function DateCheckForm () {

  return (

    <div className="flex flex-col gap-y-3 border p-2 rounded-xl mt-4">

      <div className="text-lg font-bold">Check for Availability</div>

      <Input id="date" label="Enter date" name="date" type="date"/>

      <Input id="time" label="Enter Time" name="time" type="time"/>

      <Button label="Submit"/>

    </div>

  )

}