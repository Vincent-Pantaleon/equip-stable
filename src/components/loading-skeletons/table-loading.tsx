import { Skeleton } from "../ui/skeleton";

const TableLoadingSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-2">
            <Skeleton className="w-[20%] h-6"/>
            <Skeleton className="w-full h-9"/>
        </div>
    )
}

export { TableLoadingSkeleton }