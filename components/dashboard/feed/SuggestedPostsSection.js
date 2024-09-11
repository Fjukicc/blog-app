import React from "react";
//util
import { fetchData } from "@/util/fetchData";
//lib
import { getSingleUserById, getPosts } from "@/lib/api";

//custom components
import ErrorComponent from "@/components/common/ErrorComponent";
import PostCard from "@/components/common/PostCard";

const fetchUserData = async (userId) => {
  try {
    return await fetchData(getSingleUserById, { params: userId });
  } catch (error) {
    console.error(`Error fetching user data for userId ${userId}:`, error);
    throw new Error("Error fetching user.");
  }
};

const fetchPosts = async (numOfPosts) => {
  try {
    return await fetchData(getPosts, { params: `limit=${numOfPosts}` });
  } catch (error) {
    throw new Error("Error fetching posts.");
  }
};

// Utility to get top two posts
const getTopTwoPosts = (allPosts) => {
  // if there are less than two posts
  if (allPosts.length < 2) return allPosts;

  return allPosts
    .sort((a, b) => b.reactions.likes - a.reactions.likes)
    .slice(0, 2);
};

const SuggestedPostsSection = async ({
  numOfPostsPromise,
  numOfPostsError,
}) => {
  // Handle error in fetching number of posts
  if (numOfPostsError) {
    return (
      <ErrorComponent
        title={"Error loading posts"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  //await promise on component level so that page can show loading skeletons
  const numOfPosts = await numOfPostsPromise;

  try {
    // Fetch posts and calculate top two by likes
    const allPosts = await fetchPosts(numOfPosts.total);
    const suggestedPosts = getTopTwoPosts(allPosts);

    // Fetch user data for each post
    const suggestedPostsWithUserData = await Promise.all(
      suggestedPosts.map(async (post) => {
        const user = await fetchUserData(post.userId);
        return { ...post, user };
      })
    );

    // Render suggested posts
    return suggestedPostsWithUserData.map((post) => (
      <PostCard key={post.id} data={post} />
    ));
  } catch (error) {
    // Handle errors during post or user fetching
    return (
      <ErrorComponent
        title={"Error loading posts"}
        bodyText={"There was an issue loading posts or user data."}
      />
    );
  }
};

export default SuggestedPostsSection;
