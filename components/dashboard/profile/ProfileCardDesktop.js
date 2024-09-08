"use client";
import React, { useMemo } from "react";
//icons
import { FiMapPin } from "react-icons/fi";

//custom components
import UserAvatar from "@/components/common/UserAvatar";
import SecondaryButton from "@/components/common/SecondaryButton";
import PrimaryButton from "@/components/common/PrimaryButton";

const ProfileCardDesktop = ({ user, userPosts }) => {
  const { totalLikes, totalPosts } = useMemo(() => {
    let total_likes = 0;
    let total_posts = userPosts.length;

    userPosts.forEach((post) => {
      total_likes += post.reactions.likes;
    });

    return {
      totalLikes: total_likes,
      totalPosts: total_posts,
    };
  }, [userPosts]);

  return (
    <div className="w-full relative shadow-light min-h-64 rounded-xl flex flex-col bg-white border border-content-border">
      <div className="absolute top-10 left-6 w-[120px] h-[120px] rounded-full border-[5px] border-white shadow-avatar">
        <UserAvatar size="large" link={""} />
      </div>
      {/* gradient upper part of the card */}
      <div className="w-full h-16 custom-card-gradient-bg"></div>
      {/* card content */}
      <div className="w-full flex flex-col bg-white gap-6 py-6 pr-6 pl-[170px]">
        {/* upper info */}
        <div className="w-full flex flex-col gap-2">
          {/* full name */}
          <p className="text-heading-1">{`${user.firstName} ${user.lastName}`}</p>
          {/* location and username */}
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-row gap-3">
              <span className="text-body-base !text-custom-secondary">{`@${user.username}`}</span>
              <div className="flex flex-row gap-1">
                <FiMapPin size={16} className="text-custom-secondary" />
                <span className="text-body-base !text-custom-secondary">
                  {`${user.address.city}, ${user.address.country}`}
                </span>
              </div>
            </div>
          </div>
          {/* department */}
          <div className="bg-light-blue/50 py-[6px] px-3 rounded-xl text-center max-w-fit">
            <span className="text-heading-4 !text-light-blue/700">
              {user.company.department}
            </span>
          </div>
        </div>
        {/* post statistics */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-col items-center gap-[2px]">
            <span className="text-heading-2">{totalPosts}</span>
            <span className="text-body-small-overline !text-custom-secondary">
              posts
            </span>
          </div>
          <div className="flex flex-col items-center gap-[2px]">
            <span className="text-heading-2">{totalLikes}</span>
            <span className="text-body-small-overline !text-custom-secondary">
              likes
            </span>
          </div>
        </div>
      </div>
      {/* card footer => Follow, Message */}
      <div className="flex w-full flex-row gap-4 py-4 px-6 border-t border-grey-cold/50 user-card-footer-gradient-bg">
        <PrimaryButton onClick={() => {}} title={"Follow"} size={"medium"} />
        <SecondaryButton onClick={() => {}} title={"Message"} size={"medium"} />
      </div>
    </div>
  );
};

export default ProfileCardDesktop;
