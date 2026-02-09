import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import formatDate, { getDateLabel, getTimeLabel, formatTime } from "@/utils/handlers/format-date"
import { BookingModalContent } from "./modal-content/booking-modal-content"
import { Capitalize, formatLabel } from "@/utils/handlers/capitalize"

export default function AccordionCalendar({ data }: { data: Requests[] }) {
  const groupedData = Object.groupBy(data, item => item.date_of_use)

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {Object.entries(groupedData)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, items], index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-md border-1 overflow-hidden"
          >
            <AccordionTrigger className="bg-hover-color px-4 py-2 text-lg font-semibold hover:bg-form-input-color transition-all">
              <div className="flex items-center gap-2">
                <span>{formatDate(date)}</span>
                <span className="text-md text-blue-700 font-medium">{getDateLabel(date)}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-white">
              {items && items.length > 0 ? (
                items.map((request, index) => (
                  <Accordion
                    type="single"
                    key={index}
                    collapsible
                    className="border-t last:border-b"
                  >
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="px-4 py-2 text-base font-medium hover:bg-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full text-left">
                          <span>
                            {request.type_of_request.type_name === 'equipment' ? formatLabel(request.equipment.type_name as string) ?? '-' : formatLabel(request.venue.venue_name as string) ?? '-'}  ({formatTime(request.time_of_start)} - {formatTime(request.time_of_end)})
                          </span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-2xl font-semibold mt-1 md:mt-0">
                            {getTimeLabel(request.date_of_use, request.time_of_start, request.time_of_end)}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-4 py-3 bg-gray-50 text-sm text-gray-700">
                        <BookingModalContent request={request} action={() => {}}/>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              ) : (
                <div className="p-4 text-gray-500 italic">No approved requests</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  )
}
