"use client";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
const apiKey = "89e5f07ad10ca98f6d724077914257aa";
const apiUrl = 'https://api.themoviedb.org/3';

const useGenreList = () => {
    const { data: genreList, error } = useSWR(
      `${apiUrl}/genre/movie/list?api_key=${apiKey}`,
      fetcher
    );
  
    return {
      genreList,
      isLoading: !genreList && !error,
      isError: error,
    };
  };
  
  export { useGenreList };