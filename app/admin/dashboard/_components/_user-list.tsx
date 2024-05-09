import { User } from "@clerk/nextjs/server";
import * as React from "react";
import { setRole } from "@/app/_actions/setRoleAction";

interface UserListProps {
  user: User;
}

const UserList: React.FC<UserListProps> = ({ user }) => {
  return (
    <div key={user.id}>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>
        {
          user.emailAddresses.find(
            email => email.id === user.primaryEmailAddressId
          )?.emailAddress
        }
      </div>
      <div>{user.publicMetadata.role as string}</div>
      <div>
        <form action={setRole}>
          <input type="hidden" value={user.id} name="id" />
          <input type="hidden" value="admin" name="role" />
          <button type="submit">Make Admin</button>
        </form>
      </div>
      <div>
        <form action={setRole}>
          <input type="hidden" value={user.id} name="id" />
          <input type="hidden" value="moderator" name="role" />
          <button type="submit">Make Moderator</button>
        </form>
      </div>
    </div>
  );
};

export default UserList;
