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
import ErrorComponent from "./ErrorComponent";

const CACHE_POSTS_KEY = "posts";

const ScrollContainer = ({ initialPosts, params, isFromFeed = false }) => {
  //skip var for pagination
  const [skip, setSkip] = useState(5);
  //all posts
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(true);

  //errors
  const [postError, setPostError] = useState(false);

  useEffect(() => {
    //if scroll container route is from feed
    if (isFromFeed) {
      let cachedPosts = localStorage.getItem(CACHE_POSTS_KEY);
      if (cachedPosts) {
        let cachedPostsData = JSON.parse(cachedPosts);
        setAllPosts(cachedPostsData);
        setSkip(cachedPostsData.length);
        if (cachedPostsData.length <= 4) {
          setHasMore(false);
        }
      } else {
        setSkip(5);
        localStorage.setItem(CACHE_POSTS_KEY, JSON.stringify(initialPosts));
        setAllPosts(initialPosts);
        if (initialPosts.length <= 4) {
          setHasMore(false);
        }
      }
    }
    //for every user profile do not check cache
    // else {
    if (initialPosts.length <= 4) {
      setHasMore(false);
    }
    // }
  }, []);

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/${params}&skip=${skip}`,
        {
          cache: "force-cache",
        }
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
            return { ...post, user: "errorFetchingUserData" };
          }

          return { ...post, user: user };
        })
      );

      setTimeout(() => {
        if (skip + 5 >= postData.total) {
          setHasMore(false);
          return;
        }
        setAllPosts((prevItems) => [...prevItems, ...postWithUserData]);
        // only cache first 20 posts
        if (skip < 20) {
          localStorage.setItem(
            CACHE_POSTS_KEY,
            JSON.stringify([...allPosts, ...postWithUserData])
          );
        }
        setSkip(skip + 5);
      }, 1500);
    } catch (error) {
      setAllPosts((prevItems) => [
        ...prevItems,
        { user: "errorFetchingUserData" },
      ]);
      setPostError(true);
      console.error("Error Fetching User Data");
    }
  };

  return (
    <>
      {postError ? (
        <>
          {allPosts?.map((post) => {
            if (post.user === "errorFetchingUserData") {
              return (
                <ErrorComponent
                  key={post.user}
                  title={"Error loading posts"}
                  bodyText={"We’re so sorry but it’s for the test."}
                />
              );
            }
            return <PostCard data={post} key={post.id} />;
          })}
        </>
      ) : (
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
      )}
    </>
  );
};

export default ScrollContainer;
