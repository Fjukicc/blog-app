import React from "react";
//custom components
import Header from "@/components/common/Header";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-content-base">
      <Header />
      <div className="w-full lg:px-[150px] pt-[56px]">
        <div className="px-4 w-full py-8">{children}</div>
      </div>
    </div>
  );
};

export default layout;
