import Sidebar from "@/components/layout-components/sidebar";
import React from "react";

const MemoSideBar = React.memo(Sidebar);

export default function AppLayout({ children }: { 
    children: React.ReactNode 
}) {
    return (
        <>
            <div className="flex flex-col md:flex-row p-2 min-h-screen drop-shadow-lg">
                {/* Sidebar */}
                <div className="md:mr-3 max-md:mb-3 flex-shrink-0 min-w-[20rem]">
                    <MemoSideBar />
                </div>

                {/* Main Content */}
                <div className="grow bg-white rounded-2xl p-2 flex overflow-auto">
                    {/* Make this area scrollable without overflowing */}
                    <div className="grow flex flex-col w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
