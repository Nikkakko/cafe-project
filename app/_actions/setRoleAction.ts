"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { action } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { RoleSchema } from "@/validation/role";

// export async function setRole(formData: FormData) {
//   // Check that the user trying to set the role is an admin
//   if (!checkRole("admin")) {
//     return { message: "Not Authorized" };
//   }

//   try {
//     const res = await clerkClient.users.updateUser(
//       formData.get("id") as string,
//       {
//         publicMetadata: { role: formData.get("role") },
//       }
//     );

//     revalidatePath("/admin/dashboard/users");
//     return { message: res.publicMetadata };
//   } catch (err) {
//     return { message: err };
//   }
// }

export const setRoleAction = action(RoleSchema, async values => {
  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await clerkClient.users.updateUser(values.id, {
      publicMetadata: { role: values.role },
    });

    revalidatePath("/admin/dashboard/users");
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
});
