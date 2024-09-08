"use client";
import React, { useState } from "react";
//next
import Image from "next/image";
import Link from "next/link";
//swr
import { fetcher } from "@/swr/fetcher";
import useSWR from "swr";
//icons
import { FiThumbsUp, FiThumbsDown, FiEye } from "react-icons/fi";

//assets
import UserAvatar from "@/public/images/UserAvatar.png";
//custom components
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorComponent from "./ErrorComponent";

const PostCard = ({ postData, onUserDataError = null }) => {
  // Data fetching and error handling (it is recommended to revalidate data on focus and reconnect to keep the data up-to-date).
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR(
    postData ? `https://dummyjson.com/users/${postData.userId}` : null,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404 || retryCount >= 1) {
          if (onUserDataError !== null) {
            onUserDataError();
          }
        }
      },
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // State to track the selected icon
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleSelect = (type) => {
    setSelectedReaction(type);
  };

  if (userLoading) {
    return <LoadingSkeleton type={"PostCard"} />;
  }

  //if there is user error
  if (userError) {
    // Function to notify the server about an error during fetching user data
    // notifyServerOfError()
    return (
      <ErrorComponent
        title={"Error loading posts"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  return (
    <>
      <div className="w-full bg-white rounded-2xl border border-content-border shadow-light">
        {/* content */}
        <div className="w-full p-4 gap-4 flex flex-row">
          {/* avatar */}
          <Link
            href={`/dashboard/profile/${encodeURIComponent(postData.userId)}`}
            className="w-[40px] relative min-w-[40px] h-[40px] hover:opacity-60"
          >
            <Image
              className="rounded-full w-[40px] h-[40px]"
              src={UserAvatar}
              alt="user-avatar"
              fill={true}
            />
          </Link>
          <div className="flex flex-col gap-3">
            {/* name and username */}
            <div className="flex flex-col gap-1">
              <Link
                href={`/dashboard/profile/${encodeURIComponent(
                  postData.userId
                )}`}
                className="flex flex-row text-heading-4 hover:underline max-w-fit"
              >
                {`${user.firstName} ${user.lastName}`}
              </Link>
              <div className="text-body-small !text-custom-secondary">{`@${user.username}`}</div>
            </div>
            {/* card body text */}
            <div className="text-body-medium !text-custom-secondary">
              {postData.body}
            </div>
            {/* post tags */}
            <div className="flex gap-3">
              {postData?.tags?.map((tag) => (
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
            {postData?.reactions?.likes}
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
            {postData?.reactions?.dislikes}
          </div>
          <div className="gap-1 flex items-center text-custom-secondary hover:!text-text-primary cursor-pointer">
            <FiEye size={16} />
            {postData?.views}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
