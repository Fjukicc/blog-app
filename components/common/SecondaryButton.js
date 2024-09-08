import React from "react";

const SecondaryButton = ({ onClick, title, size }) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "medium" && "py-2 px-[14px]"} ${
        size === "large" && "py-4 px-6"
      } ${
        size === "small" && "py-[6px] px-[10px]"
      } hover:bg-primary/50 hover:text-focus-primary text-body-base cursor-pointer !text-custom-primary border rounded-[100px] gap-2 border-custom-primary`}
    >
      {title}
    </div>
  );
};

export default SecondaryButton;
