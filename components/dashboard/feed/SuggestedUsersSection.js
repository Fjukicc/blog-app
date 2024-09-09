import React from "react";

//custom components
import ErrorComponent from "@/components/common/ErrorComponent";
import UserCard from "./UserCard";

const SuggestedUsersSection = async ({
  suggestedUsersError,
  suggestedUsersPromise,
}) => {
  if (suggestedUsersError) {
    return (
      <ErrorComponent
        title={"Error loading users"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    );
  }

  const suggestedUsersData = await suggestedUsersPromise;

  //use this function to simulate network delay so you can see skeletons
  // const simulateNetworkDelay = async (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  // await simulateNetworkDelay(5000)

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {suggestedUsersData.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default SuggestedUsersSection;
