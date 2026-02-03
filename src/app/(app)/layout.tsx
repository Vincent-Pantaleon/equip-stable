import Sidebar from "@/components/layout-components/sidebar";
import React from "react";

const MemoSideBar = React.memo(Sidebar);

export default function AppLayout({ children }: { 
    children: React.ReactNode 
}) {
    return (
        // <div className="flex flex-col md:flex-row p-2 flex-1 drop-shadow-lg bg-green-400">
        <div className="h-fit md:h-screen p-1 space-y-3 flex flex-col md:flex-row drop-shadow-lg">
                {/* Sidebar */}
                <MemoSideBar />
                
                {/* Make this area scrollable without overflowing */}
                <div className="max-md:h-[60rem] w-full md:flex-1 bg-white rounded-lg p-2 overflow-auto">
                    {children}
                </div>
            
        </div>
    );
}
