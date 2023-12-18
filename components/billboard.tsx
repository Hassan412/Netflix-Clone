"use client";
import useBillboard from "@/hooks/useBillboard";
import type { MoviesData } from "@/types";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import PlayButton from "./play-button";
import useMovieVideo from "@/hooks/useMovieVideo";
import useMoviesImages from "@/hooks/useMoviesImages";
import Image from "next/image";
import format from "date-fns/format";
import { Rating } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import GenreLogo from "./genre-logo";
import GetGenreNameById from "@/actions/getGenreNameById";

const Billboard = () => {
  const { data } = useBillboard();
  const Movie: MoviesData = data;
  // const handleOpenModel = useCallback(() => {
  //   openModel(Movie?.id);
  // }, [openModel, Movie?.id]);
  const { data: MovieVideo } = useMovieVideo(Movie?.id);
  const { data: ImageData } = useMoviesImages(Movie?.id as number);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="relative h-[90vh] bg-white">
        <div className="absolute inset-0 z-20 bg-black/50" />
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${MovieVideo?.results[1]?.key}?controls=0&autoplay=1&mute=1&loop=1`}
          allowFullScreen
          frameBorder={"0"}
        ></iframe>
        <div className="absolute top-[25%] md:top-[35%] sm:left-0 ml-4 md:ml-16 z-50">
          <GenreLogo data={GetGenreNameById(Movie?.genre_ids[0])}/>
          <div className={`relative h-40`}>
            <Image
              alt="Logo"
              src={`https://image.tmdb.org/t/p/original${ImageData?.logos[0]?.file_path}`}
              fill
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          <div className="flex items-center ml-1 gap-4 mt-4">
            <span className="text-white text-lg">
              {format(new Date(Movie?.release_date || 0), "yyyy")}
            </span>
            <Rating
              name="read-only"
              readOnly
              value={Movie?.vote_average / 2}
              className="text-red-600"
              precision={0.5}
              size="small"
              emptyIcon={null}
            />
            <div className="border border-zinc-300 text-sm text-center px-2 text-white">
              {Movie?.adult ? "TV-MA" : "TV"}
            </div>
          </div>
          <p className="hide-long-text text-white text-[8px] md:text-lg md:mt-4 mt-2 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
            {Movie?.overview}
          </p>
          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <PlayButton movieId={Movie?.id} label="Play" className="rounded-md bg-white text-black font-semibold md:px-4 hover:bg-white/80"/>
            <button
              // onClick={handleOpenModel}
              className="bg-white/40 text-white rounded-md md:py-2 md:px-4 w-auto text-xs lg:text-lg flex flex-row items-center hover:bg-white/30 font-semibold transition"
            >
              <InfoOutlineIcon className="mr-1" />
              More Info
            </button>
          </div>
        </div>
        <h2 className="text-white bg-transparent align-bottom absolute bottom-4 left-14 text-3xl font-semibold z-50">
          New Release
        </h2>
        <div className="absolute right-0 top-[70%] flex pr-16 gap-2 items-center bg-zinc-800/80 transition z-50">
          <div className="w-2 h-8 bg-neutral-500"/>
          <span className="text-white my-1 text-sm">
        {Movie?.adult ? "TV-MA" : "TV"}
        </span>
          </div>
      </div>
    </ThemeProvider>
  );
};

export default Billboard;
