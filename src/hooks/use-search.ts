import { searchUsers } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export const useSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounce(query), 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const { refetch, isFetching } = useQuery({
    queryKey: [key, debounce],
    queryFn: async ({ queryKey }) => {
      if (type === "USERS") {
        const users = await searchUsers(queryKey[1] as string);
        if (users.status === 200) setOnUsers(users?.data);
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);
  }, [debounce, refetch]);
  return { onSearchQuery, query, isFetching, onUsers };
};
