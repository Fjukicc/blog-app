import React from "react";
//util
import { fetchData } from "@/util/fetchData";
//lib
import { getSingleUserById } from "@/lib/api";

//custom components
import ErrorComponent from "@/components/common/ErrorComponent";
import ScrollContainer from "../../common/ScrollContainer";

const RecentUserPostsSection = async ({
  initialUserPostsPromise,
  initialUserPostsError,
  userId,
}) => {
  //if error
  if (initialUserPostsError) {
    return (
      <ErrorComponent
        title={"Error loading posts"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  let initialUserPostsWithUserDataError = null;

  let initialUserPostsData = await initialUserPostsPromise;

  const initialUserPostsWithUserData = await Promise.all(
    initialUserPostsData.map(async (post) => {
      let userError = null;

      const user = await fetchData(
        getSingleUserById,
        { params: post.userId },
        (e) => (userError = e)
      );

      if (userError) {
        initialUserPostsWithUserDataError = true;
        console.error(
          `Error fetching user data for userId ${post.userId}:`,
          userError
        );
        return { ...post, user: null };
      }

      return { ...post, user };
    })
  );

  if (initialUserPostsWithUserDataError) {
    return (
      <ErrorComponent
        title={"Error loading posts"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  return (
    <ScrollContainer
      initialPosts={initialUserPostsWithUserData}
      params={`users/${userId}/posts?limit=5`}
    />
  );
};

export default RecentUserPostsSection;
