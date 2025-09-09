import Sidebar from "@/components/layout-components/sidebar";
import UserProvider from "@/utils/hooks/user-provider";
import QueryProvider from "@/utils/hooks/query-provider";
import { RealtimeProvider } from "@/utils/hooks/realtime-provider";
import React from "react";

const MemoSideBar = React.memo(Sidebar);

export default function AppLayout({ children, modal }: { 
    children: React.ReactNode 
    modal: React.ReactNode
}) {
    return (
        <>
            <div className="flex flex-col md:flex-row p-2 min-h-screen drop-shadow-lg">
                {/* Sidebar */}
                <div className="md:mr-3 max-md:mb-3 flex-shrink-0">
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
            {modal}
        </>
    );
}
