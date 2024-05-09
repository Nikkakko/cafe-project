"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchSchema } from "@/validation/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "query-string";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof SearchSchema>,
    event: React.BaseSyntheticEvent | undefined
  ) {
    event?.preventDefault();
    const queryTerm = values.search;
    router.push(pathname + "?search=" + queryTerm);
  }

  React.useEffect(() => {
    const query = { search: debouncedSearchTerm };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    if (debouncedSearchTerm !== undefined) {
      router.push(url);
    } else {
      // if search term is empty, remove search query from url
      router.push(pathname);
    }
  }, [debouncedSearchTerm, pathname, router]);

  return (
    <div>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search for users</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search"
                    {...field}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
