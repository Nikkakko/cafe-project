"use client";
import { User } from "@clerk/nextjs/server";
import * as React from "react";

interface UserListProps {
  data: User[] | null;
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormAction from "./_form-action-dialog";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/ui/button";

const UserList: React.FC<UserListProps> = ({ data }) => {
  const userData = data;
  const { onOpen } = useModalStore();

  return (
    <Table>
      <TableCaption>A list of users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData?.map((user: User) => (
          <TableRow key={user.id}>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.emailAddresses[0].emailAddress}</TableCell>
            <TableCell>{user.publicMetadata.role as string}</TableCell>
            <TableCell className="text-right">
              {user.publicMetadata.role === "admin" ? (
                <Button
                  onClick={() =>
                    onOpen("form-action", { role: "moderator", id: user.id })
                  }
                  variant="outline"
                  size="sm"
                >
                  Change to Moderator
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    onOpen("form-action", { role: "admin", id: user.id })
                  }
                  variant="outline"
                  size="sm"
                >
                  Change to Admin
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="">
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UserList;
