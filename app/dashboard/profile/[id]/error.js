"use client";

import ErrorComponent from "@/components/common/ErrorComponent";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, []);

  return (
    <main className="w-full flex flex-col gap-y-12">
      <ErrorComponent
        title={"User not found"}
        bodyText={"We’re so sorry but it’s for the test."}
      />
    </main>
  );
}
