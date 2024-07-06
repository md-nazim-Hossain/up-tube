import React from "react";
import Sidebar from "@/components/studio/sidebar";
import StudioNavbar from "@/components/studio/studio-navbar";

function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StudioNavbar />
      <div className="h-[calc(100vh-56px)] w-full flex overflow-hidden fixed">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export default StudioRootLayout;