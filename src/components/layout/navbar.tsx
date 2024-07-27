"use client";
import React from "react";

import { SearchBoxDesktop, SearchBoxMobile } from "./search-box";
import { FiSearch } from "react-icons/fi";
import UserNavProfile from "./user-nav-profile";
import { useLayoutStore } from "@/zustand/useLayoutStore";
import Logo from "./logo";

function Navbar() {
  const [openMobileSearch, setOpenMobileSearch] = React.useState(false);
  const openSidebar = useLayoutStore((state) => state.openUPTubeSidebar);
  const setOpenSideBar = useLayoutStore((state) => state.setOpenUPTubeSidebar);
  return (
    <div className="bg-background fixed top-0 z-50 w-screen left-0">
      {/* Mobile Search */}
      {openMobileSearch ? (
        <SearchBoxMobile onClose={() => setOpenMobileSearch(false)} />
      ) : (
        <div className="items-center justify-between flex gap-5 h-[56px] bg-background container">
          <Logo onClick={() => setOpenSideBar(!openSidebar)} href="/" />
          <SearchBoxDesktop />
          <div className="gap-x-3 flex items-center">
            <div className="block sm:hidden">
              <FiSearch
                onClick={() => setOpenMobileSearch(true)}
                size={16}
                className="cursor-pointer text-secondary"
              />
            </div>
            <UserNavProfile />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
