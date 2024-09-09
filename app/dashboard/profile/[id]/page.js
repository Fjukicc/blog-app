import React from "react";
//lib
import { getPostsByUserId, getSingleUserById } from "@/lib/api";
//util
import { fetchData } from "@/util/fetchData";

//custom components
import ProfileSection from "@/components/dashboard/profile/ProfileSection";
import RecentUserPostsSection from "@/components/dashboard/profile/RecentUserPostsSection";
import ErrorComponent from "@/components/common/ErrorComponent";
// import ScrollContainer from "@/components/dashboard/feed/ScrollContainer";

const page = async ({ params }) => {
  const { id } = params;

  const userId = decodeURIComponent(id);

  //handle if someone is accessing without id
  if (!userId) {
    <main className="w-full flex flex-col gap-y-12">
      <ErrorComponent
        title={"User not found"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    </main>;
  }

  //errors
  let userProfieError = null;
  let allUserPostsError = null;
  let initialUserPostsError = null;

  //get data from the server side
  const userProfilePromise = fetchData(
    getSingleUserById,
    { params: userId },
    (e) => (userProfieError = e)
  );
  const allUserPostsPromise = fetchData(
    getPostsByUserId,
    { params: userId },
    (e) => (allUserPostsError = e)
  );

  //initial user posts for scroll component
  const initialUserPostsPromise = fetchData(
    getPostsByUserId,
    { params: userId },
    (e) => (initialUserPostsError = e)
  );

  return (
    <main className="w-full flex flex-col gap-y-12 pt-8 pb-8 lg:pt-0 lg:pb-0">
      {/* profile section */}
      <section className="flex flex-col w-full">
        <ProfileSection
          userProfilePromise={userProfilePromise}
          allUserPostsPromise={allUserPostsPromise}
        />
      </section>

      {/* Recent */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Recent</h2>
        <RecentUserPostsSection
          initialUserPostsPromise={initialUserPostsPromise}
          initialUserPostsError={initialUserPostsError}
          userId={userId}
        />
      </section>
    </main>
  );
};

export default page;
