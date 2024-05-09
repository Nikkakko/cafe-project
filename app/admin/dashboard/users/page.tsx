import * as React from "react";
import { SearchUsers } from "../_components/_search-users";
import { clerkClient } from "@clerk/nextjs/server";
import UserList from "../_components/_user-list";

interface AdminDashboardUsersPageProps {
  searchParams: { search?: string };
}

const AdminDashboardUsersPage: React.FC<
  AdminDashboardUsersPageProps
> = async (params: { searchParams: { search?: string } }) => {
  const query = params.searchParams.search;

  const users = await clerkClient.users.getUserList({
    query: query ? query : undefined,
  });
  return (
    <main className="flex flex-col flex-1 py-4">
      <SearchUsers />
      <div className="flex flex-col mt-6">
        {users?.data.length > 0 ? (
          <UserList usersData={users.data} />
        ) : (
          <EmptyUserList />
        )}
      </div>
    </main>
  );
};

export default AdminDashboardUsersPage;

const EmptyUserList: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-semibold">No users found</h1>

      <p className="text-gray-500 mt-2">Try searching for a different user</p>
    </div>
  );
};
