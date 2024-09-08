"use client";
import React from "react";
//next
import Link from "next/link";

//custom components
import UserAvatar from "@/components/common/UserAvatar";
import SecondaryButton from "@/components/common/SecondaryButton";

const UserCard = ({ user }) => {
  function truncateString(str, maxLength = 25) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  }

  return (
    <div className="w-full bg-white rounded-2xl border p-4 border-content-border shadow-light">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-row gap-3 items-center">
          {/* avatar */}
          <UserAvatar
            size="small"
            link={`/dashboard/profile/${encodeURIComponent(user.id)}`}
          />
          {/* name and username */}
          <div className="flex flex-col gap-1">
            <Link
              href={`/dashboard/profile/${encodeURIComponent(user.id)}`}
              className="flex flex-row text-heading-4 hover:underline max-w-fit"
            >
              {truncateString(
                `${user.firstName} ${
                  user.maidenName !== "" ? user.maidenName : ""
                } ${user.lastName}`
              )}
            </Link>
            <div className="text-body-small !text-custom-secondary">{`@${user.username}`}</div>
          </div>
        </div>
        <SecondaryButton size={"medium"} title={"Follow"} />
      </div>
    </div>
  );
};

export default UserCard;
