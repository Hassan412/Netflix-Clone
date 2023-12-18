"use client"
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useHorrorList = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=89e5f07ad10ca98f6d724077914257aa&with_genres=27`
  const { data, error, isLoading } = useSWR(url, fetcher,{
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false
  });

  return {
    data,
    error,
    isLoading,
    url
  };
};

export default useHorrorList;