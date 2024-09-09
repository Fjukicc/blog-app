import React from "react";
//util
import { fetchData } from "@/util/fetchData";
//lib
import { getSingleUserById } from "@/lib/api";

//custom components
import ErrorComponent from "@/components/common/ErrorComponent";
import PostCard from "@/components/common/PostCard";

const SuggestedPostsSection = async ({
  suggestedPostsPromise,
  suggestedPostsError,
}) => {
  // if there is an error fetching suggested posts return error component
  if (suggestedPostsError) {
    return (
      <ErrorComponent
        title={"Error loading posts"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  let postsWithUserDataError = null;

  //await promise on component level so that page can show loading skeletons
  const suggestedPosts = await suggestedPostsPromise;

  const postsWithUserData = await Promise.all(
    suggestedPosts.map(async (post) => {
      let userError = null;
      const user = await fetchData(
        getSingleUserById,
        { params: post.userId },
        (e) => (userError = e)
      );

      if (userError) {
        postsWithUserDataError = true;
        console.error(
          `Error fetching user data for userId ${post.userId}:`,
          userError
        );
        return { ...post, user: null };
      }

      return { ...post, user };
    })
  );

  if (postsWithUserDataError) {
    return (
      <ErrorComponent
        title={"Error loading posts with user data"}
        bodyText={"There was an issue loading posts."}
      />
    );
  }

  return postsWithUserData.map((post) => (
    <PostCard key={post.id} data={post} />
  ));
};

export default SuggestedPostsSection;
