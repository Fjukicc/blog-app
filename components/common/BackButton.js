import React from "react";
import Link from "next/link";
//icons
import { FaChevronLeft } from "react-icons/fa";

const BackButton = ({ link }) => {
  return (
    <Link
      href={`${link}`}
      className="w-[32px] h-[32px] flex justify-center text-grey-cold-600 hover:text-grey-cold/900 items-center gap-0 rounded-full bg-white cursor-pointer hover:bg-content-base"
    >
      <FaChevronLeft size={16} />
    </Link>
  );
};

export default BackButton;
