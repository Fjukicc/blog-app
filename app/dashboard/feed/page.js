import React from "react";
//util
import { fetchData } from "@/util/fetchData";
//lib
import { getUsers, getPosts, getSingleUserById } from "@/lib/api";

//custom components
import SuggestedPostsSection from "@/components/dashboard/feed/SuggestedPostsSection";
import RecentPostSection from "@/components/dashboard/feed/RecentPostSection";
import SuggestedUsersSection from "@/components/dashboard/feed/SuggestedUsersSection";

const page = async () => {
  //errors
  let suggestedPostsError = null;
  let suggestedUsersError = null;
  let initialRecentPostsError = null;

  //get suggested post
  const suggestedPostsPromise = fetchData(
    getPosts,
    { params: "limit=2" },
    (e) => (suggestedPostsError = e)
  );

  //sugested users
  const suggestedUsersPromise = fetchData(
    getUsers,
    { params: "limit=4" },
    (e) => (suggestedUsersError = e)
  );

  //recent posts initial data
  const initialRecentPostsPromise = fetchData(
    getPosts,
    { params: "limit=5" },
    (e) => (initialRecentPostsError = e)
  );

  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* suggested posts section */}
      <section className="flex flex-col w-full gap-4">
        <h2 className="text-heading-2">Suggested posts</h2>
        <SuggestedPostsSection
          suggestedPostsError={suggestedPostsError}
          suggestedPostsPromise={suggestedPostsPromise}
        />
      </section>

      {/* suggested users section */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Who to follow</h2>
        <SuggestedUsersSection
          suggestedUsersPromise={suggestedUsersPromise}
          suggestedUsersError={suggestedUsersError}
        />
      </section>

      {/* recent posts section */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Recent</h2>
        <RecentPostSection
          initialRecentPostsPromise={initialRecentPostsPromise}
          initialRecentPostsError={initialRecentPostsError}
        />
      </section>
    </main>
  );
};

export default page;
