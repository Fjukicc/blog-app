"use client";

import ErrorComponent from "@/components/common/ErrorComponent";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="w-full flex flex-col gap-y-12">
      {/* suggested posts section */}
      <section className="flex flex-col w-full gap-4">
        <h2 className="text-heading-2">Suggested posts</h2>
        <ErrorComponent
          title={"Error loading posts"}
          bodyText={"We’re so sorry but it’s for the test."}
        />
      </section>
      {/* who to follow section */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Who to follow</h2>
        <ErrorComponent
          title={"Error loading users"}
          bodyText={"We’re so sorry but it’s for the test."}
        />
      </section>
      {/* Recent */}
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-heading-2">Recent</h2>
        <ErrorComponent
          title={"Error loading posts"}
          bodyText={"We’re so sorry but it’s for the test."}
        />
      </section>
    </main>
  );
}
