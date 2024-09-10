"use client";
import React, { useMemo, useState } from "react";
//icons
import { FiMapPin } from "react-icons/fi";

//custom components
import UserAvatar from "@/components/common/UserAvatar";
import SecondaryButton from "@/components/common/SecondaryButton";
import PrimaryButton from "@/components/common/PrimaryButton";

const ProfileCardMobile = ({ user, userPosts }) => {
  const [isMessageButtonClicked, setIsMessageButtonClicked] = useState(false);
  const [isFollowButtonClicked, setIsFollowButtonClicked] = useState(false);

  const handleMessageButtonClick = () => {
    setIsMessageButtonClicked(!isMessageButtonClicked);
  };

  const handleFollowButtonClicked = () => {
    setIsFollowButtonClicked(!isFollowButtonClicked);
  };

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
      {/* upper gradient */}
      <div className="w-full h-16 custom-card-gradient-bg mb-6" />
      {/* card content */}
      <div className="w-full flex flex-col bg-white gap-6 p-6 items-center">
        {/* upper info */}
        <div className="w-full flex flex-col items-center gap-2">
          {/* full name */}
          <p className="text-heading-1">{`${user.firstName} ${user.lastName}`}</p>
          {/* location and username and department */}
          <div className="flex w-full items-center flex-col gap-3">
            <span className="text-body-base !text-custom-secondary">{`@${user.username}`}</span>
            <div className="flex flex-row gap-1">
              <FiMapPin size={16} className="text-custom-secondary" />
              <span className="text-body-base !text-custom-secondary">
                {`${user.address.city}, ${user.address.country}`}
              </span>
            </div>
            <div className="bg-light-blue/50 py-[6px] px-3 rounded-xl text-center max-w-fit">
              <span className="text-heading-4 !text-light-blue/700">
                {user.company.department}
              </span>
            </div>
          </div>
        </div>
        {/* post statistics */}
        <div className="flex flex-row w-full justify-center gap-6">
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
      <div className="flex w-full flex-row justify-center gap-4 py-4 px-6 border-t border-grey-cold/50 user-card-footer-gradient-bg">
        <PrimaryButton
          isButtonClicked={isFollowButtonClicked}
          onClick={handleFollowButtonClicked}
          title={"Follow"}
          size={"medium"}
        />
        <SecondaryButton
          isButtonClicked={isMessageButtonClicked}
          onClick={handleMessageButtonClick}
          title={"Message"}
          size={"medium"}
        />
      </div>
    </div>
  );
};

export default ProfileCardMobile;
