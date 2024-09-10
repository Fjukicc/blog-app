import React from "react";

const SecondaryButton = ({ onClick, title, size, isButtonClicked = false }) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "medium" && "py-2 px-[14px]"} ${
        size === "large" && "py-4 px-6"
      } ${size === "small" && "py-[6px] px-[10px]"} ${
        isButtonClicked
          ? "bg-primary/50 !text-focus-primary border-custom-primary"
          : "!text-custom-primary border-custom-primary"
      } hover:bg-primary/50 hover:text-focus-primary text-body-base cursor-pointer border rounded-[100px] gap-2`}
    >
      {title}
    </div>
  );
};

export default SecondaryButton;
