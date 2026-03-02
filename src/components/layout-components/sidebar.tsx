import Clock from "@/components/layout-components/clock";
import NavLinks from "@/components/layout-components/nav-links";
import Profile from "./profile";
import React from "react";

const SideBar = () => {
    return (
        <div className="flex flex-col md:flex-col md:h-full md:max-w-[20rem] gap-1">
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