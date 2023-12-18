import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useFavorites = () => {
  const url = "/api/favorites"
  const { data, error, isLoading, mutate, isValidating } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  };
};

export default useFavorites;
