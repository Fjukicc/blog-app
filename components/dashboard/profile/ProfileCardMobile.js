"use client";
import React, { useMemo } from "react";
//icons
import { FiMapPin } from "react-icons/fi";

//custom components
import UserAvatar from "@/components/common/UserAvatar";
import SecondaryButton from "@/components/common/SecondaryButton";
import PrimaryButton from "@/components/common/PrimaryButton";

const ProfileCardMobile = ({ user, userPosts }) => {
  //get total posts and likes
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
    <div className="w-full relative shadow-light rounded-xl flex flex-col bg-white border border-content-border">
      <div
        style={{ left: "calc(50% - 60px)" }}
        className="absolute -top-[30px] w-[120px] h-[120px] rounded-full border-[5px] border-white shadow-avatar"
      >
        <UserAvatar size="large" link={""} />
      </div>
      {/* card content */}
      <div className="w-full h-16 custom-card-gradient-bg"></div>
    </div>
  );
};

export default ProfileCardMobile;
