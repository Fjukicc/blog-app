import React from "react";
//lib
import { getUsers, getPosts } from "@/lib/api";
//util
import { fetchData } from "@/util/fetchData";
//custom components
import PostCard from "@/components/common/PostCard";
import UserCard from "@/components/dashboard/feed/UserCard";
import ScrollContainer from "@/components/dashboard/feed/ScrollContainer";
import ErrorComponent from "@/components/common/ErrorComponent";

const page = async () => {
  //data
  let suggestedUsers = [];
  let suggestedPosts = [];
  let initialPostsForInfiniteScroll = [];

  //errors
  let postsError = null;
  let usersError = null;
  let recentPostsError = null;

  //get data from the server side
  suggestedPosts = await fetchData(
    getPosts,
    { params: "limit=2" },
    (e) => (postsError = e)
  );
  suggestedUsers = await fetchData(
    getUsers,
    { params: "limit=4" },
    (e) => (usersError = e)
  );
  initialPostsForInfiniteScroll = await fetchData(
    getPosts,
    { params: "limit=5" },
    (e) => (recentPostsError = e)
  );

  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* suggested posts section */}
      <section className="flex flex-col w-full gap-4">
        <h2 className="text-heading-2">Suggested posts</h2>
        {postsError ? (
          <ErrorComponent
            title={"Error loading posts"}
            bodyText={"We’re so sorry but it’s for the test."}
          />
        ) : (
          suggestedPosts.map((sp) => <PostCard key={sp.id} postData={sp} />)
        )}
      </section>
      {/* who to follow section */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Who to follow</h2>
        {usersError ? (
          <ErrorComponent
            title={"Error loading users"}
            bodyText={"We’re so sorry but it’s for the test."}
          />
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedUsers.map((suggestedUser) => (
              <UserCard key={suggestedUser.id} user={suggestedUser} />
            ))}
          </div>
        )}
      </section>
      {/* Recent */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Recent</h2>
        {recentPostsError ? (
          <ErrorComponent
            title={"Error loading posts"}
            bodyText={"We’re so sorry but it’s for the test."}
          />
        ) : (
          <ScrollContainer initialPosts={initialPostsForInfiniteScroll} />
        )}
      </section>
    </main>
  );
};

export default page;
