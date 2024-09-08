"use client";
import React, { useMemo } from "react";
//nav
import { usePathname } from "next/navigation";
//custom components
import BackButton from "./BackButton";

const Header = () => {
  const pathname = usePathname();

  //on route change decide what type of header to render
  const { headerText, isBackAllowed } = useMemo(() => {
    let headerText = "";
    let isBackAllowed = false;

    if (pathname === "/dashboard/feed") {
      headerText = "Feed";
      isBackAllowed = false;
    } else if (pathname.startsWith("/dashboard/profile")) {
      headerText = "Profile";
      isBackAllowed = true;
    } else {
      headerText = "";
      isBackAllowed = false;
    }

    return { headerText, isBackAllowed };
  }, [pathname]);

  return (
    <div
      className={`w-full left-0 border-b border-salte/15 bg-white h-[56px] shadow-light fixed top-0 z-40 flex py-3 px-2 items-center ${
        isBackAllowed ? "justify-between" : "justify-center"
      }`}
    >
      {isBackAllowed && (
        <div className="flex-shrink-0">
          <BackButton />
        </div>
      )}
      <div className={`flex-1 text-heading-3 text-center`}>{headerText}</div>
    </div>
  );
};

export default Header;
