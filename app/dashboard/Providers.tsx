"use client";

import React, { createContext, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { serverFetch } from "@/src/lib/serverApi";
import { Profile } from "@/src/lib/schemas/profile";

interface UserContextType {
  user: Profile | null;
  updateUser: (userData: Profile | null) => void;
}

const queryClient = new QueryClient();
export const UserContext = createContext<UserContextType | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => serverFetch<Profile>("/person/profile"),
  });

  useEffect(() => {
    setUser(data as Profile);
  }, [data]);

  const updateUser = (userData: Profile | null) => {
    setUser(userData);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, updateUser }}>
        {children}
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
