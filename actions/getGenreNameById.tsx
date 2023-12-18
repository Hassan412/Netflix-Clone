"use client"

import { useGenreList } from "@/hooks/useMovieGenre";
import type { Genre } from "@/types";

const GetGenreNameById = (genreId?: number) => {
    const { genreList, isLoading, isError } = useGenreList();
        const genre = genreList?.genres.find((g: Genre) => g.id === genreId);
        return genre ? genre.name : "Unknown";
      };

      export default GetGenreNameById
