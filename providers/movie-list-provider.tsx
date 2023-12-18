"use client";
import useFavorites from "@/hooks/useFavorites";
import useHorrorList from "@/hooks/useHorrorMovies";
import useMoviesList from "@/hooks/useMoviesList";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import React, { useEffect, useState } from "react";
import useHorrorInfoModel from "@/hooks/useHorrorInfoModel";
import useMyInfoModel from "@/hooks/useMyInfoModel";
import MoviesList from "@/components/movies-list";
import InfoModel from "@/components/info-model";
import useNewInfoModel from "@/hooks/useNewInfoModel";
import useRomanticInfoModel from "@/hooks/useRomanticeModelInfi";
import useRomanticList from "@/hooks/useRomanticMovies";
import useTrendingInfoModel from "@/hooks/useTrendingInfoModel";
import SubBillBoard from "@/components/sub-billboard";
import useSearchData from "@/hooks/useSearchData";
import useSearchBar from "@/hooks/useSearchBar";
import { MoviesData } from "@/types";
import Fuse from "fuse.js";
import { isEmpty } from "lodash";

const MovieListProvider = () => {
  const { data: MovieData } = useMoviesList();
  const { data: TrendingData } = useTrendingMovies();
  const { data: HorrorData } = useHorrorList();
  const { data: ListData } = useFavorites();
  const { data: RomanticData } = useRomanticList();

  const {
    isOpen: IsTrendingModelOpen,
    closeModel: TrendingModelClose,
    openModel: TrendingModelOpen,
    movieId: TrendingMovieId,
  } = useTrendingInfoModel();
  const {
    isOpen: IshorrorModelOpen,
    closeModel: HorrorModelClose,
    movieId: HorrrorMovieId,
    openModel: HorrorModelOpen,
  } = useHorrorInfoModel();
  const {
    isOpen: IsRomanticModelOpen,
    closeModel: RomanticModelClose,
    openModel: RomanticModelOpen,
    movieId: RomanticMovieId,
  } = useRomanticInfoModel();

  const {
    isOpen: IsListModelOpen,
    closeModel: ListModelClose,
    movieId: MyMovieId,
    openModel: ListModelOpen,
  } = useMyInfoModel();

  const {
    isOpen: IsNewListModelOpen,
    closeModel: NewModelClose,
    movieId: NewMovieId,
    openModel: NewModelOpen,
  } = useNewInfoModel();

  const [movieData, setMovieData] = useState<MoviesData[]>([]);
  const { Query } = useSearchBar();
  const { data: SearchData } = useSearchData(Query);
  useEffect(() => {
    const MainData = Query ? SearchData?.results : null;
    const fuseOptions = {
      keys: ["title", "description"],
    };
    if (MainData) {
      const fuse = new Fuse(MainData, fuseOptions);
      const searchResults = fuse?.search(Query ?? "");
      const movieData = Query
        ? searchResults.length > 0
          ? searchResults.map((result) => result.item)
          : []
        : [];
      setMovieData(movieData as MoviesData[]);
      console.log(movieData)
    }else{
      setMovieData([])
    }
  }, [Query, SearchData]);
  const HorrorSearchData = movieData?.filter((movie) =>
    movie.genre_ids.includes(27)
  );
  const RomanticeSearchData = movieData?.filter((movie) =>
  movie.genre_ids.includes(10749)
);
  const componentData = [
    {
      data:movieData.length !== 0 ? [] : TrendingData?.results,
      onOpen: TrendingModelOpen,
      title: "Trending",

      visible: IsTrendingModelOpen,
      movieId: TrendingMovieId,
      onClose: TrendingModelClose,
    },
    {
      data: ListData,
      onOpen: ListModelOpen,
      title: "My List",
      visible: IsListModelOpen,
      movieId: MyMovieId,
      onClose: ListModelClose,
    },
    {
      data: movieData.length !== 0 ? HorrorSearchData : HorrorData?.results,
      onOpen: HorrorModelOpen,
      title: "Horror",
      visible: IshorrorModelOpen,
      movieId: HorrrorMovieId,
      onClose: HorrorModelClose,
    },
    {
      data: movieData.length !== 0 ? RomanticeSearchData : RomanticData?.results,
      onOpen: RomanticModelOpen,
      title: "Romantic",
      visible: IsRomanticModelOpen,
      movieId: RomanticMovieId,
      onClose: RomanticModelClose,
    },
  ];
  return (
    <>
      <MoviesList
        data={movieData.length !== 0 ? [] : MovieData?.results}
        movieId={NewMovieId}
        onOpen={NewModelOpen}
      />

      <InfoModel
        visible={IsNewListModelOpen}
        movieId={NewMovieId}
        onClose={NewModelClose}
      />
      <SubBillBoard data={MovieData?.results} />
      <div className="movies-swiper sm:ml-4 md:ml-8 lg:ml-12 ml-4">
        {componentData.map((data, index) => (
          <React.Fragment key={index}>
            <MoviesList
              onOpen={data?.onOpen}
              movieId={data?.movieId}
              data={data?.data}
              title={data?.title}
            />
            <InfoModel
              movieId={data?.movieId}
              onClose={data?.onClose}
              visible={data?.visible}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default MovieListProvider;
