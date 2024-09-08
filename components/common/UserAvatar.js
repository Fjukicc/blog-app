import React from "react";
//next
import Link from "next/link";
import Image from "next/image";
//assets
import AvatarImage from "@/public/images/UserAvatar.png";

const UserAvatar = ({ size = "small", link }) => {
  return (
    <Link
      href={link}
      className={`w-[40px] z-50  ${(size =
        "small" && "min-w-[40px] h-[40px]")} ${(size =
        "large" && "min-w-[120px] h-[120px]")} hover:opacity-60`}
    >
      <Image
        className={`rounded-full z-50`}
        src={AvatarImage}
        alt="user-avatar"
        height={size === "small" ? 40 : 120}
        width={size === "small" ? 40 : 120}
      />
    </Link>
  );
};

export default UserAvatar;
