import LoadingSkeleton from "@/components/common/LoadingSkeleton";

export default function Loading() {
  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* suggested posts section */}
      <section className="w-full">
        <LoadingSkeleton type={"PostCard"} />
      </section>
    </main>
  );
}
