"use client";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

interface FavoriteButtonProps {
  movieId?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites, isValidating } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? CheckIcon : AddIcon;
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-9 lg:h-9 p-2
     border-white border-2 rounded-full flex justify-center items-center
      transition hover:border-netural-300
      "
    >
      {isValidating ? (
        <CircularProgress className="text-red-600" size={15}/>
      ) : (
        <Icon color={"white"} />
      )}
    </div>
  );
};

export default FavoriteButton;
