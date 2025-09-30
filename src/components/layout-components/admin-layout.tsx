'use client'
 
import { useWindowWidth } from "@/utils/hooks/window-width-provider";
import Link from "next/link";

import { DashboardNavbar } from "./dashboard-navbar";
 
const AdminContent = ({ children }: { children: React.ReactNode }) => {
  const windowWidth = useWindowWidth();
 
  if (windowWidth < 768) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <div className="font-bold text-lg mb-4">
            Admin Dashboard cannot be accessed on small screens.
        </div>  
        <Link href={'/recents'} className="underline underline-offset-2 text-green-500">Go to Recents</Link>
      </div>
    );
  } else {
    return (
      <div className="h-screen">
          <div className="h-full w-full overflow-auto flex">
              <div>
                  <DashboardNavbar />
              </div>
              <div className="p-2 grow overflow-auto bg-white">
                {children}
              </div>
          </div>
      </div>
    );
  }
};
 
export default AdminContent;