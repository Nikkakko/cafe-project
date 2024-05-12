import * as React from "react";
import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { Shell } from "@/components/ui/shell";

export default async function AdminDashboard() {
  if (!checkRole("admin")) {
    redirect("/");
  }

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
