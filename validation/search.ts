import * as z from "zod";

export const SearchSchema = z.object({
  search: z.string().min(1, {
    message: "Search term must be at least 1 character long",
  }),
});
