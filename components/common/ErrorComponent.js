import React from "react";
//icons
import { PiWarningBold } from "react-icons/pi";

const ErrorComponent = ({ title, bodyText }) => {
  return (
    <div className="w-full bg-white shadow-light border border-content-border flex flex-col items-center gap-6 rounded-2xl p-6">
      <PiWarningBold size={50} className="text-custom-secondary" />
      <div className="flex flex-col w-full items-center gap-2">
        <p className="text-heading-3">{title}</p>
        <p className="text-body-base !text-custom-secondary">{bodyText}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
