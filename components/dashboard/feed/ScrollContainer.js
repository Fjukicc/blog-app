"use client";
import React, { useState } from "react";
//infinite scroll component
import InfiniteScroll from "react-infinite-scroll-component";
//spinner
import { Oval } from "react-loader-spinner";

//custom components
import PostCard from "@/components/common/PostCard";
import ErrorComponent from "@/components/common/ErrorComponent";

const ScrollContainer = ({ initialPosts }) => {
  //skip var for pagination
  const [skip, setSkip] = useState(5);

  //all posts
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(true);

  //handle error from child component
  const [userDataError, setUserDataError] = useState(false);

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=5&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error("greska");
      }
      const data = await response.json();

      setTimeout(() => {
        setAllPosts((prevItems) => [...prevItems, ...data.posts]);
        skip >= data.total ? setHasMore(false) : setHasMore(true);
        setSkip(skip + 5);
      }, 1000);
    } catch (error) {
      console.error("error");
    }
  };

  const onUserDataError = () => {
    setUserDataError(true);
  };

  return (
    <>
      {userDataError ? (
        <ErrorComponent
          title={"Error loading posts"}
          bodyText={"We’re so sorry but it’s for the test."}
        />
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
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {allPosts?.map((post) => {
                return (
                  <PostCard
                    postData={post}
                    key={post.id}
                    onUserDataError={onUserDataError}
                  />
                );
              })}
            </InfiniteScroll>
          )}
        </>
      )}
    </>
  );
};

export default ScrollContainer;
