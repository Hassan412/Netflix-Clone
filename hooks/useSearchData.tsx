"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useSearchData = (query?: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=89e5f07ad10ca98f6d724077914257aa`;

  const { data, error, isLoading } = useSWR(query ? url : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useSearchData;