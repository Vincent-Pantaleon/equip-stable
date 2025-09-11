import { Skeleton } from "@/components/ui/skeleton";

export default function MessageLoading() {
    return (
        <div className="flex flex-col py-3 px-2">
            <div className="flex flex-col gap-y-2">
                <Skeleton className="h-9 w-[20%]"></Skeleton>
                <Skeleton className="h-9 w-full"></Skeleton>
            </div>
        </div>
    )
}