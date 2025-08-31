import { Skeleton } from "@/components/ui/skeleton"

export default function InventoryLoading() {
    return (
        <div className="flex flex-col gap-y-2">
            <Skeleton className="w-[20%] h-6"/>
            <Skeleton className="w-full h-9"/>
        </div>
    )
}