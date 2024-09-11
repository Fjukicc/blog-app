import React from "react";
//util
import { fetchData } from "@/util/fetchData";
//lib
import { getSingleUserById } from "@/lib/api";

//custom components
import ErrorComponent from "@/components/common/ErrorComponent";
import ScrollContainer from "../../common/ScrollContainer";

const RecentPostSection = async ({
  initialRecentPostsPromise,
  initialRecentPostsError,
}) => {
  // if there is an error fetching suggested posts return error component
  if (initialRecentPostsError) {
    return (
      <ErrorComponent
        title={"Error loading posts"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  let initialRecentPostsWithUserDataError = null;

  const initialRecentPostsData = await initialRecentPostsPromise;

  //if there is no error fetching recent posts and there are recent posts
  const initialRecentPostsWithUserData = await Promise.all(
    initialRecentPostsData.map(async (post) => {
      //initialize error if there is
      let userError = null;

      // Try to fetch the user data for each post
      let user = await fetchData(
        getSingleUserById,
        { params: post.userId },
        (e) => (userError = e)
      );

      if (userError) {
        // If fetching user data fails, handle it (e.g., return the post without user data)
        initialRecentPostsWithUserDataError = true;
        console.error(
          `Error fetching user data for userId ${post.userId}:`,
          userError
        );
        return { ...post, user: null };
      }

      return { ...post, user: user }; // Append the user data to the post
    })
  );

  if (initialRecentPostsWithUserDataError) {
    <ErrorComponent
      title={"Error loading posts"}
      bodyText={"We’re so sorry but it’s for the test."}
    />;
  }

  return (
    <ScrollContainer
      initialPosts={initialRecentPostsWithUserData}
      params={"posts?limit=5"}
      isFromFeed={true}
    />
  );
};

export default RecentPostSection;
