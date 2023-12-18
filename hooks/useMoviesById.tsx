"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMoviesById = (movieId?: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=89e5f07ad10ca98f6d724077914257aa`;

  const { data, error, isLoading } = useSWR(movieId ? url : null, fetcher, {
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

export default useMoviesById;
