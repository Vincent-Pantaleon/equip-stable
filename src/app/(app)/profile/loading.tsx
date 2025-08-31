import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoadin() {
    return (
        <div className="flex flex-col gap-y-4">
            <Skeleton className="h-24 w-full"/>
            <Skeleton className="h-24 w-full"/>
            <Skeleton className="h-24 w-full"/>
        </div>
        
    )
}