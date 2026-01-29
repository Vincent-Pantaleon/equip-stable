import Sidebar from "@/components/layout-components/sidebar";
import React from "react";

const MemoSideBar = React.memo(Sidebar);

export default function AppLayout({ children }: { 
    children: React.ReactNode 
}) {
    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row h-screen p-2 grow drop-shadow-lg">
                {/* Sidebar */}
                <div className="md:mr-3 max-md:mb-3 flex-shrink-0 min-w-[20rem]">
                    <MemoSideBar />
                </div>
                
                {/* Make this area scrollable without overflowing */}
                <div className="grow overflow-auto bg-white rounded-lg p-2">
                    {children}
                </div>
                
            </div>
        </div>
    );
}
