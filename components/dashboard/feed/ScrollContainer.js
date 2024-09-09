"use client";
import React, { useEffect, useState } from "react";
//infinite scroll component
import InfiniteScroll from "react-infinite-scroll-component";
//spinner
import { Oval } from "react-loader-spinner";
import { fetchData } from "@/util/fetchData";
import { getSingleUserById } from "@/lib/api";

//custom components
import PostCard from "@/components/common/PostCard";

const ScrollContainer = ({ initialPosts, params }) => {
  //skip var for pagination
  const [skip, setSkip] = useState(5);
  //all posts
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (initialPosts.length <= 4) {
      setHasMore(false);
    }
  }, []);

  //error
  const [postError, setPostError] = useState(false);

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/${params}&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error("error fetching more posts");
      }
      const postData = await response.json();

      const postWithUserData = await Promise.all(
        postData.posts.map(async (post) => {
          //initialize error if there is
          let userError = null;

          // Try to fetch the user data for each post
          let user = await fetchData(
            getSingleUserById,
            { params: post.userId },
            (e) => (userError = e)
          );

          if (userError) {
            setPostError(true);
            return null;
          }

          return { ...post, user: user };
        })
      );

      setTimeout(() => {
        setAllPosts((prevItems) => [...prevItems, ...postWithUserData]);
        // skip >= data.total ? setHasMore(false) : setHasMore(true);
        setSkip(skip + 5);
      }, 1000);
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <>
      {allPosts && (
        <InfiniteScroll
          dataLength={allPosts.length} //This is important field to render the next data
          next={fetchMoreData}
          className="flex flex-col gap-4 mb-10"
          hasMore={hasMore}
          loader={
            <div className="w-full flex justify-center">
              <Oval
                visible={true}
                height="20"
                width="20"
                color="gray"
                ariaLabel="oval-loading"
              />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <span className="text-heading-4">You have seen it all</span>
            </p>
          }
        >
          {allPosts?.map((post) => {
            return <PostCard data={post} key={post.id} />;
          })}
        </InfiniteScroll>
      )}
    </>
  );
};

export default ScrollContainer;
