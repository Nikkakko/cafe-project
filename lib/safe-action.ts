import { currentUser } from "@clerk/nextjs/server";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const authenticatedAction = createSafeActionClient({
  async middleware() {
    const user = await currentUser();

    if (!user) {
      return {
        error: "You must be logged in to perform this action.",
      };
    }

    return {
      user,
    };
  },
});
