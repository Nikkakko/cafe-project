import "server-only";

import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";
import db from "@/lib/db";

import { currentUser, clerkClient } from "@clerk/nextjs/server";

export const getCachedUser = cache(async () => {
  noStore();
  try {
    return await currentUser();
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const getUserList = cache(async (query: string) => {
  noStore();
  try {
    return await clerkClient.users.getUserList({
      query: query ? query : undefined,
    });
  } catch (err) {
    console.error(err);
    return null;
  }
});
