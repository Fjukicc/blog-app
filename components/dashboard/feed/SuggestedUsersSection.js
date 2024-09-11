import React from "react";
//util
import { fetchData } from "@/util/fetchData";
//lib
import { getPosts, getSingleUserById } from "@/lib/api";

//custom components
import ErrorComponent from "@/components/common/ErrorComponent";
import UserCard from "./UserCard";

const fetchPosts = async (numOfPosts) => {
  try {
    return await fetchData(getPosts, { params: `limit=${numOfPosts}` });
  } catch (error) {
    throw new Error("Error fetching posts.");
  }
};

const fetchUserData = async (userId) => {
  try {
    return await fetchData(getSingleUserById, { params: userId });
  } catch (error) {
    console.error(`Error fetching user data for userId ${userId}:`, error);
    throw new Error("Error fetching user.");
  }
};

// Function to get top four users with the most posts
const getTopUsersByPostCount = (posts) => {
  const userPostCount = {};

  // Count how many posts each user has authored
  posts.forEach((post) => {
    const { userId } = post;
    if (userPostCount[userId]) {
      userPostCount[userId] += 1;
    } else {
      userPostCount[userId] = 1;
    }
  });

  // Convert the userPostCount object into an array of [userId, count] and sort by count
  const sortedUsers = Object.entries(userPostCount)
    .sort(([, countA], [, countB]) => countB - countA) // Sort by post count in descending order
    .slice(0, 4); // Get the top 4 users

  return sortedUsers.map(([userId, count]) => ({
    userId: Number(userId),
    postCount: count,
  }));
};

const SuggestedUsersSection = async ({
  numOfPostsPromise,
  numOfPostsError,
}) => {
  //check if there is an error fetching only one post for total posts info
  if (numOfPostsError) {
    return (
      <ErrorComponent
        title={"Error loading users"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  //await promise on component level so that page can show loading skeletons
  const numOfPosts = await numOfPostsPromise;

  // // use this function to simulate network delay so you can see skeletons
  // const simulateNetworkDelay = async (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  // await simulateNetworkDelay(2000)

  try {
    // Fetch all posts
    const allPosts = await fetchPosts(numOfPosts.total);
    const suggestedUsersIds = getTopUsersByPostCount(allPosts);

    // Fetch user data for each post
    const suggestedUsers = await Promise.all(
      suggestedUsersIds.map(async (user) => {
        const userFullData = await fetchUserData(user.userId);
        return userFullData;
      })
    );

    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <ErrorComponent
        title={"Error loading users"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }
};

export default SuggestedUsersSection;
