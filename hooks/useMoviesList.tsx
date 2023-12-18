"use client"
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMoviesList = () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=89e5f07ad10ca98f6d724077914257aa`
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

export default useMoviesList;
