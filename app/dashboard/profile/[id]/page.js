import React from "react";
//lib
import { getPostsByUserId, getSingleUserById } from "@/lib/api";
//util
import { fetchData } from "@/util/fetchData";

//custom components
import ProfileCardDesktop from "@/components/dashboard/profile/ProfileCardDesktop";
import ProfileCardMobile from "@/components/dashboard/profile/ProfileCardMobile";

const page = async ({ params }) => {
  const { id } = params;

  const userId = decodeURIComponent(id);

  //handle if someone is accessing without id
  if (!userId) {
    return <div>No id</div>;
  }

  //data
  let user = null;
  let userPosts = [];

  //errors
  let userError = null;
  let userPostsError = null;

  //get data from the server side
  user = await fetchData(
    getSingleUserById,
    { params: userId },
    (e) => (userError = e)
  );
  userPosts = await fetchData(
    getPostsByUserId,
    { params: userId },
    (e) => (userError = e)
  );

  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* profile section */}
      <section className="flex flex-col w-full">
        <div className="lg:hidden">
          <ProfileCardMobile />
        </div>
        <div className="hidden lg:block">
          <ProfileCardDesktop user={user} userPosts={userPosts} />
        </div>
      </section>
    </main>
  );
};

export default page;
