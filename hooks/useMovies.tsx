"use client"

import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovies = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovies;
