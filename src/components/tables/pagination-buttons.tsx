import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"

interface PaginationButtonsProps<TData> {
    table: Table<TData>
}

const PaginationButtons = <TData,>({ table }: PaginationButtonsProps<TData>) => {
    const pageCount = table.getPageCount()
    const pageIndex = table.getState().pagination.pageIndex

    const handleJump = (value: string) => {
        const page = value ? Number(value) - 1 : 0

        if (!isNaN(page)) {
        table.setPageIndex(
            Math.min(Math.max(page, 0), pageCount - 1)
        )
        }
    }

    return (
        <div className="flex items-center justify-end space-x-4 py-2 ">
            {/* Page Indicator */}
            <div className="text-sm font-medium">
                Page {pageIndex + 1} of {pageCount}
            </div>

            {/* Jump Input */}
            <div className="flex items-center space-x-2 ">
                <span className="text-sm">Go to:</span>
                <input
                    type="text"
                    min={1}
                    max={pageCount}
                    defaultValue={pageIndex + 1}
                    onChange={(e) => handleJump(e.target.value)}
                    className="w-12 h-8 border rounded-md p-1 text-center"
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2 ">
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

export { PaginationButtons }