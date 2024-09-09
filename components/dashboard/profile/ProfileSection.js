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
