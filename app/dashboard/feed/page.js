import React from "react";
//util
import { fetchData } from "@/util/fetchData";
//lib
import { getPosts, getSingleUserById } from "@/lib/api";

//custom components
import SuggestedPostsSection from "@/components/dashboard/feed/SuggestedPostsSection";
import RecentPostSection from "@/components/dashboard/feed/RecentPostSection";
import SuggestedUsersSection from "@/components/dashboard/feed/SuggestedUsersSection";

const page = async () => {
  //errors
  let numOfPostsError = null;
  let initialRecentPostsError = null;

  //get number of post
  const numOfPostsPromise = fetchData(
    getPosts,
    { params: "limit=1", onlyArray: false },
    (e) => (numOfPostsError = e)
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
          numOfPostsPromise={numOfPostsPromise}
          numOfPostsError={numOfPostsError}
        />
      </section>

      {/* suggested users section */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Who to follow</h2>
        <SuggestedUsersSection
          numOfPostsPromise={numOfPostsPromise}
          numOfPostsError={numOfPostsError}
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
