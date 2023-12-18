"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR("/api/current", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  };
};

export default useCurrentUser;
