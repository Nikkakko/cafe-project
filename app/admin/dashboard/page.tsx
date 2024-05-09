import * as React from "react";
import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { Shell } from "@/components/ui/shell";
import { Separator } from "@/components/ui/separator";
import AddProductForm from "@/components/forms/AddProductForm";

import { SearchUsers } from "./_components/_search-users";
import { clerkClient } from "@clerk/nextjs/server";
import UserList from "./_components/_user-list";
import DashboardAside from "./_components/_dashboard-aside";
import DashboardHeader from "./_components/_dashboard-header";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const users = await clerkClient.users.getUserList({
    query: query ? query : undefined,
  });

  return (
    <Shell className="flex flex-col flex-1 w-full " as="main">
      {/* <div className="flex flex-col space-y-4 ">
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <p className="text-sm text-gray-500">Add a new product to the store</p>
      </div>
      <Separator className="my-4" />
      <AddProductForm /> */}
      PAGE CONTENT
      {/* <SearchUsers />
      {users?.data?.map(user => {
        return <UserList key={user.id} user={user} />;
      })} */}
    </Shell>
  );
}
