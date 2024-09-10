import React from "react";

//custom components
import ErrorComponent from "@/components/common/ErrorComponent";
import ProfileCardMobile from "./ProfileCardMobile";
import ProfileCardDesktop from "./ProfileCardDesktop";

const ProfileSection = async ({
  userProfilePromise,
  allUserPostsPromise,
  userProfieError,
  allUserPostsError,
}) => {
  if (userProfieError || allUserPostsError) {
    return (
      <ErrorComponent
        title={"User not found"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  const userProfileData = await userProfilePromise;
  const allUserPostsData = await allUserPostsPromise;

  // use this function to simulate network delay so you can see skeletons
  // const simulateNetworkDelay = async (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  // await simulateNetworkDelay(2000);

  return (
    <>
      <div className="lg:hidden">
        <ProfileCardMobile
          user={userProfileData}
          userPosts={allUserPostsData}
        />
      </div>
      <div className="hidden lg:block">
        <ProfileCardDesktop
          user={userProfileData}
          userPosts={allUserPostsData}
        />
      </div>
    </>
  );
};

export default ProfileSection;
