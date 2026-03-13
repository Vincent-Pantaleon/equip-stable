import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import formatDate, { getDateLabel, getTimeLabel } from "@/utils/handlers/format-date"
import { BookingModalContent } from "./modal-content/booking-modal-content"
import { formatLabel } from "@/utils/handlers/capitalize"

export default function AccordionCalendar({ data }: { data: any[] }) {
  // 1. Group the data by date
  const groupedData = Object.groupBy(data || [], item => item.date_of_use)

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {Object.entries(groupedData)
        // 2. Sort by date: Nearest date first (Ascending order)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([date, items], dateIndex) => (
          <AccordionItem
            key={dateIndex}
            value={`date-${dateIndex}`}
            className="rounded-md border overflow-hidden"
          >
            <AccordionTrigger className="bg-slate-50 px-4 py-2 text-lg font-semibold hover:bg-slate-100 transition-all">
              <div className="flex items-center gap-2">
                <span>{formatDate(date)}</span>
                <span className="text-sm text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">
                    {getDateLabel(date)}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-white">
              {items && items.length > 0 ? (
                items.map((request, reqIndex) => (
                  <Accordion
                    type="single"
                    key={request.id || reqIndex}
                    collapsible
                    className="border-t last:border-b"
                  >
                    <AccordionItem value={`request-${reqIndex}`} className="border-none">
                      <AccordionTrigger className="px-4 py-3 text-base font-medium hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left gap-2">
                          
                          {/* 3. Display Equipment & Venue Arrays */}
                          <div className="flex flex-wrap gap-2">
                            {request.equipment?.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {request.equipment.map((eq: any) => (
                                  <span key={eq.id} className="bg-gray-100 border px-2 py-0.5 rounded text-sm">
                                    {formatLabel(eq.type_name)}
                                  </span>
                                ))}
                              </div>
                            )}
                            {request.venue?.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {request.venue.map((vn: any) => (
                                  <span key={vn.id} className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded text-sm">
                                    {formatLabel(vn.venue_name)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold whitespace-nowrap self-start md:self-center">
                            {getTimeLabel(request.date_of_use, request.time_of_start, request.time_of_end)}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-4 py-3 bg-gray-50 border-t">
                        <BookingModalContent request={request} action={() => {}}/>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              ) : (
                <div className="p-4 text-gray-500 italic text-center">No approved requests</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  )
}