import Sidebar from "@/components/layout-components/sidebar";
import React from "react";

const MemoSideBar = React.memo(Sidebar);

export default function AppLayout({ children }: { 
    children: React.ReactNode 
}) {
    return (
        <>
            <div className="flex flex-col md:flex-row p-2 h-screen drop-shadow-lg">
                {/* Sidebar */}
                <div className="md:mr-3 max-md:mb-3 flex-shrink-0 min-w-[20rem]">
                    <MemoSideBar />
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white rounded-2xl p-2 flex flex-col min-h-0">
                    {/* Make this area scrollable without overflowing */}
                    <div className="grow w-full overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
