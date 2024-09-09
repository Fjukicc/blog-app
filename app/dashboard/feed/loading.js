import LoadingSkeleton from "@/components/common/LoadingSkeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* suggested posts section */}
      <section className="flex flex-col w-full gap-4">
        <h2 className="text-heading-2">Suggested posts</h2>
        <LoadingSkeleton type={"PostCard"} />
        <LoadingSkeleton type={"PostCard"} />
      </section>

      {/* suggested users section */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Who to follow</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoadingSkeleton type={"UserCard"} />
          <LoadingSkeleton type={"UserCard"} />
          <LoadingSkeleton type={"UserCard"} />
          <LoadingSkeleton type={"UserCard"} />
        </div>
      </section>

      {/* recent posts section */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Recent</h2>
        <LoadingSkeleton type={"PostCard"} />
        <LoadingSkeleton type={"PostCard"} />
        <LoadingSkeleton type={"PostCard"} />
        <LoadingSkeleton type={"PostCard"} />
        <LoadingSkeleton type={"PostCard"} />
      </section>
    </main>
  );
}
