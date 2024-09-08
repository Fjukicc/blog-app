import React from "react";
//lib
import { getSingleUserById } from "@/lib/api";
//util
import { fetchData } from "@/util/fetchData";

const page = async ({ params }) => {
  const { id } = params;

  const userId = decodeURIComponent(id);

  //handle if someone is accessing without id
  if (!userId) {
    return <div>No id</div>;
  }

  //data
  let user = null;
  let userPosts = null;

  //errors
  let error = null;
  let userPostsError = null;

  //get data from the server side
  user = await fetchData(
    getSingleUserById,
    { params: userId },
    (e) => (postsError = e)
  );

  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* profile section */}
      <section className="flex flex-col w-full">

      </section>
    </main>
  );
};

export default page;
