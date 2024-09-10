import React from "react";

const PrimaryButton = ({ onClick, title, size, isButtonClicked = false }) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "medium" && "py-2 px-[14px]"} ${
        size === "large" && "py-4 px-6"
      } ${size === "small" && "py-[6px] px-[10px]"} ${
        isButtonClicked
          ? "button-primary-bg-color-hover"
          : "button-primary-bg-color"
      } text-body-base cursor-pointer !text-white border rounded-[100px] gap-2 hover:button-primary-bg-color-hover`}
    >
      {title}
    </div>
  );
};

export default PrimaryButton;
