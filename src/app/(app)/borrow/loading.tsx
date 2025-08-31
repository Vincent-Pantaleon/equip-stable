import { Skeleton } from "@/components/ui/skeleton"

export default function BorrowLoading() {
    return (
        <div className="flex flex-col gap-y-4">
            <Skeleton className="w-full h-[240px]"/>
            <Skeleton className="w-full h-[240px]"/>
            <Skeleton className="w-full h-[240px]"/>
        </div>
    )
}