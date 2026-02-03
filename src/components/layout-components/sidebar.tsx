import Clock from "@/components/layout-components/clock";
import NavLinks from "@/components/layout-components/nav-links";
import Profile from "./profile";
import React from "react";

const SideBar = () => {
    return (
        <div className="h-full w-full flex flex-col gap-y-3 md:max-w-[20rem] md:mr-2">
            {/* Time */}
            <Clock />
           
            {/* NavLinks */}
            <NavLinks />

            {/* Profile */}
            <Profile />
        </div>
        
    )
}

export default React.memo(SideBar);