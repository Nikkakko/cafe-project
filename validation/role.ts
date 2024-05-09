import * as z from "zod";

//set role enum
const RoleEnum = z.enum(["admin", "moderator"], {
  message: "Role must be either admin or moderator",
});

export const RoleSchema = z.object({
  id: z.string({
    required_error: "User ID is required",
  }),
  role: RoleEnum,
});
