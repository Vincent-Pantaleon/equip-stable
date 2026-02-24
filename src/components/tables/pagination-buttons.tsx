import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"

interface PaginationButtonsProps<TData> {
    table: Table<TData>
}

const PaginationButtons = <TData,>({ table }: PaginationButtonsProps<TData>) => {
    return (
        <div className="flex items-center justify-end space-x-4 py-2">
            {/* Page Indicator */}
            <div className="flex items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export { PaginationButtons };