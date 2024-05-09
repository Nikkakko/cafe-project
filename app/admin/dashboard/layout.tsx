import React from "react";
import DashboardAside from "./_components/_dashboard-aside";
import { Shell } from "@/components/ui/shell";
import DashboardHeader from "./_components/_dashboard-header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Shell
      className="flex items-start h-full  relative  w-full border px-0"
      as="section"
    >
      {/* Include shared UI here e.g. a header or sidebar */}
      <DashboardAside />

      <section className="flex flex-col w-full flex-1 h-full  p-4">
        <DashboardHeader />

        {children}
      </section>
    </Shell>
  );
}
