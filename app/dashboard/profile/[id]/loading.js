import LoadingSkeleton from "@/components/common/LoadingSkeleton";

export default function Loading() {
  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* suggested posts section */}
      <section className="w-full">
        <div className="lg:hidden">
          <LoadingSkeleton type="ProfileCardMobile" />
        </div>
        <div className="hidden lg:block">
          <LoadingSkeleton type={"ProfileCardDesktop"} />
        </div>
      </section>

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
