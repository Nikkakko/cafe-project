import { User } from "@clerk/nextjs/server";
import * as React from "react";
import { setRole } from "@/app/_actions/setRoleAction";

interface UserListProps {
  usersData: User[];
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

const UserList: React.FC<UserListProps> = ({ usersData }) => {
  return (
    // <div key={user.id}>
    //   <div>
    //     {user.firstName} {user.lastName}
    //   </div>
    //   <div>
    //     {
    //       user.emailAddresses.find(
    //         email => email.id === user.primaryEmailAddressId
    //       )?.emailAddress
    //     }
    //   </div>
    //   <div>{user.publicMetadata.role as string}</div>
    //   <div>
    //     <form action={setRole}>
    //       <input type="hidden" value={user.id} name="id" />
    //       <input type="hidden" value="admin" name="role" />
    //       <button type="submit">Make Admin</button>
    //     </form>
    //   </div>
    //   <div>
    //     <form action={setRole}>
    //       <input type="hidden" value={user.id} name="id" />
    //       <input type="hidden" value="moderator" name="role" />
    //       <button type="submit">Make Moderator</button>
    //     </form>
    //   </div>
    // </div>

    <Table>
      <TableCaption>A list of users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersData.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.emailAddresses[0].emailAddress}</TableCell>
            <TableCell className="text-right">
              {user.publicMetadata.role as string}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{usersData.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UserList;
