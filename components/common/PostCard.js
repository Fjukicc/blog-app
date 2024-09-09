"use client";
import React, { useState } from "react";
//next
import Link from "next/link";
//icons
import { FiThumbsUp, FiThumbsDown, FiEye } from "react-icons/fi";

//custom components
import UserAvatar from "./UserAvatar";

const PostCard = ({ data }) => {
  // State to track the selected icon
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleSelect = (type) => {
    setSelectedReaction(type);
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl border border-content-border shadow-light">
        {/* content */}
        <div className="w-full p-4 gap-4 flex flex-row">
          {/* avatar */}
          <UserAvatar
            size="small"
            link={`/dashboard/profile/${encodeURIComponent(data.userId)}`}
          />
          <div className="flex flex-col gap-3">
            {/* name and username */}
            <div className="flex flex-col gap-1">
              <Link
                href={`/dashboard/profile/${encodeURIComponent(data.userId)}`}
                className="flex flex-row text-heading-4 hover:underline max-w-fit"
              >
                {`${data.user.firstName} ${data.user.lastName}`}
              </Link>
              <div className="text-body-small !text-custom-secondary">{`@${data.user.username}`}</div>
            </div>
            {/* card body text */}
            <div className="text-body-medium !text-custom-secondary">
              {data.body}
            </div>
            {/* post tags */}
            <div className="flex gap-3">
              {data.tags?.map((tag) => (
                <div className="text-body-small !text-custom-primary" key={tag}>
                  {`#${tag}`}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* footer -> (likes, dislikes, views) */}
        <div className="w-full flex items-center flex-row text-body-medium !text-custom-secondary p-4 gap-6 border-t border-content-border">
          <div
            onClick={() => handleSelect("like")}
            className={`${
              selectedReaction === "like"
                ? "text-focus-primary"
                : "text-custom-secondary"
            } gap-1 flex items-center text-custom-secondary hover:!text-text-primary cursor-pointer`}
          >
            <FiThumbsUp size={16} />
            {data.reactions.likes}
          </div>
          <div
            onClick={() => handleSelect("dislike")}
            className={`${
              selectedReaction === "dislike"
                ? "text-focus-primary"
                : "text-custom-secondary"
            } gap-1 flex items-center hover:text-text-primary cursor-pointer`}
          >
            <FiThumbsDown size={16} />
            {data.reactions.dislikes}
          </div>
          <div className="gap-1 flex items-center text-custom-secondary hover:!text-text-primary cursor-pointer">
            <FiEye size={16} />
            {data?.views}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
